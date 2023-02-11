import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {useNavigate, useRoutes} from 'react-router-dom';
import { ROLE } from './contants/auth';
import Loading from './pages/auth/Loading';
import Login from './pages/auth/Login';
import NotFound from './pages/notfound';
import {adminRoutes} from './routes/admin';
import {partnerRoutes} from './routes/partner';

export default function AppRouter() {
	const [routers, setRouters] = useState({});
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
		if (!isLogin) navigate('/login');
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
