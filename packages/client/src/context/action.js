'use client'
export const SET_USER = 'SET_USER';
export const SET_IS_LOGIN = 'SET_LOGIN';
export const SET_LOGOUT = 'SET_LOGOUT';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const initializeAppState = {
	isLogin: JSON.parse(localStorage.getItem('isLogin')) || false,
	user: JSON.parse(localStorage.getItem('user')) || {},
	accessToken: JSON.parse(localStorage.getItem('accessToken')) || null,
};

export const AppReducer = (state, action) => {
	const {type, payload} = action;

	switch (type) {
		case SET_USER:
			return {...state, user: payload};

		case SET_IS_LOGIN:
			return {...state, isLogin: payload};
		case SET_LOGOUT:
			return {isLogin: false, user: {}, accessToken: null};
		case SET_ACCESS_TOKEN:
			return {...state, accessToken: payload};

		default:
			throw new Error('No case for that type');
	}
};
