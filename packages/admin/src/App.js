import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useRoutes} from 'react-router-dom';
import {ROLE} from './contants/auth';
import Loading from './pages/auth/Loading';
import Login from './pages/auth/Login';
import NotFound from './pages/notfound';
import {adminRoutes} from './routes/admin';
import {partnerRoutes} from './routes/partner';
import { getProfileAction } from './stores/actions/auth';

export default function AppRouter() {
	const [routers, setRouters] = useState({});
	const dispatch =useDispatch()
	const navigate = useNavigate();
	const {isLogin, role} = useSelector((state) => state.auth);
	let routes = useRoutes([
		{
			path: 'login',
			element: <Login />,
		},
		routers,
		{
			path: 'loading',
			element: <Loading />,
		},
		{
			path: '404',
			element: <NotFound />,
		},
		{
			path: '*',
			element: <NotFound />,
		},
	]);

	useEffect(() => {
		if (!isLogin) {
			dispatch(getProfileAction())
		}
	}, [isLogin]);

	useEffect(() => {
		if (role === ROLE.ADMIN) {
			setRouters(adminRoutes);
		} else if (role === ROLE.PARTNER) {
			setRouters(partnerRoutes);
		}
	}, [role]);

	return routes;
}
