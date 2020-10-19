import axios from 'axios';
import * as common from '../utilities/common';

export function getall() {
    var config = common.getDefaultHeader();
    var url  = common.format("{0}/base/product",common.getAPIUrl())
    return axios.get(url,config);
}
