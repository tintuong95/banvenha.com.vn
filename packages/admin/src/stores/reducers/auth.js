import {createSlice} from '@reduxjs/toolkit';
import {history} from '../../routes';
import {loginAction} from '../actions/auth';

const initialState = {
	isLogin: false, //bolean
	self: {}, //object
	role: null, //int
	error: {
		logging: false,
	},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers:{
		
	},
	extraReducers: (builder) => {
		//state, action
		builder.addCase(loginAction.fulfilled, (state, action) => {
			const {self, accessToken} = action.payload.data;
			sessionStorage.setItem('details', JSON.stringify(self));
			sessionStorage.setItem('accessToken', accessToken);
			sessionStorage.setItem('isLogin', JSON.stringify(true));
			sessionStorage.setItem('role', JSON.stringify(self.role));
			state.isLogin = true;
			state.self = self;
			state.role = self.role;
			history.push('/');
		});

		builder.addCase(loginAction.rejected, (state) => {
			state.error.logging=true
		});
	},
});

// Action creators are generated for each case reducer function
// export const {increment, decrement, incrementByAmount} = authSlice.actions;

export default authSlice.reducer;
