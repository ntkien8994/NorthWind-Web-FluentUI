import { takeEvery, put, call } from 'redux-saga/effects';
import * as Constant from '../utilities/Constant';
import { doAction } from '../actions/action';
import * as api from '../apis/apibase';
import * as common from '../utilities/common';

function* customerSaga() {
    yield takeEvery(Constant.CustomerAction.LOAD_DATA, loadData)
    yield takeEvery(Constant.CustomerAction.LOAD_INFO, loadInfo)
    yield takeEvery(Constant.CustomerAction.SAVE_DATA, saveData)
}

function* loadData(action) {
    var { pagination, filters, sorters, entity } = action.param;
    if (!sorters) {
        sorters = [
            {
                ColumnName: 'ModifiedDate',
                SortOperation: 'DESC'
            }
        ]
    }
    var skip = (pagination.current - 1) * pagination.pageSize;
    var param = {
        Skip: skip,
        Take: pagination.pageSize,
        OrderInfos: sorters,
        WhereInfos: filters
    }
    var result = yield call(() => api.paging(param, entity));
    var data = JSON.parse(result.data.data);
    pagination.total = data.TotalCount;
    debugger
    yield put(doAction(
        Constant.CustomerAction.LOAD_COMPLETE,
        {
            data,
            pagination,
            searchObject: action.param.searchObject,
            filters:action.param.filters,
            sorters:action.param.sorters
        }));
}

function* loadInfo(action) {
    var { param } = action;
    var id = (param && param.editMode === Constant.editMode.add) ? Constant.GUID_EMPTY : param.id;
    var result = yield call(() => api.getById(id, param.entity));

    var data = JSON.parse(result.data.data);

    yield put(doAction(Constant.CustomerAction.LOAD_INFO_COMPLETE, data));
}

function* saveData(action) {
    var { masterData, entity } = action.param;
    var data = {
        MasterData: JSON.stringify(masterData)
    }
    var result = yield call(() => api.saveData(data, entity));
    yield put(doAction(Constant.CustomerAction.SAVE_DATA_COMPLETE,
        {
            response: result.data
        }
    ));
}

export default customerSaga;

