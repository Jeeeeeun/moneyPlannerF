import store from '../store/store'; // Redux store를 가져옴

export function isLoggedIn() {
	const state = store.getState(); // Redux store의 현재 상태 가져옴.
	return state.auth.isLoggedIn; // auth에 있는 isLoggedIn 값을 가져옴.
}