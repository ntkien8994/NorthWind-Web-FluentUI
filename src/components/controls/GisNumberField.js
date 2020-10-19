import React, { useRef } from 'react';
import MaskedInput, { conformToMask } from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import * as common from '../../utilities/common';
import {Icon, TooltipHost} from '@fluentui/react'
const defaultMaskOptions = {
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 20, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
}
const onChange = (e, opts, inputProps) => {
    const value = common.convertStringMoneyToNumber(e.currentTarget.value, opts.thousandsSeparatorSymbol, opts.decimalSymbol);
    debugger
    if (inputProps.onChange) {
        const evt={
            target:{
                id:inputProps.name,
                name:inputProps.name,
                value
            }
        }
        inputProps.onChange(evt, value)
    }
}
const GisNumberField = ({ maskOptions, ...inputProps }) => {
    const options = {
        ...defaultMaskOptions,
        ...maskOptions,
    }
    const { meta,submitCount } = inputProps;
    let clsName = 'gis-control';
    let message = '';
    if (meta&& meta.error && (meta.touched||submitCount>0) ) {
        message = meta.error;
        clsName = 'gis-control padding-r-input-25';
    }

    const currencyMask = createNumberMask(options);
    if (inputProps.value) {
        inputProps.value = common.convertNumberToString(inputProps.value, defaultMaskOptions.thousandsSeparatorSymbol, defaultMaskOptions.decimalSymbol);
    }
    return (
        <div className='cls-form-field'>
            <div className='gis-control'> <MaskedInput className='field-number' {...inputProps} mask={currencyMask} onChange={(e) => onChange(e, options, { ...inputProps })} /></div>
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

GisNumberField.defaultProps = {
    inputMode: 'numeric',
    maskOptions: {},
}



export default GisNumberField