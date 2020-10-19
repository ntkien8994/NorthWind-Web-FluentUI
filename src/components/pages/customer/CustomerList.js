import BaseList from '../../base/BaseList';
import { connect } from 'react-redux';
import { doAction } from '../../../actions/action';
import * as Constant from '../../../utilities/Constant';

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
class CustomerList extends BaseList {
    //description: method Add
    //-----------------------
    //created by: ntkien 
    //created date: 31.08.2020
    addNew(){
        let me=this;
        me.props.history.push('/customers/add');
    }

    getFilterList(){
        return [
            {text:'Mã khách hàng',dataField:'CustomerCode',dataType:Constant.valueType.string},
            {text:'Tên khách hàng',dataField:'CustomerName',dataType:Constant.valueType.string},
            {text:'Tuổi',dataField:'Age',dataType:Constant.valueType.number},
            {text:'Doanh số',dataField:'Revenue',dataType:Constant.valueType.number},
            {text:'Số điện thoại',dataField:'Phone',dataType:Constant.valueType.string},
            {text:'Địa chỉ',dataField:'Address',dataType:Constant.valueType.string},
            {text:'Ngày tạo',dataField:'CreatedDate',dataType:Constant.valueType.datetime}
        ]
    }
    getColumns() {
        var me = this;
        return [
            {
                key: 'Inactive',
                name: 'Ngừng theo dõi',
                fieldName: 'Inactive',
                minWidth:120,
                maxWidth:120,
                dataType:Constant.valueType.boolean
            },
            {
                key: 'CustomerCode',
                name: 'Mã khách hàng',
                fieldName: 'CustomerCode',
                minWidth:150,
                maxWidth:150,
                isResizable: true,
            },
            {
                key: 'CustomerName',
                name: 'Tên khách hàng',
                fieldName: 'CustomerName',
                minWidth:200,
                maxWidth:200,
                isResizable: true,
                allowSort: true
            },
            {
                key: 'Age',
                name: 'Tuổi',
                fieldName: 'Age',
                minWidth:60,
                maxWidth:60,
                isResizable: true,
                allowSort: true,
                dataType: Constant.valueType.number
            },
            {
                key: 'Revenue',
                name: 'Doanh số',
                fieldName: 'Revenue',
                minWidth:90,
                maxWidth:90,
                isResizable: true,
                allowSort: true,
                headerClassName:'number-col-header',
                className:'number-col',
                dataType: Constant.valueType.number
            },
            {
                key: 'Phone',
                name: 'Số điện thoại',
                fieldName: 'Phone',
                minWidth:110,
                maxWidth:110,
                isResizable: true,
                allowSort: true
            },
            {
                key: 'CreatedDate',
                name: 'Ngày tạo',
                fieldName: 'CreatedDate',
                minWidth:100,
                maxWidth:100,
                allowSort: true,
                dataType:Constant.valueType.datetime
            },
            {
                key: 'Address',
                name: 'Địa chỉ',
                fieldName: 'Address',
                minWidth:100,
                allowSort: true
            }
        ]
    }
    // getFormDetail(propsFormDetail) {
    //     return <CustomerDetail {...propsFormDetail} />
    // }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)
