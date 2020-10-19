import React, { useState } from 'react';
import GisCheckbox from '../controls/GisCheckbox';
import GisDropdown from '../controls/GisDropdown';
import GisCommandBar from '../controls/GisCommandBar';
import GisTextField from '../controls/GisTextField';
import GisNumberField from '../controls/GisNumberField';
import GisDatePicker from '../controls/GisDatePicker';
import * as Constant from '../../utilities/Constant';
import { Stack, FontIcon, IconButton } from '@fluentui/react';
import * as common from '../../utilities/common';

//description: change value
//--------------------------------
//created by: ntkien 
//created date: 12.10.2020
const valueChange = (item, value) => {
    item.filterValue = value;
}

//description: change value operation
//--------------------------------
//created by: ntkien 
//created date: 12.10.2020
const valueOperationChange = (item, value) => {
    item.operation = value
}

//description: control cho filter
//--------------------------------
//created by: ntkien 
//created date: 12.10.2020
const filterControl = (item, filters, onFilter) => {
    var options = [];
    var filterControl = <GisTextField onKeyPress={(e) => {
        if (e.key === 'Enter') {
            onItemClick(Constant.commandName.apply, filters, onFilter);
        }
    }} onChange={(e, newvalue) => { valueChange(item, newvalue) }} defaultValue={item.filterValue} />
    switch (item.dataType) {
        case Constant.valueType.int:
        case Constant.valueType.decimal:
        case Constant.valueType.number:
            filterControl = <GisNumberField onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    onItemClick(Constant.commandName.apply, filters, onFilter);
                }
            }}  onChange={(e, newvalue) => { valueChange(item, newvalue) }} value={item.filterValue} />
            options = Constant.operationCompare;
            break;
        case Constant.valueType.datetime:
            filterControl = <GisDatePicker onSelectDate={(date) => { valueChange(item, date) }} value={item.filterValue} />
            options = Constant.operationCompare;
            break;
        case Constant.valueType.daterange:
            break;
        default:
            options = Constant.operationFilter;
            break;
    }
    return (
        <div className='filter-operation'>
            <GisDropdown defaultSelectedKey={options[0].key} options={options} onChange={(e, opt) => { valueOperationChange(item, opt.key) }} style={{ width: 60 }} />
            {filterControl}
        </div>
    )
}
//description: event click command bar
//------------------------------------
//created by: ntkien 
//created date: 10.10.2020
const onItemClick = (commandName, filters, onFilter) => {
    if (onFilter) {
        let params = [];
        var param = null;
        switch (commandName) {
            case Constant.commandName.apply:
                filters.map(item => {
                    if (item.checked) {
                        var Value = item.filterValue;
                        var Value2 = null;
                        var Operation = item.operation ? item.operation : Constant.operationCompare[0].key;

                        if (Value && item.dataType === Constant.valueType.datetime) {
                            var d = Value
                            Value = common.format('{0}-{1}-{2} 00:00:00', d.getFullYear(), common.convertMonthDate(d.getMonth() + 1), common.convertMonthDate(d.getDate()));
                            //nếu so sánh bằng
                            if (Operation === Constant.operationValues.equals) {
                                Value2 = common.format('{0}-{1}-{2} 23:59:59', d.getFullYear(), common.convertMonthDate(d.getMonth() + 1), common.convertMonthDate(d.getDate()));
                                Operation = Constant.operationValues.bettween; //toán tử bettwen
                            }
                            //nếu là nhỏ hơn bằng hoặc lớn hơn 
                            else if (Operation === Constant.operationValues.lessThanEquals || Operation === Constant.operationValues.greateThan) {
                                Value = common.format('{0}-{1}-{2} 23:59:59', d.getFullYear(), common.convertMonthDate(d.getMonth() + 1), common.convertMonthDate(d.getDate()));
                            }
                        }
                        param = {
                            ColumnName: item.dataField,
                            ColumnType: JSON.parse(item.dataType),
                            Operation: JSON.parse(Operation),
                            Value: Value,
                            Value2: Value2
                        }
                        //nếu là kiểu datetime mà ko nhập giá trị thì ko add vào filter list
                        if (!(!param.Value && item.dataType === Constant.valueType.datetime)) {
                            params.push(param);
                        }
                    }
                });
                break;
            default:
                break;
        }
        onFilter(params);
    }
}

const clearFilter = (filters, setFilterList, onFilter) => {
    filters.map(item => item.checked = false);
    setFilterList(filters.slice())
    if (onFilter) {
        onFilter(null);
    }
}
//description: control sidebar filter
//------------------------------------
//created by: ntkien 
//created date: 12.10.2020
const GisSideBarFilter = (props) => {
    const { filterList, onFilter } = props;
    const [filters, setFilterList] = useState(filterList);
    let disableApply = true;
    if (filters) {
        let i = 0;
        for (i = 0; i < filters.length; i++) {
            if (filters[i].checked) {
                disableApply = false;
                break;
            }
        }
    }
    const items = [
        { key: Constant.commandName.apply, disabled: disableApply, text: 'Áp dụng', iconProps: { iconName: 'CheckMark' } },
        { key: Constant.commandName.save, disabled: true, text: 'Lưu lại', iconProps: { iconName: 'QueryList' } }
    ]
    const displayFilter = disableApply ? 'none' : 'block';
    return (
        <>
            <div className='box-nav-top'>
                <div className='box-nav-header'>
                    <div><FontIcon iconName='Filter' style={{ marginRight: 10 }} />Bộ lọc</div>
                    <IconButton onClick={() => { clearFilter(filters, setFilterList, onFilter) }} style={{ display: displayFilter }} title='Xóa bộ lọc' iconProps={{ iconName: 'ClearFilter' }} />
                </div>
                <div className='box-nav-main'>
                    <Stack tokens={{ childrenGap: 10 }}>
                        {
                            filters.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <GisCheckbox onChange={(e, checked) => {
                                            item.checked = checked;
                                            item.filterValue = undefined;
                                            setFilterList(filters.slice());
                                            //nếu ko còn thằng nào checked thì load data luôn
                                            if (!checked) {
                                                let allowFilter = true;
                                                let i = 0;
                                                for (i == 0; i < filters.length; i++) {
                                                    if (filters[i].checked) {
                                                        allowFilter = false;
                                                        break;
                                                    }
                                                }
                                                if (allowFilter) {
                                                    onFilter();
                                                }
                                            }
                                        }} checked={item.checked} label={item.text} />
                                        {item.checked ? filterControl(item,filters,onFilter) : null}
                                    </div>
                                )
                            })
                        }
                    </Stack>
                </div>
            </div>
            <div className='box-nav-bottom'>
                <GisCommandBar className='gis-commandBar' items={items} onItemClick={(commandName) => onItemClick(commandName, filters, onFilter)} />
            </div>
        </>
    )
}
export default GisSideBarFilter;