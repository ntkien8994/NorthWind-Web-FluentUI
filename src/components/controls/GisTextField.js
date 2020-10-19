import React, { useState } from 'react';
import { TextField, Icon, TooltipHost } from '@fluentui/react';
const GisTextField = (props) => {
    const { meta,submitCount } = props;
    let clsName = 'gis-control';
    let message = '';
    if (meta&& meta.error && (meta.touched||submitCount>0) ) {
        message = meta.error;
        clsName = 'gis-control padding-r-input-25';
    }
    return (
        <div className='cls-form-field'>
            <TextField onKeyPress={(e)=>{
                if(e.key==='Enter'){
                    e.preventDefault();
                    e.stopPropagation();
                }
            }} className={clsName} {...props} />
            {
                message && (<div className='icon-warning'>
                    <TooltipHost content={message}>
                        <Icon iconName='Warning12' />
                    </TooltipHost>
                </div>)
            }
        </div>
    )
}
export default GisTextField;