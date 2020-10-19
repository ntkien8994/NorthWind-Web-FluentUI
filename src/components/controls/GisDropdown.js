import React from 'react';
import { Dropdown, Icon, TooltipHost } from '@fluentui/react';
const onValueChanged = (opt, onSelectChange, fieldName) => {
  if (onSelectChange) {
    const evt = {
      target: {
        id: fieldName,
        name: fieldName,
        value: opt && opt.key ? opt.key : undefined
      }
    }
    onSelectChange(evt);
  }
}
const GisDropdown = (props) => {
  const { meta, submitCount, onSelectChange,value } = props;
  let clsName = 'gis-control';
  let message = '';
  if (meta && meta.error && (meta.touched || submitCount > 0)) {
    message = meta.error;
    clsName = 'gis-control padding-r-input-25';
  }
  return (
    <div className='cls-form-field'>
      <Dropdown  className='gis-control' {...props} selectedKey={value} onChange={(e, opt) => {
        onValueChanged(opt, onSelectChange, props.name)
      }} />
      {
        message && (<div className='icon-warning position-right'>
          <TooltipHost content={message}>
            <Icon iconName='Warning12' />
          </TooltipHost>
        </div>)
      }
    </div>
  )
}
export default GisDropdown;