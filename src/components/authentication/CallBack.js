import React from 'react';
import GeneralBase from '../base/GeneralForm';
import * as Constant from '../../utilities/Constant';

class CallBack extends GeneralBase {
  constructor(props) {
    super(props);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const type = params.get('typecall');
    const code = params.get('code');
    const realm = params.get('realm');
    const clientid = params.get('clientid');
    this.state = {
      realm: realm,
      clientid: clientid,
      type: type,
      code: code,
      authState: 0
    }
  }
  getaccess_token() {
    var me = this;
    const realm = me.getrealm();
    const requestBody = {
      grant_type: 'authorization_code',
      code: me.state.code,
      redirect_uri: me.getcookie(Constant.cookie.redirect_uri),
      client_id: me.getcookie(Constant.cookie.client_id),
      client_secret: me.getcookie(Constant.cookie.client_secret)
    }
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const urlaccess_token = me.format(Constant.sso.accessTokenUri, realm);
    me.apipost(urlaccess_token, me.stringify(requestBody), config)
      .then((result) => {
        if (result.status == 200 && result.data) {
          me.setcookie(Constant.cookie.access_token, result.data.access_token, { path: '/' });
          me.setcookie(Constant.cookie.refresh_token, result.data.refresh_token, { path: '/' });
          //me.setcookie(Constant.cookie.id_token, result.data.id_token , { path: '/' });
          me.setcookie(Constant.cookie.token_type, result.data.token_type, { path: '/' });
          me.props.history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.getaccess_token();
  }

  doLogin(realm, clientid, clientsecret, redirect_uri) {
    var me = this;
    var param = {
      CLIENT_ID: clientid,
      DON_VI_CODE: realm,
      CLIENT_SECRET: clientsecret,
      REDIRECT_URI: redirect_uri
    }
    me.apipost(Constant.api_authentication.getLoginUrl, param)
      .then((result) => {
        if (result.data && result.data.ReturnValue) {
          window.location = result.data.ReturnValue;
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  getClient(realm, clientid) {
    // var me=this;
    // var objparam={
    //     CLIENT_CODE:clientid,
    //     CLIENT_NAME:"-1",
    //     CLIENT_TYPE:"-1",
    //     DON_VI_CODE:realm,
    //     STATUS:"-1",
    //     PAGEINDEX:1,
    //     PAGESIZE:1,
    // }
    // const url= me.format(Constant.api_donvi.clientspaging,objparam.CLIENT_CODE,objparam.CLIENT_NAME,objparam.CLIENT_TYPE,objparam.DON_VI_CODE,objparam.STATUS,objparam.PAGEINDEX,objparam.PAGESIZE);
    // me.apiget(url)
    // .then((result) => {
    //     if(result.status==200 && result.data)
    //     {
    //         const client=result.data.Data[0];

    //         me.setcookie(Constant.cookie.realm, me.state.realm);
    //         me.setcookie(Constant.cookie.client_id,me.state.clientid);
    //         me.setcookie(Constant.cookie.client_secret,client.CLIENT_SECRET);
    //         me.setcookie(Constant.cookie.redirect_uri,client.REDIRECT_URI);
    //         me.doLogin(me.state.realm,clientid,client.CLIENT_SECRET,client.REDIRECT_URI);
    //     }
    // })
    // .catch(error  => {
    //     console.log(error);
    // })
  }

  render() {
    if (this.state.authState == 0)
      return <div>Đang thực hiện...</div>;
    if (this.state.authState == 1)
      return <div>Xác thực lỗi</div>;
    if (this.state.authState == 2)
      return <div>Xác thực thành công</div>;
  }

}
export default CallBack