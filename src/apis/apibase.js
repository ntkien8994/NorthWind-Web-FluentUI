import axios from 'axios';
import * as common from '../utilities/common';

export function paging(data,entity) {
    var config = common.getDefaultHeader();
    var url  = common.format("{0}/base/{1}/paging",common.getAPIUrl(),entity)
    return axios.post(url, data,config);
}
export function getById(id,entity){
    var config = common.getDefaultHeader();
    var url = common.format("{0}/base/{1}/{2}",common.getAPIUrl(),entity,id);
    return axios.get(url,config);  
}
export function getDetailByMasterId(masterId,entity,masterColumn){
    var config = common.getDefaultHeader();
    var url = common.format("{0}/base/{1}/{2}/{3}",common.getAPIUrl(),entity,masterColumn,masterId);
    return axios.get(url,config);  
}
export function saveData(data,entity){
    var config = common.getDefaultHeader();
    var url = common.format("{0}/base/{1}",common.getAPIUrl(),entity);
    return axios.post(url, data,config);
}