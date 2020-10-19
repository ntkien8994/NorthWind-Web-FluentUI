import React from 'react';
// import { Modal, Spin, Form, Button } from 'antd';
import {Dialog,DialogFooter,PrimaryButton,DefaultButton} from '@fluentui/react';
import BaseComponent from './BaseComponent';
import * as Constant from '../../utility/Constant';
import moment from 'moment';

class BaseDictionaryDetail extends BaseComponent {
    constructor(props) {
        super(props);
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

    //description: convert các giá trị kiểu DateTime sang moment
    //----------------------------------------------------------
    //created by: ntkien 
    //created date: 08.09.2020
    prepareDataShow(masterData) {
        var me = this;
        Object.keys(masterData).forEach((key) => {
            if(key.endsWith('Date')){
                if(masterData[key]){
                    var d = moment(new Date(masterData[key]), Constant.FORMAT_DATETIME);
                    masterData[key]=d;
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
    saveData = (masterData) => {
        var me = this;
        if (me.validate()) {
            me.apicall(() => me.submitData(masterData));
        }
    }

    //description: Handle event đóng form
    //-------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    closeForm = (sender) => {
        var me = this;
        //nếu click ra ngoài thì ko thực hiện đóng form
        if (sender.currentTarget.nodeName == 'DIV') {
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
    submitData(masterData) {
        var me = this;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.SAVE_DATA;
        me.props.doAction(
            actionName,
            {
                masterData,
                entity: me.props.entity
            }
        )
    }

    componentDidMount() {
        var me = this;
        me.loadForm();
    }
    componentDidUpdate() {
        var me = this;
        if (!me.props.loadingDetailForm && me.props.masterData) {
            me.prepareDataShow(me.props.masterData);
            me.refs.form.setFieldsValue(me.props.masterData);
        }
    }

    render() {
        var me = this;
        return (
            <Dialog>
                <DialogFooter>
                    <PrimaryButton text="Đồng ý" />
                    <DefaultButton text="Hủy bỏ" />
                </DialogFooter>
            </Dialog>
            // <Modal title={me.getTitle()}
            //     visible={me.props.showDetail}
            //     centered
            //     footer={[
            //         <Button form="myForm" key="submit" htmlType="submit" type="primary" >
            //             Cập nhật
            //     </Button>,
            //         <Button key="back" type="primary" danger onClick={me.closeForm}>
            //             Hủy bỏ
            //     </Button>,
            //     ]}
            //     onCancel={me.closeForm}
            //     width={500}>
            //     <React.Fragment>
            //         <Spin spinning={me.props.loadingDetailForm}>
            //             <Form
            //                 id="myForm"
            //                 ref='form'
            //                 onFinish={me.onFinish}
            //                 name="basic"
            //             >
            //                 {
            //                     me.getForm()
            //                 }
            //             </Form>
            //         </Spin>

            //     </React.Fragment>

            // </Modal>
        );
    }
}
export default BaseDictionaryDetail