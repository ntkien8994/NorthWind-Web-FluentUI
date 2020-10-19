import * as Constant from '../utilities/Constant';

const initState = {
    data: [],
    isloading: false,
    isbusy: false,
    isbusyDetail: false,
    pagination: {
        current: 1,
        pageSize: 25,
        total: 0
    },
    searchObject: null,
    entity: 'Contract',
    primaryKey: 'ContractId',
    activeFirstRow: false,
    pageName: "Hợp đồng",
    filters: null,
    sorters: null,

    id: '',
    currentItem: null,
    loadingDetailForm: false,
    showDetail: false,
    formShown: false,
    masterData: null,
    editMode: Constant.editMode.none,
    saveComplete: false,
    response: null,
    isMasterDetail: true,
    formDetailWidth: 900,
    detailData: [],
    products: [],
    customers: [],
    dictionaryLoaded: false,
    forceRefresh: false
}
export function contracts(state = initState, action) {
    var result = { ...state };
    result.activeFirstRow = false;
    result.saveComplete = false;
    result.formShown = true;
    switch (action.type) {
        case Constant.ContractAction.LOAD_DATA:
            result.isloading = action.param.isloading;
            result.isbusy = action.param.isbusy;
            result.isbusyDetail = true;
            result.forceRefresh = false;
            break;
        case Constant.ContractAction.LOAD_COMPLETE:
            var datas = action.param.data.Data;
            result.data = datas;
            result.isloading = false;
            result.isbusy = false;
            result.isbusyDetail = false;
            result.pagination = action.param.pagination;
            result.filters = action.param.filters;
            result.sorters = action.param.sorters;
            result.searchObject = action.param.searchObject;
            result.id = (datas && datas.length > 0) ? datas[0][result.primaryKey] : '';
            result.currentItem = (datas && datas.length > 0) ? datas[0] : null;
            result.activeFirstRow = true;
            result.detailData = action.param.detailData ? action.param.detailData : [];
            if (!result.dictionaryLoaded) {
                result.products = action.param.products;
                result.customers = action.param.customers;
                result.dictionaryLoaded = true
            }
            break;
        case Constant.ContractAction.SHOW_FORM:
            result.showDetail = true;
            result.editMode = action.param.editMode;
            result.masterData = null;
            if (action.param.id) {
                result.id = action.param.id;
            }
            if (action.param.record) {
                result.currentItem = action.param.record;
            }
            break;
        case Constant.ContractAction.CLOSE_FORM:
            result.showDetail = false;
            result.editMode = Constant.editMode.none;
            break;
        case Constant.ContractAction.LOAD_INFO:
            result.loadingDetailForm = true;
            break;
        case Constant.ContractAction.LOAD_INFO_COMPLETE:
            result.loadingDetailForm = false;
            result.formShown = false;
            result.masterData = action.param.data;
            result.detailData = action.param.detailData;
            break;
        case Constant.ContractAction.SELECTED_CHANGE:
            result.isbusyDetail = true;
            result.id = action.param.record[result.primaryKey];
            result.currentItem = action.param.record;
            break;
        case Constant.ContractAction.SELECTED_CHANGE_COMPLETE:
            var details = action.param.detailData ? action.param.detailData : [];
            result.isbusyDetail = false;
            result.detailData = [...details];
            break;
        case Constant.ContractAction.SAVE_DATA:
            result.loadingDetailForm = true;
            break;
        case Constant.ContractAction.SAVE_DATA_COMPLETE:
            result.loadingDetailForm = false;
            var saveMode = action.param.saveMode;
            if (!saveMode || saveMode === Constant.commandName.saveAndClose) {
                result.showDetail = false;
                result.editMode = Constant.editMode.none;
            }
            else {
                if (saveMode === Constant.commandName.saveAndNew) {
                    result.editMode = Constant.editMode.add;
                    result.forceRefresh = true;
                }
                else {
                    result.editMode = Constant.editMode.none;
                    result.id = result.masterData[result.primaryKey];
                }
            }
            result.saveComplete = true;
            result.response = action.param.response;
            break;
        case Constant.ContractAction.ADD_ROW:
            var lst = [...result.detailData];
            var objAdd = action.param;
            lst.push({ ...objAdd });
            result.detailData = lst;
            break;
        case Constant.ContractAction.DELETE_ROW:
            var lstUpdate = [...result.detailData];
            //nếu trạng thái là thêm mới thì remove luôn khỏi list
            var obj = action.param;
            if (obj) {
                if (obj.EditMode === Constant.entityEditMode.add) {
                    lstUpdate = lstUpdate.filter(x => x.RowId !== obj.RowId);
                }
                else {
                    //nếu ko thì đánh dấu trạng thái là xóa 
                    lstUpdate.map(item => {
                        if (item.RowId === obj.RowId) {
                            item.EditMode = Constant.entityEditMode.delete
                            return
                        }
                    });
                }
            }
            result.detailData = lstUpdate;
            break;
        case Constant.ContractAction.CHANGE_EDITMODE:
            result.editMode = action.param.editMode;
            break;
        default:
            break;
    }
    return result;
}