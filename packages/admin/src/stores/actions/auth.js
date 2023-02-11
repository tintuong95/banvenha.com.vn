import {createAsyncThunk} from '@reduxjs/toolkit';
import {loginApi} from '../apis/auth';

const LOGIN_ACTION = 'LOGIN_ACTION';

export const loginAction = createAsyncThunk(
	LOGIN_ACTION,
	//payload, thunkAPI
	async (payload) => {
		return await loginApi(payload);
	}
);
