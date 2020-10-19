import * as Constant from '../utility/Constant';
//description: load dữ liệu danh sách
//-----------------------------------
//created by: ntkien 
//created date: 24.08.2020
export function loadData(param){
    return {
        type:Constant.CustomerAction.LOAD_DATA,
        param
    }
}
//description: hoàn thành việc load dữ liệu danh sách
//---------------------------------------------------
//created by: ntkien 
//created date: 24.08.2020
export function loadComplete(param){
    var {data,pagination,searchObject} = param;
    return {
        type:Constant.CustomerAction.LOAD_COMPLETE,
        isloading: false,
        isbusy:false,
        data,
        pagination,
        searchObject
    }
}

//description: hiển thị form chi tiết
//-----------------------------------
//created by: ntkien 
//created date: 24.08.2020
export function showFormInfo(param){
    return {
        type:Constant.CustomerAction.SHOW_FORM,
        param
    }
}

//description: load thông tin chi tiết của một đối tượng
//------------------------------------------------------
//created by: ntkien 
//created date: 24.08.2020
export function loadInfo(param){
    return {
        type:Constant.CustomerAction.LOAD_INFO,
        param
    }
}

// //description: load thông tin chi tiết của một đối tượng
// //------------------------------------------------------
// //created by: ntkien 
// //created date: 24.08.2020
// export function loadInfoComplete(param){
//     return {
//         type:Constant.CustomerAction.LOAD_INFO_COMPLETE,
//         param
//     }
// }

//description: đóng form
//-----------------------
//created by: ntkien 
//created date: 24.08.2020
export function closeForm(param){
    return {
        type:Constant.CustomerAction.CLOSE_FORM,
        param
    }
}