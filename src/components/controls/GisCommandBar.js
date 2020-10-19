import React from 'react';
import {CommandBar} from '@fluentui/react';
const GisCommandBar=(props)=>{
    var { items,onItemClick,overflowItems,overflowButtonProps,className } = props;
    className=className??'grid-action';
    items=items??[];
    overflowItems=overflowItems??[];
    if(onItemClick){
        items.map(
            item=>{
                item.style={fontSize:13}
                item.onClick=(e)=>onItemClick(item.key)
            }
        );
        overflowItems.map(
            item=>{
                item.style={fontSize:13}
                item.onClick=(e)=>onItemClick(item.key)
            }
        );
    }
    return (
        <CommandBar className={className}
            items={items} overflowItems={overflowItems} overflowButtonProps={overflowButtonProps}
        />
    )
}
export default GisCommandBar;