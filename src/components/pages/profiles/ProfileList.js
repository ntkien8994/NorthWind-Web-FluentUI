import BaseList from '../../base/BaseList';
import { connect } from 'react-redux';
import { doAction } from '../../../actions/action';
import * as Constant from '../../../utilities/Constant';

const mapStateToProps = state => {
    return {
        ...state.profiles
    }
}
const mapDispatchToProps = dispatch => {
    return {
        doAction: (type, param) => dispatch(doAction(type, param))
    }
}
class ProfileList extends BaseList {
    process(){
        let me=this;
        me.props.history.push('/profiles/add');
    }
    getFilterList(){
        return [
            {text:'Loại giao dịch'},
            {text:'Trạng thái'},
            {text:'Họ và tên'},
            {text:'Số giấy tờ'},
            {text:'Mã biên nhận'},
            {text:'Ngày bắt đầu'},
            {text:'Hạn xử lý'},
            {text:'Số ngày'},
            {text:'Người nhận'},
            {text:'Ý kiến'},
        ]
    }
    getColumns() {
        var me = this;
        return [
            {
                key: 'IsSelected',
                fieldName: 'IsSelected',
                minWidth:30,
                maxWidth:30,
                dataType: Constant.valueType.boolean
            },
            {
                key: 'ProfileType',
                name: 'Loại giao dịch',
                fieldName: 'ProfileType',
                minWidth:120,
                maxWidth:120,
                isResizable: true,
                editable:true,
            },
            {
                key: 'Status',
                name: 'Trạng thái',
                fieldName: 'Status',
                minWidth:90,
                maxWidth:90,
                isResizable: true,
                editable:true,
            },
            {
                key: 'FullName',
                name: 'Họ và tên',
                fieldName: 'FullName',
                minWidth:180,
                maxWidth:180,
                isResizable: true,
                editable:true,
            },
            {
                key: 'NumberNo',
                name: 'Số giấy tờ',
                fieldName: 'NumberNo',
                minWidth:110,
                maxWidth:110,
                isResizable: true,
            },
            {
                key: 'Code',
                name: 'Mã biên nhận',
                fieldName: 'Code',
                minWidth:110,
                maxWidth:110,
                isResizable: true,
            },
            {
                key: 'StartDate',
                name: 'Ngày bắt đầu',
                fieldName: 'StartDate',
                minWidth:105,
                maxWidth:105,
                isResizable: true,
                dataType: Constant.valueType.datetime
            },
            {
                key: 'DueDate',
                name: 'Hạn xử lý',
                fieldName: 'DueDate',
                minWidth:90,
                maxWidth:90,
                isResizable: true,
                dataType: Constant.valueType.datetime
            },
            {
                key: 'AvaiableDay',
                name: 'Số ngày',
                fieldName: 'AvaiableDay',
                minWidth:70,
                maxWidth:70,
                isResizable: true,
                className:'number-col',
                headerClassName:'number-col-header',
                dataType: Constant.valueType.number
            },
            {
                key: 'ReceiverName',
                name: 'Người nhận',
                fieldName: 'ReceiverName',
                minWidth:100,
                maxWidth:100,
                isResizable: true
            },
            {
                key: 'Note',
                name: 'Ý kiến',
                fieldName: 'Note',
                minWidth:100
            }
        ]
    }
    //description: Danh sách chức năng toolbar
    //---------------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getToolBarConfig() {
        var me = this;
        var disabled = (!me.props.data || me.props.data == 0);
        return ([
            { key: Constant.commandName.process, text: "Xử lý hồ sơ", sortOrder: 0, iconProps: { iconName: 'Processing' } },
        ]);
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileList)
