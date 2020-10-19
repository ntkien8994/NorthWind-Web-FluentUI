import React from 'react';
// import { Modal, Spin, Form, Space } from 'antd';
// import { UserOutlined, CloseCircleFilled, SaveFilled, DeleteFilled, UndoOutlined, QuestionCircleFilled, FileAddOutlined, FormOutlined } from '@ant-design/icons';
import BaseComponent from './BaseComponent';
import * as Constant from '../../utilities/Constant';
import moment from 'moment';
import BaseToolBar from '../base/BaseToolBar';

class BaseMasterDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.form = React.createRef();
    }
    //description: khi các form chi tiết kế thừa thì sẽ override lại để vẽ form
    //-------------------------------------------------------------------------
    //created by: ntkien 
    //created date: 28.08.2020
    getForm() {
        return null;
    }

    //description: Tiêu đề form chi tiết
    //----------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    getTitle() {
        var me = this;
        if (!me.props.editMode) {
            return me.props.pageName;
        }
        else if (me.props.editMode == Constant.editMode.add) {
            return Constant.ADD + " " + me.props.pageName;
        }
        else if (me.props.editMode == Constant.editMode.edit) {
            return Constant.EDIT + " " + me.props.pageName;
        }
        else if (me.props.editMode == Constant.editMode.none) {
            return Constant.VIEW + " " + me.props.pageName;
        }
        else {
            return me.props.pageName;
        }
    }
    //description: Submit form
    //------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    onFinish = (values) => {
        var me = this;
        var masterData = { ...me.props.masterData };
        Object.keys(values).forEach((key) => {
            masterData[key] = values[key];
        })
        me.prepareDataBeforeSave(masterData);
        me.saveData(masterData);
    }
    //description: hàm để khi cần thiết thì overide lại để set thêm giá trị
    //---------------------------------------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    prepareDataBeforeSave(masterData) {
        var me = this;
        if (me.props.editMode == Constant.editMode.add) {
            masterData.EditMode = Constant.entityEditMode.add;
        }
        else if (me.props.editMode == Constant.editMode.edit) {
            masterData.EditMode = Constant.entityEditMode.edit;
        }
    }

    //description: hàm để khi cần thiết thì overide lại để set thêm giá trị
    //---------------------------------------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    getDetailDataForSave() {
        var me = this;
        return [];
    }

    //description: convert các giá trị kiểu DateTime sang moment
    //----------------------------------------------------------
    //created by: ntkien 
    //created date: 08.09.2020
    prepareDataShow(masterData) {
        var me = this;
        Object.keys(masterData).forEach((key) => {
            if (key.endsWith('Date')) {
                if (masterData[key]) {
                    var d = moment(new Date(masterData[key]), Constant.FORMAT_DATETIME);
                    masterData[key] = d;
                }
            }
        })
    }

    //description: Load form
    //------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    loadForm() {
        var me = this;
        me.apicall(() => {
            me.loadData();
        })
    }

    //description: Load dữ liệu để binding lên form
    //---------------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    loadData() {
        var me = this;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.LOAD_INFO;
        me.props.doAction(
            actionName,
            {
                editMode: me.props.editMode,
                id: me.props.id,
                entity: me.props.entity
            }
        );
    }

    //description: Validate nghiệp vụ trước khi save
    //---------------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    validate() {
        return true;
    }
    //description: Thực hiện save data
    //---------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    doSaveData = async (saveMode) => {
        var me = this;
        const values = await me.form.current.validateFields();
        if (values) {
            var masterData = { ...me.props.masterData };
            Object.keys(values).forEach((key) => {
                masterData[key] = values[key];
            })
            var details = me.getDetailDataForSave();
            me.prepareDataBeforeSave(masterData);
            me.saveData(masterData,details,saveMode);
        }
    }
    //description: Thực hiện save data
    //---------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    saveData = (masterData,details,saveMode) => {
        var me = this;
        if (me.validate()) {
            me.apicall(() => me.submitData(masterData,details,saveMode));
        }
    }

    //description: Handle event đóng form
    //-------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    closeForm = (sender) => {
        var me = this;
        //nếu click ra ngoài thì ko thực hiện đóng form
        if (sender && sender.currentTarget.nodeName == 'DIV') {
            return
        }
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.CLOSE_FORM;
        me.props.doAction(
            actionName
        );
    }

    //description: Save data xuống database
    //-------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    submitData(masterData, details, saveMode) {
        var me = this;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.SAVE_DATA;
        me.props.doAction(
            actionName,
            {
                masterData,
                entity: me.props.entity,
                saveMode,
                details
            }
        )
    }
    //description: Thực hiện thay đổi editmode của form
    //-------------------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    changeEditMode(editMode) {
        var me = this;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.CHANGE_EDITMODE;
        me.props.doAction(
            actionName,
            {
                editMode
            }
        );
        setTimeout(() => { me.loadData() }, 50)
    }
    componentDidMount() {
        var me = this;
        me.loadForm();
    }
    componentDidUpdate() {
        var me = this;
        if (!me.props.loadingDetailForm && me.props.masterData && !me.props.formShown) {
            me.prepareDataShow(me.props.masterData);
            me.form.current.setFieldsValue(me.props.masterData);
        }
        //nếu là lưu và thêm mới thì load lại data
        if(me.props.saveComplete && me.props.editMode==Constant.editMode.add){
            me.loadData();
        }
    }
    getToolbars = () => {
        var me = this;
        var isViewMode = (me.props.editMode === Constant.editMode.none);
        return ([
            // { commandName: Constant.commandName.add, disabled: !isViewMode, value: "Thêm mới", icon: <FileAddOutlined style={{ color: '#52c41a' }} />, sortOrder: 0 },
            // { commandName: Constant.commandName.edit, disabled: !isViewMode, value: "Sửa", icon: <FormOutlined style={{ color: '#1890ff' }} />, sortOrder: 0 },
            // { commandName: Constant.commandName.save, disabled: isViewMode, value: "Lưu", icon: <SaveFilled style={{ color: '#1890ff' }} />, sortOrder: 0 },
            // { commandName: Constant.commandName.saveAndNew, parentCode: Constant.commandName.save, value: "Lưu & Thêm mới", icon: <SaveFilled style={{ color: '#1890ff' }} />, sortOrder: 0 },
            // { commandName: Constant.commandName.saveAndClose, parentCode: Constant.commandName.save, value: "Lưu & Đóng", icon: <SaveFilled style={{ color: '#1890ff' }} />, sortOrder: 0 },

            // { commandName: Constant.commandName.delete, disabled: !isViewMode, value: "Xóa", icon: <DeleteFilled style={{ color: 'red' }} />, sortOrder: 0 },
            // { commandName: Constant.commandName.undo, disabled: isViewMode, value: "Hoãn", icon: <UndoOutlined style={{ color: '#1890ff' }} />, seperator: true, sortOrder: 3 },
            // { commandName: Constant.commandName.help, value: "Trợ giúp", icon: <QuestionCircleFilled style={{ color: '#1890ff' }} />, sortOrder: 4 },
            // { commandName: Constant.commandName.close, value: "Đóng", icon: <CloseCircleFilled style={{ color: 'red' }} />, sortOrder: 4 },
        ]);
    }
    //description: toolbar_click
    //--------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    toolbar_Click = (commandName) => {
        var me = this;
        switch (commandName) {
            case Constant.commandName.add:
                me.changeEditMode(Constant.editMode.add);
                // me.showFormDetail(Constant.editMode.add);
                break;
            case Constant.commandName.dupplicate:
                // me.showFormDetail(Constant.editMode.dupplicate, me.props.id);
                break;
            case Constant.commandName.edit:
                me.changeEditMode(Constant.editMode.edit);
                // me.showFormDetail(Constant.editMode.edit, me.props.id, me.props.current);
                break;
            case Constant.commandName.delete:
                me.doDelete();
                break;
            case Constant.commandName.undo:
                if (me.props.editMode == Constant.editMode.add) {
                    me.closeForm();
                }
                else {
                    me.changeEditMode(Constant.editMode.none);
                    me.disableControl();
                }
                break;
            case Constant.commandName.save:
            case Constant.commandName.saveAndClose:
            case Constant.commandName.saveAndNew:
                me.doSaveData(commandName);
                break;
            case Constant.commandName.close:
                me.closeForm();
                break;
            case Constant.commandName.help:
                break;
        }
    }
    //description: Thực hiện hành động xóa
    // vì control đang hiển thị nút Yes, No ngược nhau nên làm ngược lại
    //------------------------------------------------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    doDelete() {
        var me = this;
        // Modal.confirm({
        //     // title: Constant.FORM_TITLE,
        //     icon: <QuestionCircleFilled style={{ color: '#1890ff' }} />,
        //     centered: true,
        //     content: Constant.CONFIRM_DELETE,
        //     okText: 'Không',
        //     okButtonProps: {
        //         type: 'primary',
        //         danger: true
        //     },
        //     cancelText: 'Có',
        //     cancelButtonProps: {
        //         type: 'primary',
        //     },
        //     onCancel() {
        //         me.ok()
        //     },
        // });
    }
    //description: Xóa 1 bản ghi
    //--------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    deleteItem(currentItem) {
        var me = this;
        currentItem.EditMode = Constant.entityEditMode.delete;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.SAVE_DATA;
        me.props.doAction(actionName, {
            masterData: currentItem,
            entity: me.props.entity
        });
    }

    //description: Xác nhận xóa
    //--------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    ok = () => {
        var me = this;
        me.apicall(() => me.deleteItem(me.props.masterData));
    }
    render() {
        var me = this;
        var formWidth = me.props.formDetailWidth ? me.props.formDetailWidth : 800;
        return (
            null
            // <Modal className='voucher-form' title={me.getTitle()}
            //     visible={me.props.showDetail}
            //     centered
            //     footer={false}
            //     onCancel={me.closeForm}
            //     width={formWidth}>
            //     <React.Fragment>
            //         <Spin spinning={me.props.loadingDetailForm}>
            //             <Form
            //                 id="myForm"
            //                 ref={me.form}
            //                 name="basic"
            //             >
            //                 <div className='toolbar-form'>
            //                     <BaseToolBar config={me.getToolbars()} clickCallBack={me.toolbar_Click} />
            //                 </div>
            //                 <div className='main-form'>
            //                     {
            //                         me.getForm()
            //                     }
            //                 </div>

            //                 <div className='footer-form' >
            //                     <span><UserOutlined /> Người tạo: Nguyễn Trung Văn - 10/09/2020</span>
            //                     <span><UserOutlined /> Lần sửa cuối: Nguyễn Văn Mạnh - 10/09/2020 10:20:30 AM</span>
            //                 </div>
            //             </Form>
            //         </Spin>

            //     </React.Fragment>

            // </Modal>
        );
    }
}
export default BaseMasterDetail