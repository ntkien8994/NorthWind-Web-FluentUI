import React from 'react';
import { Dialog,DialogType,DialogFooter } from '@fluentui/react';
import * as Constant from '../../utility/Constant';
import BaseComponent from './BaseComponent';


class BaseDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = this.initState();
        this.afterInit();
    }
    initState() {
        return {
            MasterData: this.props.MasterData
        }
    }
    afterInit() {

    }

    onValueChange = (sender, obj) => {
        var value = '';
        var name = '';
        if (obj) {
            if (obj.length > 0) {
                name = obj[0].tagClassName;
                value = obj[0].value;
            }
            else {
                name = sender.tagClassName;
                value = '';
            }
        }
        else {
            const target = sender.target;
            value = target.type === 'checkbox' ? target.checked : target.value;
            name = target.name;
        }
        var objMaster = this.state.MasterData;
        objMaster[name] = value;
    }

    render() {
        return (
            <Dialog>
                <DialogFooter>
                    <PrimaryButton text="Đồng ý" />
                    <DefaultButton text="Hủy bỏ" />
                </DialogFooter>
            </Dialog>
        );
    }

    componentDidMount() {
        var me = this;
        me.apicall(() => {
            me.bindingData();
        })
    }
    customData(masterData) {

    }
    loadData() {
        var me = this;
        const url = me.format(me.state.detailurl, me.state.id);
        me.apiget(url)
            .then((result) => {
                if (result.data.Data) {
                    var data = result.data.Data;
                    me.customData(data);
                    if (me.state.detailByMasterurl) {
                        me.state.MasterData = data;
                        me.loadDetailByMaster(me.state.MasterData[me.state.primaryKey ? me.state.primaryKey : "ID"]);
                    }
                    else {
                        me.state.MasterData = data;
                        me.doAfterLoadData();
                    }
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    doAfterLoadData() {
        var me = this;
        me.setState(
            {
                isloading: false
            });
    }
    customDetailUrl(masterId) {
        var me = this;
        return me.format(me.state.detailByMasterurl, masterId);
    }
    loadDetailByMaster(masterId) {
        var me = this;
        const url = me.customDetailUrl(masterId);
        me.apiget(url)
            .then((result) => {
                if (result.data.Data) {
                    var data = result.data.Data;
                    me.prepareDetailData(data);
                    me.state.detailData = data
                    me.doAfterLoadData();
                }

            })
            .catch(error => {
                console.log(error);
            })
    }
    prepareDetailData(data) {

    }

    loadDataForAdd() {
        var me = this;
        me.state.MasterData = me.initNewData();
        me.doAfterLoadData();
    }
    initNewData() {

    }
    bindingData() {
        var me = this;
        if (me.state.editmode == Constant.editMode.add) {
            me.loadDataForAdd();
        } else if (me.state.editmode == Constant.editMode.edit) {
            me.loadData();
        }
    }
    validate() {
        return true;
    }
    saveData = () => {
        var me = this;
        if (me.validate()) {
            me.prepareData();
            me.apicall(() => me.submitData());
        }
    }
    closeForm = (sender) => {
        var me = this;
        me.props.history.push(me.state.pushurl ? me.state.pushurl : '/');
    }

    submitData() {
        var me = this;
        const method = "post";
        if (me.state.editmode == Constant.editMode.add) {
            me.apipost(me.state.baseurl, me.state.MasterData)
                .then((result) => {
                    me.afterSaveComplete(result);
                    me.props.onSaveSuccess();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else if (me.state.editmode == Constant.editMode.edit) {
            me.apiput(me.state.baseurl, me.state.MasterData)
                .then((result) => {
                    me.afterSaveComplete(result);
                    me.props.onSaveSuccess();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    prepareData() {

    }

    afterSaveComplete(result) {
        var me = this;
        if (result.data.ResultCode == "403") {
            me.showToastMessage(result.data.Message, "error")
        }
        else {
            me.showToastMessage("Cất dữ liệu thành công!", "success");
            if (me.state.isDialogForm) {
                this.props.onHide()
            }
            else {
                me.props.history.push(me.state.pushurl ? me.state.pushurl : "/");
            }
        }
    }
    afterSaveFail(message) {
        if (message) {
            alert(message);
        }
    }
}
export default BaseDetail