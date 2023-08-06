// Redux Toolkit을 활용해 인증 상태를 관리하기 위한 slice를 정의하는 파일
// slice: application 상태의 일부를 나타내는 구조.
// Redux slice: reducer, action, action creator(액션 생성 함수)를 포함한 상태 관리를 간소화할 수 있음.

// 중괄호는 이름이 지정된 export를 가져올 때 쓰는 방식
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 인증 상태를 관리할 interface를 정의
// interface: 객체의 구조를 정의함. properties와 object의 type을 정할 수 있음.
export interface AuthState {
	isLoggedIn: boolean, // login 상태를 나타냄
	token: string | null; // 사용자 인증 token을 저장함. logout 상태일 때 null
}

// 초기 인증 상태 객체를 생성
const initialState: AuthState = { // colon 옆은 변수의 type을 명시하는 방법
	isLoggedIn: false,
	token: null
};

// export: 모듈 또는 기능을 다른 파일에서 사용할 수 있도록 내보냄.
// authSlice object: login, logout action을 관리하는 Redux slice
// createSlice: Redux Toolkit에서 제공하는 함수.
	// object를 input으로 받고, object의 다양한 field로 구성된 slice를 만들어서
	// reducer, action, action creator를 output으로 내놓음
export const authSlice = createSlice({
	name: 'auth', // slice의 이름을 지정함. 이 이름은 action type 앞에 붙어 접두사로 사용됨.
	initialState, // slice의 초기 상태를 지정함. 모든 Redux store는 초기 상태 object를 가짐.
	reducers: {
    // slice의 reducer를 지정하는 object. 각 reducer는 Redux 상태를 update하는 함수임.
	// action: Redux에서 변경을 일으키는 object로, 반드시 type 속성을 포함해야 함.
		// 전달받은 정보를 통해 상태를 변경하는데 사용되는 데이터.
	// PayloadAction: Redux Toolkit에서 제공하는 action의 type으로, 자동으로 생성됨.
	// <string>: PayloadAction의 payload라는 property type이 string임을 나타냄.
	// <>: generic type
	// 매개변수 state, action: 이전 상태와 발생한 action을 의미함.
	// reducer는 state와 action을 기반으로 새로운 상태를 계산함.
		login: (state, action: PayloadAction<string>) => {
			state.isLoggedIn = true; // login 상태를 true로 설정
			state.token = action.payload; // token을 상태에 저장함
		},

		logout: (state) => {
			state.isLoggedIn = false; // login 상태를 false로 설정
			state.token = null; // token을 null로 설정해서 사용자가 logout 상태임을 나타냄.
		},
	},
});

// export된 action 생성자를 사용해서 dispatch를 호출할 수 있음.
// authSlice.actions: createSlice로 생성된 slice가 만들어진 action 생성자들이 포함된 object.
export const { login, logout } = authSlice.actions;

// 이 slice의 reducer를 기본값으로 내보냄. 이 reducer는 rootReducer에서 사용됨.
// authSlice.reducer: createSlice로 생성된 slice에서 만들어진 reducer를 의미함.
export default authSlice.reducer;