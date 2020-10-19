import React from 'react';
import axios from 'axios';
import * as Constant from '../../utilities/Constant';
import * as common from '../../utilities/common';


class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        common.setcookie(Constant.cookie.realm, 'NorthWind');
        common.setcookie(Constant.cookie.client_id, 'northwind_client');
        common.setcookie(Constant.cookie.client_secret, '6fc4af9e-93ee-4fbd-aa9b-51e0841bb030');
        common.setcookie(Constant.cookie.redirect_uri, 'http://localhost:3002/callback');
    }
    render() {
        var me = this;
        return (
            <React.Fragment></React.Fragment>
        );
    }
    
    login() {
        const uuidValue = common.getnewid();
        common.setcookie('stateSession', uuidValue, { path: '/' });
        const client_id = common.getcookie(Constant.cookie.client_id);
        const redirect_uri = common.getcookie(Constant.cookie.redirect_uri);
        const realm = common.getrealm();
        const authUri = common.format(Constant.sso.authUri, realm);
        const urlAuthen = authUri + "?client_id=" + client_id + "&display=page&locale=en&redirect_uri=" + encodeURIComponent(redirect_uri) + "&response_type=code&scope=openid&state=" + uuidValue;
        window.location = urlAuthen;
    }
    logout() {
        var me = this;
        const realm = me.getrealm();

        const requestBody = {
            client_id: me.getcookie(Constant.cookie.client_id),
            client_secret: me.getcookie(Constant.cookie.client_secret),
            refresh_token: me.getcookie(Constant.cookie.refresh_token)
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        common.setcookie(Constant.cookie.access_token, '', { path: '/' });
        common.setcookie(Constant.cookie.refresh_token, '', { path: '/' });
        common.setcookie(Constant.cookie.id_token, '', { path: '/' });
        common.setcookie(Constant.cookie.token_type, '', { path: '/' });
        const url = me.format(Constant.sso.logoutUri, realm);
        me.apipost(url, me.stringify(requestBody), config)
            .then((result) => {
                me.setState(
                    {
                        isAuthenticate: false,
                        userName: '',
                        firstname: '',
                        lastname: '',
                        useRefresh_Token: false,
                        isloading: true
                    });
            })
            .catch((err) => {
                console.log(err);
            })
    }
    unAuthorization(mustlogin) {
        var me = this;
        if (mustlogin) {
            me.login();
        }
        else {
            window.location = Constant.clients.dashboard
        }
    }
    apicall(fn) {
        fn();
        // var me = this;
        // const refresh_token= me.getcookie(Constant.cookie.refresh_token);
        // const access_token= me.getcookie(Constant.cookie.access_token);
        // if(!access_token||!refresh_token){
        //     me.unAuthorization(false);
        //     return;
        // }
        // const requestBody = {
        //     client_id: me.getcookie(Constant.cookie.client_id),
        //     client_secret: me.getcookie(Constant.cookie.client_secret),
        //     refresh_token: refresh_token,
        //     grant_type: 'refresh_token'
        // }
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     }
        // }
        // var url = me.format(Constant.sso.accessTokenUri,me.getrealm());
        // me.apipost(url, me.stringify(requestBody), config)
        // .then((result) => {
        //     if(result.status==200 && result.data)
        //     {
        //         me.setcookie(Constant.cookie.access_token, result.data.access_token , { path: '/' });
        //         me.setcookie(Constant.cookie.refresh_token, result.data.refresh_token , { path: '/' });
        //         me.setcookie(Constant.cookie.id_token, result.data.id_token , { path: '/' });
        //         me.setcookie(Constant.cookie.token_type, result.data.token_type , { path: '/' });
        //         fn();
        //     }
        // })
        // .catch((err) => {
        //     me.unAuthorization(true);
        // })
    }
    apiget(url, config) {
        if (!config) {
            config = this.configHeader()
        }
        return axios.get(url, config);
    }
    apipost(url, data, config) {
        if (!config) {
            config = this.configHeader()
        }
        return axios.post(url, data, config);
    }
    
}
export default BaseComponent;