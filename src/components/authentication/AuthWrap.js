import React from 'react';
import GeneralForm from '../base/GeneralForm';
import * as Constant from '../../utilities/Constant';
var jwtDecode = require('jwt-decode');

class AuthWrap extends GeneralForm{
    constructor(props){
        super(props);
        this.state={
            isAuthenticated:true
        }
        //this.checkToken();
    }
  
    checkToken(){
        var me=this;
        const refresh_token= me.getcookie(Constant.cookie.refresh_token);
        const access_token= me.getcookie(Constant.cookie.access_token);
        if(!access_token||!refresh_token){
            me.unAuthorization(false);
            return;
        }
        const requestBody = {
            client_id: me.getcookie(Constant.cookie.client_id),
            client_secret: me.getcookie(Constant.cookie.client_secret),
            refresh_token: refresh_token,
            grant_type: 'refresh_token'
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        var url = me.format(Constant.sso.accessTokenUri,me.getrealm());
        me.apipost(url, me.stringify(requestBody), config)
        .then((result) => {
            if(result.status==200 && result.data)
            {
                me.setcookie(Constant.cookie.access_token, result.data.access_token , { path: '/' });
                me.setcookie(Constant.cookie.refresh_token, result.data.refresh_token , { path: '/' });
                me.setcookie(Constant.cookie.id_token, result.data.id_token , { path: '/' });
                me.setcookie(Constant.cookie.token_type, result.data.token_type , { path: '/' });
                var objToken=jwtDecode(access_token);
                if(objToken){
                    this.setState(
                        {
                            isAuthenticated:true
                        }
                    );
                }
            }
        })
        .catch((err) => {
            me.unAuthorization(true);
        })
    }
    render(){
        var me=this;
        if(me.state.isAuthenticated){
            return (
                <>
                    {this.props.children}
                </>
            );
        }
        return <div></div>
    }
  };
export default AuthWrap;