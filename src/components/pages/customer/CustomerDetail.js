import React from 'react';
import BaseMasterDetailFlat from '../../base/BaseMasterDetailFlat';

import GisLabel from '../../controls/GisLabel';
import GisTextField from '../../controls/GisTextField';
import GisDatePicker from '../../controls/GisDatePicker';
import GisDropdown from '../../controls/GisDropdown';
import GisNumberField from '../../controls/GisNumberField';

import { connect } from 'react-redux';
import { doAction } from '../../../actions/action';
import * as Constant from '../../../utilities/Constant';

import { Field } from 'formik';
import * as Yup from 'yup';

const mapStateToProps = state => {
    return {
        ...state.customers
    }
}
const mapDispatchToProps = dispatch => {
    return {
        doAction: (type, param) => dispatch(doAction(type, param))
    }
}

const options=[
    {key:1,text:'Vietcombank'},
    {key:2,text:'NH Á Châu'},
    {key:3,text:'TechComBank'},
]
class CustomerDetail extends BaseMasterDetailFlat {

    getValidateForm() {
        return Yup.object({
            CustomerCode: Yup.string()
                .required('Mã khách hàng không được để trống'),
            CustomerName: Yup.string()
                .required('Tên khách hàng không được để trống'),
            BirthDate: Yup.date().required('Ngày sinh không được để trống'),
            Age: Yup.number().required('Số tuổi không được để trống'),
            BankId:Yup.string().required('Ngân hàng không được để trống')
        })
    }
    getDetailForm(props) {
        var me = this;
        return (
            <>
                <div className='flat-form-main'>
                    <div className='group-title'>Thông tin chung</div>
                    <div class="ms-Grid" dir="ltr">
                        <div class="ms-Grid-row">
                            <div class="no-padding no-padding-bottom gis-ms-Grid-col ms-Grid-col ms-lg6">
                                <div>
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisLabel required>Mã khách hàng</GisLabel></div>
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg8">
                                        {/* <GisField name="CustomerCode">
                                            <GisTextField onChange={props.handleChange} />
                                        </GisField> */}
                                        <Field name="CustomerCode">
                                            {({ field, form, meta }) => {
                                                return (
                                                    <GisTextField {...field} onChange={props.handleChange} meta={meta} submitCount={form.submitCount} />
                                                )
                                            }}
                                        </Field>

                                    </div>
                                </div>
                                <div >
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisLabel required>Tên khách hàng</GisLabel></div>
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg8">
                                        <Field name="CustomerName">
                                            {({ field, form, meta }) => {
                                                return (
                                                    <GisTextField {...field} onChange={props.handleChange} meta={meta} submitCount={form.submitCount} />
                                                )
                                            }}
                                        </Field>
                                    </div>
                                </div>
                                <div >
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisLabel>Số điện thoại</GisLabel></div>
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg8">
                                        <GisTextField />
                                    </div>
                                </div>
                            </div>
                            <div class=" no-padding no-padding-bottom gis-ms-Grid-col ms-Grid-col ms-lg6  col-padding-left">
                                <div >
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisLabel >Ngày sinh</GisLabel></div>
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg8">
                                        <Field name="BirthDate">
                                            {({ field, form, meta }) => {
                                                return (
                                                    <GisDatePicker {...field} onChange={props.handleChange} meta={meta} submitCount={form.submitCount} />
                                                )
                                            }}
                                        </Field>

                                    </div>
                                </div>
                                <div >
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisLabel >Số tuổi</GisLabel></div>
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg8">
                                        <Field name="Age">
                                            {({ field, form, meta }) => {
                                                return (
                                                    <GisNumberField {...field} onChange={props.handleChange} meta={meta} submitCount={form.submitCount} />
                                                )
                                            }}
                                        </Field>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ms-Grid-row">
                            <div class="gis-ms-Grid-col ms-Grid-col ms-lg2"><GisLabel>Địa chỉ</GisLabel></div>
                            <div class="gis-ms-Grid-col ms-Grid-col ms-lg10">
                                <GisTextField rows={3} multiline />
                            </div>
                        </div>
                    </div>
                    <div className='group-title'>Thông tin tài khoản</div>
                    <div class="ms-Grid" dir="ltr">
                        <div class="ms-Grid-row">
                            <div class="gis-ms-Grid-col ms-Grid-col ms-lg6 no-padding">
                                <div>
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisLabel >Ngân hàng</GisLabel></div>
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg8">
                                        <Field name="BankId">
                                            {({ field, form, meta }) => {
                                                return (
                                                    <GisDropdown options={options} {...field} onSelectChange={props.handleChange} meta={meta} submitCount={form.submitCount} />
                                                )
                                            }}
                                        </Field>
                                        {/* <GisDropdown /> */}
                                    </div>
                                    <div>
                                        <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisLabel >Chủ tài khoản</GisLabel></div>
                                        <div class="gis-ms-Grid-col ms-Grid-col ms-lg8"><GisTextField /></div>
                                    </div>
                                    <div>
                                        <div class="gis-ms-Grid-col  ms-Grid-col ms-lg4"><GisLabel >Số tài khoản</GisLabel></div>
                                        <div class="gis-ms-Grid-col ms-Grid-col ms-lg8"><GisTextField /></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-padding-left gis-ms-Grid-col ms-Grid-col ms-lg6 no-padding">
                                <div>
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisLabel>Ngày hết hạn</GisLabel></div>
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg8"><GisDatePicker /></div>
                                </div>
                                <div>
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisLabel>Số dư </GisLabel></div>
                                    <div class="gis-ms-Grid-col ms-Grid-col ms-lg8"><GisNumberField /></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);