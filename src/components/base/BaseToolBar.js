import React from 'react';
import { CommandBar } from '@fluentui/react';

const BaseToolBar = (props) => {
    var { items,clickCallBack,overflowItems } = props;
    items=items??[];
    if(clickCallBack){
        items.map(
            item=>item.onClick=(e)=>clickCallBack(item.key)
        );
    }
    return (
        <CommandBar className='toolbar-cls'
            items={items} overflowItems={overflowItems}
        />
    )
}
export default BaseToolBar;