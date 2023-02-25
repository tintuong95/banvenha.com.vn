'use client';

import {createContext, useContext, useEffect, useReducer} from 'react';
import {AppReducer, initializeAppState} from './action';
import PropTypes from 'prop-types';

const AppContext = createContext({});

export const AppContextProvider = ({children}) => {
	const [state, dispatch] = useReducer(AppReducer, initializeAppState);
	const value = {state, dispatch};

	useEffect(() => {
		localStorage.setItem('isLogin', JSON.stringify(state.isLogin));
		localStorage.setItem('user', JSON.stringify(state.user));
		localStorage.setItem('accessToken', JSON.stringify(state.accessToken));
		
	}, [state]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

AppContextProvider.propTypes = {
	children: PropTypes.node,
};
