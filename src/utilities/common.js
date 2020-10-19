import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'universal-cookie';
import ReactLoading from 'react-loading';
import { v4 as uuidv4 } from 'uuid';
import qs from 'querystring';
import * as Constant from './Constant';
var jwtDecode = require('jwt-decode');

//tìm đối tượng route theo path
export function findRouteByPath(path, links) {
    var result = null;
    if (!links) {
        return;
    }
    var i = 0;
    for (i = 0; i < links.length; i++) {
        if(result){
            break;
        }
        const item = links[i];
        if (item.url === path) {
            result = item;
            break;
        }
        else if (item.links && item.links.length > 0) {
            result = findRouteByPath(path, item.links);
        }
    }
    return result;
}
//tìm đối tượng route theo key
export function findRouteByKey(key, links) {
    var result = null;
    if (!links) {
        return;
    }
    var i = 0;
    for (i = 0; i < links.length; i++) {
        if(result){
            break;
        }
        const item = links[i];
        if (item.key === key) {
            result = item;
            break;
        }
        else if (item.links && item.links.length > 0) {
            result = findRouteByKey(key, item.links);
        }
    }
    return result;
}
//đệ quy để duyệt hết các item con
export function buildPageRoute(routes, arr, skipHideItem) {
    {
        if (routes) {
            routes.map(
                route => {
                    if (!(skipHideItem && route.hideOnNav)) {
                        arr.push(route);
                    }
                    if (route['links']) {
                        buildPageRoute(route['links'], arr, skipHideItem)
                    }
                }
            )
        }
    }
}
//đệ quy để duyệt hết các item con
export function buildBreadcrumb(props, routes) {
    var result = [];
    const items = routes;
    const { pathname } = props.location;
    if (!pathname || pathname === '/') {
        var route = routes[0].links[0];
        route.isCurrentItem = true;
        route.isHome = true;
        return [route]
    }
    const itemRoute = findRouteByPath(pathname, items[0].links);
    const key = itemRoute ? itemRoute.key : '';
    var item = null;
    if (key) {
        const arr = splitStringToArray(key, 3);
        arr.map(
            (val) => {
                item = findRouteByKey(val, items[0].links);
                if (item) {
                    item.isCurrentItem = (item.url === pathname);
                    result.push(item);
                }
            }
        );
    }
    return result;
}
//cắt chuỗi tịnh tiến ra thành array theo độ dài
// ví dụ 001001001 với length = 3 => ['001','001001','001001001']
export function splitStringToArray(str, length) {
    var result = [];
    var index = 0;
    if (!str || length == 0 || str.length < length) {
        return [str];
    }
    var char = '';
    while (char !== str) {
        index = index + length;
        char = str.substring(0, index);
        result.push(char);
    }
    return result;
}

var numberFormat = Intl.NumberFormat('en-US');
export function getDefaultHeader() {
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    };
}
export function showToastMessage(message, type = 'success') {
    toast.configure({
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        draggable: false
    });
    switch (type) {
        case "success":
            toast.success(message);
            break;
        case "error":
            toast.error(message);
            break;
    }
}
export function convertMonthDate(value) {
    if (!value || value.toString().length > 1) {
        return value;
    }
    value = "0" + value;
    return value;
}
export function getDateFromAspNetFormat(date) {
    const re = /-?\d+/;
    const m = re.exec(date);
    return parseInt(m[0], 10);
}
export function formatDateJSToServer(date) {
    try {
        return (
            "/Date(" + (date.getTime() - date.getTimezoneOffset() * 60000) + ")/"
        );
    } catch (err) {
        return null;
    }
}
export function formatDateServerToJS(str) {
    try {
        var temp = str.replace(/[^0-9+ ]/g, "");
        var arr = temp.split("+");
        var t = new Date(Number(arr[0]));
        return t;

    } catch (err) {
        return null;
    }
}
export function toVNDFormat(value) {
    if (value) {
        return value.toLocaleString('en-US');
    }
    return ""
}

export function format(text, ...args) {
    return text.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
}
//lấy location của điểm triển khai
export function getLocationCode() {
    var result = getcookie(Constant.cookie.locationCode);
    if (!result) {
        result = 369;
    }
    return result;
}

export function getcookie(name) {
    const cookies = new Cookies();
    return cookies.get(name);
}
export function setcookie(name, value, options) {
    const cookies = new Cookies();
    cookies.set(name, value, options)
}
export function getReactLoading(props) {
    return <ReactLoading {...props} />
}
export function getnewid() {
    return uuidv4();
}
export function stringify(obj) {
    return qs.stringify(obj);
}
export function getusername() {
    const cookies = new Cookies();
    var accesstoken = cookies.get(Constant.cookie.access_token);
    var objtoken = accesstoken ? jwtDecode(accesstoken) : '';
    if (!accesstoken || !objtoken) {
        return "admin";
    }
    return objtoken.preferred_username;
}
export function getrealm() {
    var result = getcookie(Constant.cookie.realm);
    if (!result) {
        result = "CMCLIS-NINH_BINH";
    }
    return result;
}
export function getAPIUrl() {
    return "http://localhost:51602";
}

