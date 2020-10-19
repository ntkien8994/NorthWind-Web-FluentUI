import * as Constant from '../utilities/Constant';
const initState = {
    data: [],
    isloading: false,
    isbusy: false,
    pagination: {
        current: 1,
        pageSize: 25,
        total: 0
    },
    searchObject: null,
    entity: 'Customer',
    primaryKey: 'CustomerId',
    activeFirstRow: false,
    pageName: "Khách hàng",
    filters: null,
    sorters: null,

    id: '',
    currentItem: null,
    loadingDetailForm: false,
    showDetail: false,
    masterData: null,
    editMode: Constant.editMode.none,
    saveComplete: false,
    response: null
}
export function customers(state = initState, action) {
    var result = { ...state };
    result.activeFirstRow = false;
    result.saveComplete = false;
    switch (action.type) {
        case Constant.CustomerAction.LOAD_DATA:
            result.isloading = action.param.isloading;
            result.isbusy = action.param.isbusy;
            break;
        case Constant.CustomerAction.LOAD_COMPLETE:
            var datas = action.param.data.Data;
            result.data = datas;
            result.isloading = false;
            result.isbusy = false;
            result.pagination = action.param.pagination;
            result.filters = action.param.filters;
            result.sorters = action.param.sorters;
            result.searchObject = action.param.searchObject;
            result.id = (datas && datas.length > 0) ? datas[0][result.primaryKey] : '';
            result.currentItem = (datas && datas.length > 0) ? datas[0] : null;
            result.activeFirstRow = true;
            break;
        case Constant.CustomerAction.SHOW_FORM:
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
        case Constant.CustomerAction.CLOSE_FORM:
            result.showDetail = false;
            result.editMode = Constant.editMode.none;
            break;
        case Constant.CustomerAction.LOAD_INFO:
            result.loadingDetailForm = true;
            break;
        case Constant.CustomerAction.LOAD_INFO_COMPLETE:
            result.loadingDetailForm = false;
            result.masterData = action.param;
            break;
        case Constant.CustomerAction.SELECTED_CHANGE:
            result.id = action.param.record[result.primaryKey];
            result.currentItem = action.param.record;
            break;
        case Constant.CustomerAction.SAVE_DATA:
            result.loadingDetailForm = true;
            break;
        case Constant.CustomerAction.SAVE_DATA_COMPLETE:
            result.loadingDetailForm = false;
            result.showDetail = false;
            result.saveComplete = true;
            result.editMode = Constant.editMode.none;
            result.response = action.param.response;
            break;
        default:
            break;
    }
    return result;
}