import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginUiState {
	showLoginComponent: boolean;
}

const initialState: LoginUiState = {
	showLoginComponent: false,
}

const loginUiSlice = createSlice({
	name: 'loginUi',
	initialState,
	reducers: {
		showLogin: (state, action: PayloadAction<boolean>) => {
			state.showLoginComponent = action.payload;
		},
	},
});

export const { showLogin } = loginUiSlice.actions;
export default loginUiSlice.reducer;