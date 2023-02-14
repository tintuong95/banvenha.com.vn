import {createAsyncThunk} from '@reduxjs/toolkit';
import {getProfileApi, loginApi} from '../apis/auth';

const LOGIN_ACTION = 'LOGIN_ACTION';
const GET_PROFILE_ACTION = 'GET_PROFILE_ACTION';

export const loginAction = createAsyncThunk(
	LOGIN_ACTION,
	//payload, thunkAPI
	async (payload) => {
		return await loginApi(payload);
	}
);

export const getProfileAction = createAsyncThunk(
	GET_PROFILE_ACTION,
	//payload, thunkAPI
	async (payload) => {
		return await getProfileApi(payload);
	}
);
