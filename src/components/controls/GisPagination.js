import React from 'react';
import { IconButton, Label } from '@fluentui/react';
import * as Constant from '../../utilities/Constant';

const onClick = (commandName, pagination, onPaging) => {
    var param = { ...pagination };
    switch (commandName) {
        case Constant.commandName.first:
            param.current = 1;
            break;
        case Constant.commandName.previous:
            if (param.current > 1) {
                param.current -= 1;
            }
            break;
        case Constant.commandName.next:
            param.current += 1;
            break;
        case Constant.commandName.last:
            param.current = Math.ceil(param.total / param.pageSize);
            break;
    }
    if(onPaging){
        onPaging(param)
    }
}
const GisPagination = (props) => {
    const { pagination, onPaging } = props;
    const from = pagination.current * pagination.pageSize - pagination.pageSize + 1;
    let to = pagination.current * pagination.pageSize;
    if (to > pagination.total) {
        to = pagination.total;
    }
    return (
        <div className='pagination-function'>
            <Label styles={{ root: { marginRight: 10 } }} >Tổng số bản ghi: {pagination.total}</Label>
            <IconButton disabled={from == 1} onClick={() => onClick(Constant.commandName.first, pagination, onPaging)} iconProps={{ iconName: 'DoubleChevronLeft' }} />
            <IconButton disabled={from == 1} onClick={() => onClick(Constant.commandName.previous, pagination, onPaging)} iconProps={{ iconName: 'ChevronLeft' }} />
            <Label styles={{ root: { fontWeight: 'normal' } }} >{from} đến {to}</Label>
            <IconButton disabled={to == pagination.total} onClick={() => onClick(Constant.commandName.next, pagination, onPaging)} iconProps={{ iconName: 'ChevronRight' }} />
            <IconButton disabled={to == pagination.total} onClick={() => onClick(Constant.commandName.last, pagination, onPaging)} iconProps={{ iconName: 'DoubleChevronRight' }} />
        </div>
    )
}

export default GisPagination;