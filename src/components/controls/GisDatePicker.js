import React, { useState } from 'react';
import { DatePicker,Icon, TooltipHost } from '@fluentui/react';
import moment, { unix } from 'moment';
import * as Constant from '../../utilities/Constant';

const dayPickerStrings = {
  months: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  shortMonths: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
  days: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  shortDays: ['CN', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy'],
  goToToday: 'Ngày hiện tại',
  weekNumberFormatString: 'Tuần thứ {0}',
  prevMonthAriaLabel: 'Tháng trước',
  nextMonthAriaLabel: 'Tháng sau',
  prevYearAriaLabel: 'Năm trước',
  nextYearAriaLabel: 'Năm sau',
  prevYearRangeAriaLabel: 'Khoảng năm trước',
  nextYearRangeAriaLabel: 'Khoảng năm sau',
  closeButtonAriaLabel: 'Đóng',
  monthPickerHeaderAriaLabel: '{0}, Chọn để thay đổi năm',
  yearPickerHeaderAriaLabel: '{0}, Chọn để thay đổi tháng',
};
const onFormatDate = (date) => {
  let dmomment =  new moment(date,Constant.FORMAT_DATETIME);
  return dmomment.format(Constant.FORMAT_DATE);
  // debugger
  // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
};
const onSelectDate = (date,onChange,fieldName,setDate)=>{
  if(onChange){
    const evt = {
      target: { 
        id:fieldName, 
        name: fieldName,
        value:date
      }
    }
    onChange(evt);
  }
  setDate(date);
}
const GisDatePicker = (props) => {
  const { meta,submitCount,onChange,value } = props;
  const [selectedDate,setDate]=useState(value);
  let clsName = 'gis-control';
  let message = '';
  if (meta&& meta.error && (meta.touched||submitCount>0) ) {
    message = meta.error;
    clsName = 'gis-control padding-r-input-25';
  }
  
  return (
    <div className='cls-form-field'>
      <DatePicker
        strings={dayPickerStrings}
        className={clsName}
        {...props}
        value={selectedDate}
        onSelectDate={(date)=>onSelectDate(date,onChange,props.name,setDate)}
        formatDate={onFormatDate}
      />
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
export default GisDatePicker;