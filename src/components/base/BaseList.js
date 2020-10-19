import React from 'react';
import BaseToolBar from './BaseToolBar';
import * as Constant from '../../utilities/Constant';
import * as common from '../../utilities/common';
// import { Pagination, Menu, message, Modal, Tabs } from 'antd';
import { ScrollablePane} from '@fluentui/react';
import BaseComponent from './BaseComponent';
import GisDetailList from '../controls/GisDetailList';
import { routes, routesOverflow } from '../../routes/router';
import GisBreadcrumb from '../controls/GisBreadcrumb';
import GisPagination from '../controls/GisPagination';
import GisSideBarFilter from '../controls/GisSideBarFilter';


class BaseList extends BaseComponent {

    //description: Sort change
    //---------------------------------------------
    //created by: ntkien 
    //created date: 13.10.2020
    onSort=(sort)=>{
        var me=this;
        me.handleTableChange(me.props.pagination,me.props.filters,sort);
    }
    //description: Handle filter,sortChange
    //---------------------------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    handleTableChange = (pagination, filters, sorter) => {
        var me = this;
        me.loadData(pagination, false, true, me.props.searchObject, filters, sorter);
    };

    //description: Paging change
    //--------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    onPaginationChange = (current, pageSize) => {
        var me = this;
        var pagination = { ...me.props.pagination };
        pagination.current = current;
        me.loadData(pagination, false, true, me.props.searchObject);
    };

    //description: show form chi tiết
    //-------------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    showFormDetail(editMode, id, record) {
        var me = this;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.SHOW_FORM;
        me.props.doAction(
            actionName,
            {
                editMode,
                id,
                record
            }
        );
    }

    //description: process
    //------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    process() {

    }
    //description: method Add
    //-----------------------
    //created by: ntkien 
    //created date: 31.08.2020
    addNew(){
        let me=this;
        me.showFormDetail(Constant.editMode.add);
    }
    //description: toolbar_click
    //--------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    toolbar_Click = (commandName) => {
        var me = this;
        switch (commandName) {
            case Constant.commandName.add:
                me.addNew();
                break;
            case Constant.commandName.dupplicate:
                me.showFormDetail(Constant.editMode.dupplicate, me.props.id);
                break;
            case Constant.commandName.edit:
                me.showFormDetail(Constant.editMode.edit, me.props.id, me.props.current);
                break;
            case Constant.commandName.delete:
                me.doDelete();
                break;
            case Constant.commandName.refresh:
                me.refresh();
                break;
            case Constant.commandName.view:
                me.showFormDetail(Constant.editMode.none, me.props.id, me.props.current);
                break;
            case Constant.commandName.export:
                break;
            case Constant.commandName.help:
                break;
            case Constant.commandName.process:
                me.process();
                break;
            default:
                break;
        }
    }

    //description: Thực hiện hành động xóa
    // vì control đang hiển thị nút Yes, No ngược nhau nên làm ngược lại
    //------------------------------------------------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    doDelete() {
        // var me = this;
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
        me.apicall(() => me.deleteItem(me.props.currentItem));
    }

    //description: Danh sách các context menu
    //---------------------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    getContextMenu() {
        // var me = this;
        return (
            <>
                {/* <Menu onClick={(evt) => me.toolbar_Click(evt.key)} style={{ width: 200 }} mode="vertical">
                    <Menu.Item selectable={false} key={Constant.commandName.add} icon={<PlusCircleFilled style={{ color: '#52c41a' }} />} >Thêm mới</Menu.Item>
                    <Menu.Item key={Constant.commandName.view} icon={<FileSearchOutlined style={{ color: '#1890ff' }} />} >Xem</Menu.Item>
                    <Menu.Item key={Constant.commandName.edit} icon={<EditFilled style={{ color: '#1890ff' }} />} >Sửa</Menu.Item>
                    <Menu.Item key={Constant.commandName.delete} icon={<DeleteFilled style={{ color: 'red' }} />} >Xóa</Menu.Item>
                    <Menu.Item key={Constant.commandName.refresh} className="seperator" icon={<SyncOutlined style={{ color: '#52c41a' }} />} >Làm mới</Menu.Item>
                    <Menu.Item key={Constant.commandName.help} icon={<QuestionCircleFilled style={{ color: '#1890ff' }} />} >Trợ giúp</Menu.Item>
                </Menu> */}
            </>
        )
    }

    //description: Danh sách chức năng toolbar
    //---------------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getToolBarConfig() {
        var me = this;
        var disabled = (!me.props.data || me.props.data == 0);
        return ([
            { key: Constant.commandName.add, text: "Thêm mới", sortOrder: 0, iconProps: { iconName: 'Add', style: { color: '#6bb700' } } },
        ]);
    }

    getOverflowToolBarConfig() {
        var me = this;
        var disabled = (!me.props.data || me.props.data == 0);
        return ([
            { key: Constant.commandName.edit, disabled: disabled, text: "Sửa", sortOrder: 1, iconProps: { iconName: 'Edit' } },
            { key: Constant.commandName.delete, disabled: disabled, text: "Xóa", sortOrder: 2, iconProps: { iconName: 'Delete', style: { color: 'red' } } },
            { key: Constant.commandName.refresh, text: "Làm mới", seperator: true, sortOrder: 3, iconProps: { iconName: 'Refresh', style: { color: '#6bb700' } } },
            { key: Constant.commandName.help, text: "Trợ giúp", sortOrder: 4, iconProps: { iconName: 'Help' } },
        ]);

    }

    //description: tính năng trên grid
    //--------------------------------
    //created by: ntkien 
    //created date: 10.10.2020
    getactionGrid() {
        return [
            { key: Constant.commandName.edit, text: '', iconProps: { iconName: 'Edit' } }
        ]
    }
    //description: tính năng overflow trên grid
    //-----------------------------------------
    //created by: ntkien 
    //created date: 10.10.2020
    getoverflowActionGrid() {
        return [
            {
                key: Constant.commandName.dupplicate,
                text: 'Nhân bản',
                iconProps: { iconName: 'Copy' }
            },
            {
                key: Constant.commandName.delete,
                text: 'Xóa',
                iconProps: { iconName: 'Delete', style: { color: 'red' } }
            }
        ]
    }
    //description: Build column action
    //--------------------------------
    //created by: ntkien 
    //created date: 10.10.2020
    getColumnAction() {
        let me = this;
        const actions = me.getactionGrid();
        const overflowActions = me.getoverflowActionGrid();
        return [
            {
                key: 'operation',
                minWidth: 40,
                maxWidth: 40,
                iconName: 'SetAction',
                showOnHover: true,
                actions: actions,
                overFlowActions: overflowActions
            }
        ]
    }
    //description: Load dữ liệu
    //-------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    loadData(pagination, isloading, isbusy, searchObject, filters, sorters) {
        var me = this;
        var param = {
            isloading,
            isbusy,
            pagination,
            searchObject,
            filters,
            sorters,
            entity: me.props.entity
        }
        var customparam = me.getCustomParam(param);
        if (customparam) {
            param = customparam
        }
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.LOAD_DATA;
        me.props.doAction(actionName, param);
    }

    //description: Nạp lại dữ liệu
    //----------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    refresh() {
        var me = this;
        var pagination = me.props.pagination,
            isloading = false,
            isbusy = true,
            searchObject = me.props.searchObject;
        me.apicall(() => me.loadData(pagination, isloading, isbusy, searchObject));
    }

    //description: Custom lại data
    //----------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getCustomParam() {
        return null;
    }

    //description: Form search dữ liệu
    //--------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getSearchPanel() {
        return null;
    }

    //description: Form chi tiết
    //--------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getFormDetail(propsFormDetail) {
        return null;
    }

    //description: Lấy panel chi tiết trong trường hợp có master/detail
    //-----------------------------------------------------------------
    //created by: ntkien 
    //created date: 09.09.2020
    getPanelDetail() {
        // var me = this;
        return (
            null
            // <Tabs defaultActiveKey="1" style={{ width: '100%', height: '230px' }} type="card" size='small'>
            //     <TabPane tab="Chi tiết" key="1">
            //         Chi tiết
            //     </TabPane>
            // </Tabs>
        );
    }
    //description: Danh sách các cột hiển thị trên grid
    //-------------------------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getColumns() {
        return []
    }

    //description: Danh sách các cột hiển thị trên grid detail
    //-------------------------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getColumnsDetail() {
        return []
    }

    //description: Show thông báo sau khi save dữ liệu
    //-------------------------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    showNotifyAfterSave() {
        var me = this;
        var { saveComplete, response } = me.props;
        if (saveComplete) {
            if (response && response.success && response.data && response.data != '0') {
                // message.success(Constant.SAVE_SUCCESS);
            }
            else {
                // message.error(Constant.SAVE_FAIL);
            }
            if (!(me.props.saveComplete && me.props.editMode === Constant.editMode.add)) {
                me.refresh();
            }
        }
    }

    //description: Thực hiện thay đổi current item khi click vào từng row
    //-------------------------------------------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    selectedChange(record) {
        var me = this;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.SELECTED_CHANGE;
        me.props.doAction(
            actionName,
            {
                record
            }
        )
    }

    //description: Lấy height của form
    //---------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getScrollHeight(toolbarheight) {
        var elements = document.getElementsByClassName("app-body");
        var scrollheight = 500;
        var headerGridHeight = 39;
        var pagingHeight = 45.5;
        if (elements && elements.length > 0) {
            scrollheight = elements[0].scrollHeight - toolbarheight - headerGridHeight - pagingHeight;
        }
        return scrollheight
    }
    //description: Lấy option filter của form
    //---------------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getFilterList() {
        return []
    }
    componentDidMount() {
        var me = this;
        var pagination = me.props.pagination,
            isloading = true,
            isbusy = false,
            searchObject = null;

        me.apicall(() => me.loadData(pagination, isloading, isbusy, searchObject));
    }
    componentDidUpdate() {
        var me = this;
        me.showNotifyAfterSave();
        //nếu đóng form chi tiết và cần refresh thì load lại data
        if (me.props.forceRefresh && !me.props.showDetail) {
            me.refresh();
        }
    }
    window_resize = () => {
        var me = this;
        me.forceUpdate();
    }

    onRowClick = (record) => {
        var me = this;
        me.selectedChange(record);
    }

    onDbRowClick = (record) => {
        var me = this;
        me.showFormDetail(Constant.editMode.edit, record[me.props.primaryKey], record);
    }
    onActiveItemChanged = (item, index, ev) => {

    }
    render() {
        var me = this;
        const itemsBreadcrumb = common.buildBreadcrumb(me.props, routes);
        const pages = itemsBreadcrumb ? itemsBreadcrumb.filter(x => x.isCurrentItem) : [];
        let title = 'Trang chủ';
        if (pages && pages.length > 0) {
            title = pages[0].name;
        }

        window.addEventListener('resize', me.window_resize);
        //nếu chưa load thì hiển thị màn hình loading
        if (me.props.isloading) {
            return (
                <div className="spin-loading">
                    {
                        common.getReactLoading({ type: 'spin', color: '#20a8d8', height: '50px', width: '50px' })
                    }
                </div>)
        }

        const toobarConfig = me.getToolBarConfig();
        const overflowToolbar = me.getOverflowToolBarConfig();
        const scrollheight = me.getScrollHeight(toobarConfig ? 40 : 0);
        let columns = [];
        const actionColumn = me.getColumnAction();
        if (actionColumn) {
            columns = actionColumn.concat(me.getColumns());
        }
        else {
            columns = me.getColumns();
        }

        const key = me.props.primaryKey ? me.props.primaryKey : me.props.entity + "Id";
        const { current, pageSize, total } = me.props.pagination;
        const propsTable = {
            rowKey: key,
            scrollheight,
            columns,
            isbusy: me.props.isbusy,
            data: me.props.data?me.props.data:[],
            activeFirstRow: me.props.activeFirstRow
        }

        var propsFormDetail = {
            showDetail: me.props.showDetail
        }
        const filterList = me.getFilterList();
        const detailForm = me.getFormDetail(propsFormDetail);
       
        return (
            <React.Fragment>

                <div className='content-header'>
                    {itemsBreadcrumb && itemsBreadcrumb.length > 1 ? <GisBreadcrumb items={itemsBreadcrumb} /> : <div className='page-title' >{title}</div>}
                    <div className='box-toolbar'>
                        {
                            toobarConfig ? <BaseToolBar items={toobarConfig} overflowItems={overflowToolbar} clickCallBack={me.toolbar_Click} /> : null
                        }
                    </div>
                </div>
                <div className='box-main-wrapper'>
                    <div className='box-main'>

                        <div className='box-nav'>
                            <GisSideBarFilter onFilter={(params) => { 
                                var pa = {...me.props.pagination};
                                pa.current=1;
                                me.handleTableChange(pa, params,me.props.sorters)
                                 }} filterList={filterList} />
                        </div>
                        <div className='box-content'>
                            <div className='content-main'>

                                {me.getSearchPanel()}

                                <div className={me.props.isMasterDetail ? 'master-table' : 'dictionary-table'}>
                                    <ScrollablePane>
                                        <GisDetailList onSort={me.onSort} onActiveItemChanged={me.onActiveItemChanged}  {...propsTable} />
                                    </ScrollablePane>
                                </div>

                                <div className='box-pagination'>
                                    <GisPagination onPaging={(param)=>me.handleTableChange(param,me.props.filters,me.props.sorters)} pagination={me.props.pagination} />
                                </div>
                                {
                                    me.props.isMasterDetail ? this.getPanelDetail() : null
                                }
                                {
                                    detailForm && me.props.showDetail ? detailForm : null
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default BaseList