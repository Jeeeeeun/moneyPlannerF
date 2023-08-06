import { OpenMenu } from '@/component/FontAwesome/FontAwesomeIcons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import router from 'next/router';

type HomeNavProps = {
	// props 타입 정의
	onSignUpClick: () => void;
	onLoginClick: () => void;
	onMenuClick: () => void;
};

function HomeNav(props: HomeNavProps) {

	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	
	// 테스트용
	useEffect(() => {
		console.log("isLoggedin: ", isLoggedIn);
	}, [isLoggedIn]);
	
  const handleHomeLogoClick = () => {
    router.push('/');
  }

	const handleLoginClick = () => {
		if(!isLoggedIn) {
			props.onLoginClick();
		}
	};

	const handleLogoutClick = () => {
		// 토큰 삭제
		dispatch(logout());
	}

	return (
		<div className="fixed left-0 top-0 m-0 flex w-full items-center justify-between p-0">
			<div onClick={handleHomeLogoClick} id="home">
				<div className="relative left-4 top-2 flex cursor-pointer flex-col items-center">
					<img className="mx-auto mb-1 mt-5 w-12 items-center" src="/snowball.png" alt="snowEffect Img" />
					<span
						className="mx-3 my-0 text-2xl font-black"
						style={{ color: '#7fa4b2' }}
					>
						SNOWBALL
					</span>
				</div>
			</div>
			<div className="relative right-5 flex items-center">
				{isLoggedIn ? (<a
					onClick={handleLogoutClick}
					className="p-5 text-2xl font-black"
					style={{ color: '#7fa4b2' }}
				>
					LOGOUT
				</a>) : (<a
					onClick={handleLoginClick}
					className="p-5 text-2xl font-black"
					style={{ color: '#7fa4b2' }}
				>
					LOGIN
				</a>)}
				
				<a
					onClick={props.onSignUpClick}
					className="p-5 text-2xl font-black"
					style={{ color: '#7fa4b2' }}
				>
					SIGN UP
				</a>
				<a
					onClick={props.onMenuClick}
					className="p-5 text-2xl font-black"
					style={{ color: '#7fa4b2' }}
				>
					<OpenMenu />
				</a>
			</div>
		</div>
	);
}

export default HomeNav;
