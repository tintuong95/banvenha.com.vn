import {createSlice} from '@reduxjs/toolkit';
import {history} from '../../routes/history';
import {getProfileAction, loginAction, signupAction} from '../actions/auth';
import {signupApi} from '../apis/auth';

const initialState = {
	isLogin: false, //bolean
	self: {}, //object
	role: null, //int
	error: {
		logging: false,
	},
	loading: true,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		evtLogout: (state) => {
			state.error.logging = false;
			state.loading = true;
			state.role = null;
			state.isLogin = false;
			state.self = {};
			console.log('state.initialState');
			localStorage.clear();
			history.push('/login');
		},
	},
	extraReducers: (builder) => {
		//state, action
		builder.addCase(loginAction.fulfilled, (state, action) => {
			const {self, accessToken} = action.payload.data;
			localStorage.setItem('details', JSON.stringify(self));
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('isLogin', JSON.stringify(true));
			localStorage.setItem('role', JSON.stringify(self.role));
			state.isLogin = true;
			state.self = self;
			state.role = self.role;
			history.push('/');
		});

		builder.addCase(loginAction.rejected, (state) => {
			state.error.logging = true;
		});

		//state, action
		builder.addCase(getProfileAction.fulfilled, (state, action) => {
			const {self, accessToken} = action.payload.data;
			localStorage.setItem('details', JSON.stringify(self));
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('isLogin', JSON.stringify(true));
			localStorage.setItem('role', JSON.stringify(self.role));
			state.isLogin = true;
			state.loading = false;
			state.self = self;
			state.role = self.role;
		});

		builder.addCase(getProfileAction.rejected, (state) => {
			state.loading = false;
			history.push('/login');
		});

		//state, action
		builder.addCase(signupAction.fulfilled, (state, action) => {
			const {self, accessToken} = action.payload.data;
			localStorage.setItem('details', JSON.stringify(self));
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('isLogin', JSON.stringify(true));
			localStorage.setItem('role', JSON.stringify(self.role));
			state.isLogin = true;
			state.self = self;
			state.role = self.role;
			history.push('/');
		});

		builder.addCase(signupAction.rejected, (state) => {
			state.loading = true;
		});
	},
});

// Action creators are generated for each case reducer function
export const {evtLogout} = authSlice.actions;

export default authSlice.reducer;
