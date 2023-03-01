import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRoutes} from 'react-router-dom';
import {ROLE} from './contants/auth';

import {handleRouter} from './routes';

import {getProfileAction} from './stores/actions/auth';

export default function AppRouter() {
	const dispatch = useDispatch();
	const {isLogin, role} = useSelector((state) => state.auth);
	let routes = useRoutes(handleRouter(isLogin, role));

	useEffect(() => {
		if (!isLogin) {
			dispatch(getProfileAction());
		}
	}, [isLogin]);

	return routes;
}