//description: Hàm thực hiện build điều kiện lọc
//----------------------------------------------
//created by: ntkien 
//created date: 03.09.2020
export function getFilter(filters, cols) {
    var results = [];
    if (filters) {
        if (cols && cols.length > 0) {
            cols.map((item, index) => {
                var vals = filters[item.fieldName];
                if (vals && vals.length > 0) {
                    var obj = vals[0];
                    var Operation = obj.operation;
                    var ColumnType = obj.dataType;
                    var ColumnName = item.fieldName;
                    var Value = obj.filterVal;
                    var Value2 = null;
                    if (obj.filterVal && item.dataType === Constant.valueType.datetime) {
                        var d = obj.filterVal.toDate();
                        Value = format('{0}-{1}-{2} 00:00:00', d.getFullYear(), convertMonthDate(d.getMonth() + 1), convertMonthDate(d.getDate()));
                        //nếu so sánh bằng
                        if (Operation === Constant.operationValues.equals) {
                            Value2 = format('{0}-{1}-{2} 23:59:59', d.getFullYear(), convertMonthDate(d.getMonth() + 1), convertMonthDate(d.getDate()));
                            Operation = Constant.operationValues.bettween; //toán tử bettwen
                        }
                        //nếu là nhỏ hơn bằng hoặc lớn hơn 
                        else if (Operation === Constant.operationValues.lessThanEquals || Operation === Constant.operationValues.greateThan) {
                            Value = format('{0}-{1}-{2} 23:59:59', d.getFullYear(), convertMonthDate(d.getMonth() + 1), convertMonthDate(d.getDate()));
                        }
                    }
                    else if (obj.filterVal && item.dataType === Constant.valueType.daterange) {
                        var d = obj.filterVal[0].toDate();
                        var d2 = obj.filterVal[1].toDate();
                        Value = format('{0}-{1}-{2} 00:00:00', d.getFullYear(), convertMonthDate(d.getMonth() + 1), convertMonthDate(d.getDate()));
                        Value2 = format('{0}-{1}-{2} 23:59:59', d2.getFullYear(), convertMonthDate(d2.getMonth() + 1), convertMonthDate(d2.getDate()));
                        ColumnType = Constant.valueType.datetime;
                        Operation = Constant.operationValues.bettween; //toán tử bettwen
                    }

                    results.push(
                        {
                            ColumnName,
                            Value,
                            Value2,
                            Operation: JSON.parse(Operation),
                            ColumnType: JSON.parse(ColumnType)
                        }
                    );
                }
            });
        }
    }
    return results;
}

//description: Hàm convert kiểu số
//--------------------------------
//created by: ntkien 
//created date: 10.09.2020
export function formatNumber(value) {
    var result = null;
    if (value != null && value != undefined) {
        result = numberFormat.format(value);
    }
    return result;
}

//description: Hàm convert kiểu %
//--------------------------------
//created by: ntkien 
//created date: 10.09.2020
export function formatPercent(value) {
    var result = null;
    if (value != null && value != undefined) {
        result = numberFormat.format(value) + "%";
    }
    return result;
}

//description: Hàm lấy rowid lớn nhất
//--------------------------------
//created by: ntkien 
//created date: 10.09.2020
export function getMaxId(arr, key) {
    var maxid = 0;
    if (arr) {
        arr.map(item => {
            if (item[key] > maxid) {
                maxid = item[key];
            }
        });
    }
    return maxid + 1;
}
//description: Hàm convert string sang kiểu số thực
//------------------------------------------------
//created by: ntkien 
//created date: 09.10.2020
export function convertStringMoneyToNumber(strvalue, separatorSymbol, decimalSymbol) {
    var result = 0;
    if (!strvalue) {
        return 0;
    }
    strvalue = strvalue.replaceAll(separatorSymbol, '').replace(decimalSymbol, '.');
    result = parseFloat(strvalue);
    return result;
}
//description: Hàm convert kiểu số thực sang string
//------------------------------------------------
//created by: ntkien 
//created date: 09.10.2020
export function convertNumberToString(value, separatorSymbol, decimalSymbol) {
    var result = '';
    var n = value.toString();
    var parts = n.split(".");
    var result = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separatorSymbol) + (parts[1] ? decimalSymbol + parts[1] : "");
    return result;
}