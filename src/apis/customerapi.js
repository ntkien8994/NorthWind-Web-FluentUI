import axios from 'axios';
import * as common from '../utilities/common';

export function paging(data) {
    var config = common.getDefaultHeader();
    var url  = common.format("{0}/base/customer/paging",common.getAPIUrl())
    return axios.post(url, data,config);
}
export function getById(id){
    var config = common.getDefaultHeader();
    var url = common.format("{0}/base/customer/{1}",common.getAPIUrl(),id);
    return axios.get(url,config);  
}
export function getall(){
    var config = common.getDefaultHeader();
    var url = common.format("{0}/base/customer",common.getAPIUrl());
    return axios.get(url,config);  
}
export function saveData(data){
    var config = common.getDefaultHeader();
    var url = common.format("{0}/base/customer",common.getAPIUrl());
    return axios.post(url, data,config);
}