import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
// import NoFound from '../components/pages/noFound/NoFound'
// import CallBack from '../components/authentication/CallBack';
import CustomerList from '../components/pages/customer/CustomerList';
import ProfileList from '../components/pages/profiles/ProfileList';
import ProfileDetail from '../components/pages/profiles/ProfileDetail';
import CustomerDetail from '../components/pages/customer/CustomerDetail';
import Home from '../components/pages/home/Home';

export const Router = () => (
	<BrowserRouter>
		<Switch>
			{/* <Route path='/callback' component={CallBack} /> */}
			<Route component={Layout} />
			{/* <Route component={NoFound} /> */}
		</Switch>
	</BrowserRouter>
)

export const routes = [
	{
		links: [
			{
				name: 'Trang chủ',
				url: '/',
				key: '001',
				exact: true,
				component: CustomerList,
				iconProps: {
					iconName: 'Home',
					style: {
						root: {
							fontSize: 20,
							color: '#106ebe'
						}
					}
				}
			},
			{
				name: 'Hồ sơ',
				url: '/profiles',
				key: '001002',
				exact: true,
				component: ProfileList,
				links: [
					{
						name: 'Xử lý hồ sơ',
						url: '/profiles/add',
						hideOnNav:true,
						component: ProfileDetail,
						key: '001002001',
					}
				]
			},
			{
				name: 'Khách hàng',
				url: '/customers',
				key: '001001',
				exact: true,
				component: CustomerList,
				links: [
					{
						name: 'Thêm mới khách hàng',
						url: '/customers/add',
						hideOnNav:true,
						component: CustomerDetail,
						key: '001001001',
					}
				]
			},
			{
				name: 'Giao dịch',
				url: '/1',
				key: '003',
			},
			{
				name: 'Dự án',
				url: '/2',
				key: '004',
			},
			{
				name: 'Ngăn chặn',
				url: '/3',
				key: '005',
			},
			{
				name: 'Tích hợp',
				url: '/4',
				key: '006',
			},
		]
	}
]
export const routesOverflow = [
	{
		links: [

			{
				name: 'Bản đồ',
				url: '/11',
				key: '0014',
			},
			{
				name: 'Báo cáo',
				url: '/12',
				key: '0015',
			},
			{
				name: 'Quy trình',
				url: '/13',
				key: '0016',
			},
			{
				name: 'Hệ thống',
				url: '/13',
				key: '0017',
			},
		]
	}
]



