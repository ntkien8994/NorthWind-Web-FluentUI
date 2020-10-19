import { takeEvery, put, call } from 'redux-saga/effects';
import * as Constant from '../utilities/Constant';
import { doAction } from '../actions/action';
import * as api from '../apis/apibase';
const profilesData={
    Data:[
        {
            ProfileId:1,
            ProfileType:'Đăng ký lần đầu',
            Status:'Thụ lý',
            FullName:'Nguyễn Văn Tê',
            NumberNo:'00999GF45',
            Code:'12124578.154578',
            StartDate:'10/09/2020',
            DueDate:'13/09/2020',
            AvaiableDay:3,
            ReceiverName:'Thụ lý Phương',
            
        },
        {
            ProfileId:2,
            ProfileType:'Tách thửa',
            Status:'Thụ lý',
            FullName:'Nguyễn Công Chứng',
            NumberNo:'00999GF45',
            Code:'12124578.154578',
            StartDate:'10/09/2020',
            DueDate:'13/09/2020',
            AvaiableDay:3,
            ReceiverName:'Thụ lý Hà',
            
        },
        {
            ProfileId:3,
            ProfileType:'Gộp thửa',
            Status:'Tiếp nhận',
            FullName:'Nguyễn Văn Càng',
            NumberNo:'00999GF45',
            Code:'12124578.154578',
            StartDate:'10/09/2020',
            DueDate:'13/09/2020',
            AvaiableDay:3,
            ReceiverName:'Thụ lý Phong',
            
        },
        {
            ProfileId:4,
            ProfileType:'Đăng ký lần đầu',
            Status:'Tiếp nhận',
            FullName:'Nguyễn Văn Cương',
            NumberNo:'00999GF45',
            Code:'12124578.154578',
            StartDate:'10/09/2020',
            DueDate:'13/09/2020',
            AvaiableDay:3,
            ReceiverName:'Thụ lý Phương',
            IsSelected:true
        },
        {
            ProfileId:5,
            ProfileType:'Tách thửa',
            Status:'Tiếp nhận',
            FullName:'Nguyễn Văn Hà',
            NumberNo:'00999GF45',
            Code:'12124578.154578',
            StartDate:'10/09/2020',
            DueDate:'13/09/2020',
            AvaiableDay:3,
            ReceiverName:'Thụ lý Hà',
        }
    ]
}
function* profileSaga() {
    yield takeEvery(Constant.ProfileAction.LOAD_DATA, loadData)
    yield takeEvery(Constant.ProfileAction.LOAD_INFO, loadInfo)
    yield takeEvery(Constant.ProfileAction.SAVE_DATA, saveData)
}

function* loadData(action) {
    var { pagination,filters,sorters,entity } = action.param;
    if(!sorters){
        sorters=[
            {
                ColumnName:'ModifiedDate',
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
    // var result = yield call(() => api.paging(param,entity));

    // var data = JSON.parse(result.data.data);
    // pagination.total = data.TotalCount;
    const data=profilesData;
    pagination.total=0;
    yield put(doAction(
        Constant.ProfileAction.LOAD_COMPLETE,
        {
            data,
            pagination,
            searchObject: action.searchObject
        }));
}

function* loadInfo(action) {
    var { param } = action;
    var id = (param && param.editMode === Constant.editMode.add) ? Constant.GUID_EMPTY : param.id;
    var result = yield call(() => api.getById(id,param.entity));

    var data = JSON.parse(result.data.data);

    yield put(doAction(Constant.ProfileAction.LOAD_INFO_COMPLETE, data));
}

function* saveData(action) {
    var { masterData,entity } = action.param;
    var data = {
        MasterData: JSON.stringify(masterData)
    }
    var result = yield call(() => api.saveData(data,entity));
    yield put(doAction(Constant.ProfileAction.SAVE_DATA_COMPLETE,
        {
            response:result.data
        }
    ));
}

export default profileSaga;

