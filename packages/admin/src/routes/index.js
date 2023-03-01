import {ROLE} from '../contants/auth';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import NotFound from '../pages/notfound';
import {adminRoutes} from './admin';
import {partnerRoutes} from './partner';
import {Navigate, Outlet} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

export const handleRouter = (isLogin, role) => {
	return [
		{
			path: '/',
			element: !isLogin ? <Navigate to={'/login'} /> : <MainLayout />,
			children: role === ROLE.ADMIN ? adminRoutes : partnerRoutes,
		},

		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/signup',
			element: <Signup />,
		},

		{
			path: '404',
			element: <NotFound />,
		},
		{
			path: '*',
			element: <NotFound />,
		},
	];
};
