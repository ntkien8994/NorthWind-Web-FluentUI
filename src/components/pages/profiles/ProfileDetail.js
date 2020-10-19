import React from 'react';
import BaseMasterDetailFlat from '../../base/BaseMasterDetailFlat';
import { Link } from 'react-scroll';
import GisLabel from '../../controls/GisLabel';
import GisTextField from '../../controls/GisTextField';
import GisDatePicker from '../../controls/GisDatePicker';
import GisDropdown from '../../controls/GisDropdown';
import GisNumberField from '../../controls/GisNumberField';


class ProfileDetail extends BaseMasterDetailFlat {
    handleChange=(e,value)=>{
        debugger
    }
    getDetailForm() {
        var me = this;
        const offset = -16;
        const duration = 200;
        return (
            <>
                <div className='flat-form-main'>
                    <div className='wiget' id='section1'>
                        <div className='group-title'>Đơn đăng ký</div>
                        <div class="ms-Grid" dir="ltr">
                            <div class="ms-Grid-row">
                                <div class="gis-ms-Grid-col ms-Grid-col ms-lg2"><GisLabel required>Mã biên nhận</GisLabel></div>
                                <div class="gis-ms-Grid-col ms-Grid-col ms-lg4">
                                    <GisNumberField onChange={me.handleChange}  />
                                </div>
                                <div class="gis-ms-Grid-col col-padding-left ms-Grid-col ms-lg2"><GisLabel required>Mã hồ sơ lưu</GisLabel></div>
                                <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisTextField /></div>
                            </div>
                            <div class="ms-Grid-row">
                                <div class="gis-ms-Grid-col ms-Grid-col ms-lg2"><GisLabel>Ngày đăng ký</GisLabel></div>
                                <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisDatePicker /></div>
                                <div class="gis-ms-Grid-col col-padding-left ms-Grid-col ms-lg2"><GisLabel required>Người đứng đơn</GisLabel></div>
                                <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisTextField /></div>
                            </div>
                            <div class="ms-Grid-row">
                                <div class="gis-ms-Grid-col ms-Grid-col ms-lg2"><GisLabel>Đợt đăng ký</GisLabel></div>
                                <div class="gis-ms-Grid-col ms-Grid-col ms-lg4"><GisDropdown /></div>
                            </div>
                            <div class="ms-Grid-row">
                                <div class="gis-ms-Grid-col ms-Grid-col ms-lg2"><GisLabel>Ghi chú</GisLabel></div>
                                <div class="gis-ms-Grid-col ms-Grid-col ms-lg10"><GisTextField multiline rows={3} /></div>
                            </div>
                        </div>
                    </div>
                    <div className='wiget cls-section' id='section2'>
                        <div className='group-title'>Thông tin giấy chứng nhận</div>
                    </div>
                    <div className='wiget cls-section' id='section3'>
                        <div className='group-title'>Hồ sơ pháp lý</div>
                    </div>
                    <div className='wiget cls-section' id='section4'>
                        <div className='group-title'>Nghĩa vụ tài chính</div>
                    </div>
                    <div className='wiget cls-section' id='section5'>
                        <div className='group-title'>Thông báo thuế</div>
                    </div>
                </div>
                <div className='flat-form-sidebar-right'>
                    <ul>
                        <li><Link
                            activeClass="active"
                            to="section1"
                            spy={true}
                            smooth={true}
                            offset={offset}
                            containerId="containerElement"
                            duration={duration}
                        >Đơn đăng ký</Link></li>
                        <li>
                            <Link
                                activeClass="active"
                                to="section2"
                                spy={true}
                                smooth={true}
                                offset={offset}
                                containerId="containerElement"
                                duration={duration}
                            >Giấy chứng nhận</Link>
                        </li>
                        <li>
                            <Link
                                activeClass="active"
                                to="section3"
                                spy={true}
                                smooth={true}
                                offset={offset}
                                containerId="containerElement"
                                duration={duration}
                            >Hồ sơ pháp lý</Link>
                        </li>
                        <li>
                            <Link
                                activeClass="active"
                                to="section4"
                                spy={true}
                                smooth={true}
                                offset={offset}
                                containerId="containerElement"
                                duration={duration}
                            >Nghĩa vụ tài chính</Link>
                        </li>
                        <li>
                            <Link
                                activeClass="active"
                                to="section5"
                                spy={true}
                                smooth={true}
                                offset={offset}
                                containerId="containerElement"
                                duration={duration}
                            >Thông báo thuế</Link>
                        </li>
                    </ul>
                </div>

            </>
        )
    }
}
export default ProfileDetail;