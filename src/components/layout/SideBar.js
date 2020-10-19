import React from 'react';
import GisNav from '../controls/GisNav';
import {routes} from '../../routes/router';

const SideBar = (props) => {
    const {collapse} = props;
    return (
        <>
            <a href='/' className='sidebar-header'>
                {collapse?'NW':'NorthWind Admin'}
            </a>
            <GisNav groups={routes}  />
        </>
    )
}
export default SideBar;