// 여러 slice의 reducer를 결합해 rootReducer를 생성하고, RootState라는 interface를 정의하는 파일
import { combineReducers } from "@reduxjs/toolkit";

// 인증 상태 관리 reducer와 AuthState라는 interface를 가져옴
import authReducer, { AuthState } from './authSlice';

// RootState라는 interface를 정의함. app의 전체 상태 형태를 나타냄.
export interface RootState {
	auth: AuthState;
}

// combineReducers: 여러 reducer를 결합해서 하나의 rootReducer를 생성하는 함수.
const rootReducer = combineReducers<RootState>({
	auth: authReducer, // auth라는 property에  authReducer를 추가해 인증 상태를 관리할 수 있게 함.
});

// rootReducer를 기본값으로 내보냄. 이 rootReducer는 store에서 사용됨.
export default rootReducer;