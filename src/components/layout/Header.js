import React from 'react';
import { CommandButton, ContextualMenu, ActionButton, CommandBar } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import * as common from '../../utilities/common';
import { routes,routesOverflow } from '../../routes/router';



const menuProps = {
    // For example: disable dismiss if shift key is held down while dismissing
    onDismiss: ev => {
        if (ev && ev.shiftKey) {
            ev.preventDefault();
        }
    },
    items: [
        {
            key: 'setting',
            text: 'Thiết lập tài khoản',
            iconProps: { iconName: 'Settings' },
        },
        {
            key: 'signout',
            text: 'Đăng xuất',
            iconProps: { iconName: 'SignOut' },
        },
    ],
    directionalHintFixed: true,
};
const accountIcon = { iconName: 'Contact', className: 'ic-user' };
const loginIcon = { iconName: 'ReleaseGate' };
function collapse_click() {
    alert('ok');
}

// const _items = [
//     { href: '/', key: Constant.commandName.add, text: "Trang chủ", sortOrder: 0,className:'nav-item' },
//     { href: '/customers', key: Constant.commandName.edit, text: "Khách hàng", sortOrder: 1,className:'nav-item' },
// ]
const Header = (props) => {
    const { collapse } = props;
    const pathname = props.location.pathname;
    var links = [];
    var overflowLinks=[];
    var _items = [];
    var _itemsOverFlow = [];
    common.buildPageRoute(routes[0].links, links,true);
    common.buildPageRoute(routesOverflow[0].links, overflowLinks,true);
    var i = 0;
    for (i = 0; i < links.length; i++) {
        var className = 'nav-item';
        if (pathname && pathname === links[i].url) {
            className = 'nav-item nav-selected'
        }
        else if (!pathname && links[i].url === '/') {
            className = 'nav-item nav-selected'
        }
        var item = {
            href: links[i].url,
            key: links[i].key,
            text: links[i].name,
            className: className
        }
        _items.push(item);
    }

    var j = 0;
    for (j = 0; j < overflowLinks.length; j++) {
        var className = 'nav-item';
        if (pathname && pathname === overflowLinks[j].url) {
            className = 'nav-item nav-selected'
        }
        else if (!pathname && overflowLinks[j].url === '/') {
            className = 'nav-item nav-selected'
        }
        var item = {
            href: overflowLinks[j].url,
            key: overflowLinks[j].key,
            text: overflowLinks[j].name,
            className: className
        }
        _itemsOverFlow.push(item);
    }
    return (
        <div className='box-header'>
            <div className='box-header-left'>
                <a href='/' className='header-logo'>
                    {collapse ? 'NW' : 'CMC LIS Admin'}
                </a>
                <div onClick={collapse_click} className='collapse-button'>
                    <Icon iconName='Waffle' />
                </div>
                <CommandBar items={_items} overflowButtonProps={{className:'nav-item'}} overflowItems={_itemsOverFlow} className='nav-cls' />
            </div>
            <div className='box-header-right'>
                <ActionButton className='account-box' iconProps={loginIcon}>
                    Đăng nhập
                </ActionButton>
                {/* <CommandButton
                    className='account-box'
                    text="Nguyễn Trung Kiên"
                    iconProps={accountIcon}
                    menuProps={menuProps}
                    // Optional callback to customize menu rendering
                    menuAs={_getMenu}
                    // Optional callback to do other actions (besides opening the menu) on click
                    onMenuClick={_onMenuClick}
                    // By default, the ContextualMenu is re-created each time it's shown and destroyed when closed.
                    // Uncomment the next line to hide the ContextualMenu but persist it in the DOM instead.
                    // persistMenu={true}
                    allowDisabledFocus
                /> */}
            </div>
        </div>
    )
}
function _getMenu(props) {
    // Customize contextual menu with menuAs
    return <ContextualMenu {...props} />;
}

function _onMenuClick(ev) {
    console.log(ev);
}
export default Header;