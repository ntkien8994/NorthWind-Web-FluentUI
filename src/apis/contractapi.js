import axios from 'axios';
import * as common from '../utilities/common';

export function getDetailByMasterId(masterId){
    var config = common.getDefaultHeader();
    var url = common.format("{0}/Contract/GetDetailViewByMaster/{1}",common.getAPIUrl(),masterId);
    return axios.get(url,config);  
}