import React, { useState } from 'react';
import {
    ShimmeredDetailsList,
    Sticky,
    StickyPositionType,
    TooltipHost,
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility,
    DetailsRow,
    getTheme,
    Icon
} from '@fluentui/react';
import GisTextField from '../controls/GisTextField';
import GisNumberField from '../controls/GisNumberField';
import GisDatePicker from '../controls/GisDatePicker';
import GisDropdown from '../controls/GisDropdown';
import GisCheckbox from '../controls/GisCheckbox';
import GisCommandBar from '../controls/GisCommandBar';
import * as Constant from '../../utilities/Constant';
import * as common from '../../utilities/common';


const theme = getTheme();
const onActiveItemChanged = (item, index, ev, onActiveItemChanged) => {
    if (onActiveItemChanged) {
        onActiveItemChanged(item, index, ev);
    }
}
const onRenderDetailsHeader = (props, defaultRender) => {
    if (!props) {
        return null;
    }
    const onRenderColumnHeaderTooltip = tooltipHostProps => (
        <TooltipHost {...tooltipHostProps} />
    );
    return (
        <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
            {
                defaultRender({ ...props, onRenderColumnHeaderTooltip })
            }
        </Sticky>
    );
};
const onRenderRow = (props, currentKey, setCurrentEditKey, rowKey) => {
    const customStyles = { root: { fontSize: 13 } };
    const { item } = props;
    if (props) {
        if (props.itemIndex % 2 !== 0) {
            // Every other row renders with a different background color
            customStyles.root = { backgroundColor: theme.palette.themeLighterAlt, fontSize: 13 };
        }
        if (item) {
            return <div onMouseOver={(e) => {
                if (currentKey != item[item[rowKey]]) {
                    setCurrentEditKey(item[rowKey]);
                }
            }} onMouseLeave={() => {
                setCurrentEditKey('')
            }} ><DetailsRow {...props} styles={customStyles} /></div>;
        }
    }
    return null;
};
const valueCellChanged = (e, item, value, col) => {
    item[col.fieldName] = e.target.defaultValue;
}
const actionGrid_Click = (item, commandName, actionGrid_Click) => {
    if (actionGrid_Click) {
        actionGrid_Click(item, commandName)
    }
}
const convertColumnValue = (value, dataType, datasource, memberkey, dataIndex) => {
    if (datasource && datasource.length > 0) {
        var arr = datasource.filter(x => x[dataIndex] == value);
        if (arr && arr.length > 0) {
            return arr[0][memberkey];
        }
    }
    else {
        switch (dataType) {
            case Constant.valueType.boolean:
                const iconName = value ? 'CheckboxComposite' : 'Checkbox';
                return <Icon iconName={iconName} />
                break;
            case Constant.valueType.datetime:
            case Constant.valueType.daterange:
                if (value) {
                    var date = new Date(value);
                    return common.format("{0}/{1}/{2}", common.convertMonthDate(date.getDate()), common.convertMonthDate(date.getMonth() + 1), date.getFullYear());
                }
                else {
                    return "";
                }
                break;
            case Constant.valueType.int:
            case Constant.valueType.decimal:
            case Constant.valueType.number:
                return common.formatNumber(value);
                break;
            case Constant.valueType.percent:
                return common.formatPercent(value);
                break;
            default:
                return value;
                break;
        }
    }
}
const onRenderColumn = (col, item, currentKey, allowEdit, action_Click, rowKey) => {

    //nếu đang hover trên 1 row
    if (currentKey && currentKey == item[rowKey]) {
        if (col.editable && allowEdit) {
            return <GisTextField onChange={(e) => { valueCellChanged(e, item, null, col) }} defaultValue={item[col.fieldName]} />
        }
        else if (col.actions || col.overFlowActions) {
            return <GisCommandBar overflowButtonProps={{ menuIconProps: { iconName: 'MoreVertical' } }} onItemClick={(commandName) => actionGrid_Click(item, commandName, action_Click)} items={col.actions} overflowItems={col.overFlowActions} />
        }
        else {
            return <div className={col.className}>{convertColumnValue(item[col.fieldName], col.dataType, col.dataSource, col.memberkey, col.fieldName)}</div>
        }
    }
    else {
        if (!col.showOnHover && (col.actions || col.overFlowActions)) {
            return <GisCommandBar overflowButtonProps={{ menuIconProps: { iconName: 'MoreVertical' } }} onItemClick={(commandName) => actionGrid_Click(item, commandName, action_Click)} items={col.actions} overflowItems={col.overFlowActions} />
        }
        else {
            return <div className={col.className}>{convertColumnValue(item[col.fieldName], col.dataType, col.dataSource, col.memberkey, col.fieldName)}</div>
        }
    }
}
const getEditControl = (col) => {
    return <GisTextField />
}

const onColumnClick = (col,columns,setColumns,onSort) => {
    if(col.allowSort){
        const newColumns = columns.slice();
        const currColumn = newColumns.filter(currCol => col.key === currCol.key)[0];
        if(currColumn){
            newColumns.forEach((newCol) => {
                if (newCol === currColumn) {
                    currColumn.isSortedDescending = !currColumn.isSortedDescending;
                    currColumn.isSorted = true;
                } else {
                    newCol.isSorted = false;
                    newCol.isSortedDescending = true;
                }
            });
            const sort = [
                {
                    ColumnName: col.key,
                    SortOperation: currColumn.isSortedDescending ? 'DESC' : 'ASC'
                }
            ]
            if(onSort){
                onSort(sort);
            }
            setColumns(newColumns);
        }
    }
}
const GisDetailList = (props) => {
    const { allowEdit, isbusy, onActiveItemChanged, actionGrid_Click, rowKey,onSort } = props;
    const [currentKey, setCurrentEditKey] = useState('');
    const [columns,setColumns] = useState(props.columns);
    columns.map(col => {
        col.onRender = item => onRenderColumn(col, item, currentKey, allowEdit, actionGrid_Click, rowKey);
        col.onColumnClick =(ev,column)=> onColumnClick(column,columns,setColumns,onSort);
    });
    var newCols = columns.slice();
    return (
        <ShimmeredDetailsList
            className='gis-table'
            enableShimmer={isbusy}
            items={props.data}
            columns={newCols}
            checkboxVisibility={CheckboxVisibility.hidden}
            selectionPreservedOnEmptyClick={true}
            layoutMode={DetailsListLayoutMode.justified}
            constrainMode={ConstrainMode.unconstrained}
            onRenderDetailsHeader={onRenderDetailsHeader}
            onActiveItemChanged={(item, index, ev) => onActiveItemChanged(item, index, ev, onActiveItemChanged)}
            onRenderRow={(rowProps) => onRenderRow(rowProps, currentKey, setCurrentEditKey, rowKey)}
        />
    )
}
export default GisDetailList;