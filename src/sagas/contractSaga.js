import { takeEvery, put, call } from 'redux-saga/effects';
import * as Constant from '../utilities/Constant';
import { doAction } from '../actions/action';
import * as api from '../apis/apibase';
import * as productapi from '../apis/productapi';
import * as customerapi from '../apis/customerapi';
import * as contractapi from '../apis/contractapi';

const csContractId='ContractId';
const csContractDetail='ContractDetail';

function* contractSaga() {
    yield takeEvery(Constant.ContractAction.LOAD_DATA, loadData)
    yield takeEvery(Constant.ContractAction.LOAD_INFO, loadInfo)
    yield takeEvery(Constant.ContractAction.SAVE_DATA, saveData)
    yield takeEvery(Constant.ContractAction.SELECTED_CHANGE, loadDetail)
}

function* loadData(action) {
    var { pagination, filters, sorters, entity,dictionaryLoaded } = action.param;
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
    var detailData=[];
    if(data && data.Data && data.Data.length>0){
        var resDetail = yield call(() => contractapi.getDetailByMasterId(data.Data[0][csContractId], csContractDetail,csContractId));
        detailData = JSON.parse(resDetail.data.data);
    }
    pagination.total = data.TotalCount;
    var products = [];
    var customers =[];
    if(!dictionaryLoaded){
        var productRes = yield call(() => productapi.getall());
        products = JSON.parse(productRes.data.data);
        var customerRes = yield call(() => customerapi.getall());
        customers = JSON.parse(customerRes.data.data);
    }
    yield put(doAction(
        Constant.ContractAction.LOAD_COMPLETE,
        {
            data,
            pagination,
            searchObject: action.param.searchObject,
            filters:action.param.filters,
            sorters:action.param.sorters,
            products,
            customers,
            detailData
        }));
}

function* loadInfo(action) {
    var { param } = action;
    var id = (param && param.editMode == Constant.editMode.add) ? Constant.GUID_EMPTY : param.id;
    var result = yield call(() => api.getById(id, param.entity));
    var data = JSON.parse(result.data.data);
    var resDetail = yield call(() => contractapi.getDetailByMasterId(id, csContractDetail,csContractId));
    var detailData = JSON.parse(resDetail.data.data);
    var index = 0;
    if(detailData&&detailData.length>0){
        detailData.map(item=>{
            index+=1;
            item.RowId =index; 
        });
    }
    yield put(doAction(Constant.ContractAction.LOAD_INFO_COMPLETE, { data,detailData }));
}

function* saveData(action) {
    var { masterData, entity,details } = action.param;
    var detailData=[];
    if(details){
        details.map(item=>{
            detailData.push({TableName:item.TableName,Value:JSON.stringify(item.Value)})
        });
    }

    var data = {
        MasterData: JSON.stringify(masterData),
        DetailData:detailData
    }
    var result = yield call(() => api.saveData(data, entity));
    yield put(doAction(Constant.ContractAction.SAVE_DATA_COMPLETE,
        {
            response: result.data,
            saveMode:action.param.saveMode
        }
    ));
}

function* loadDetail(action) {
    var { param } = action;
    var resDetail = yield call(() => contractapi.getDetailByMasterId(param.record.ContractId, csContractDetail,csContractId));
    var detailData = JSON.parse(resDetail.data.data);
    yield put(doAction(Constant.ContractAction.SELECTED_CHANGE_COMPLETE, {detailData }));
}
export default contractSaga;

