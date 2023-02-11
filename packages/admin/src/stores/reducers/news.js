import {createSlice} from '@reduxjs/toolkit';
import {loginAction} from '../actions/auth';

const initialState = {

};

export const authSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//state, action
		builder.addCase(loginAction.fulfilled, () => {
		
		});

		builder.addCase(loginAction.rejected, (state) => {
			state.error.logging = true;
		});
	},
});

// Action creators are generated for each case reducer function
// export const {increment, decrement, incrementByAmount} = authSlice.actions;

export default authSlice.reducer;
