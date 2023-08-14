import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';
import { showLogin } from '@/store/slices/loginUiSlice';

import HomeNav from '@/component/home/HomeNav';
import IntroComment from '@/component/home/IntroComment';
import SnowEffectDesc from '@/component/home/SnowEffectDesc';
import Login from '@/component/login/login';
import SignUp from '@/component/signUp/signup';
import SlideMenu from '@/component/slideMenu/SlideMenu';

function Index() {
	const [showSignUp, setShowSignUp] = useState(false);
	const [showSlideMenu, setShowSlideMenu] = useState(false);

	const dispatch = useDispatch();
	const showLoginComponent = useSelector((state: RootState) => (
		state.loginUi.showLoginComponent
	));

	const handleSignUpClick = () => {
		setShowSignUp(true);
	};

	const handleLoginClick = () => {
		dispatch(showLogin(true));
	};

	const handleMenuClick = () => {
		setShowSlideMenu(true);
	};

	const router = useRouter();

	useEffect(() => {

		const handlePopState = (e: PopStateEvent) => {
			if(e.state && e.state.redirected) {
				dispatch(showLogin(true));
			}
		};

		window.addEventListener('popstate', handlePopState);


		return () => {
			window.removeEventListener('popstate', handlePopState);
		}

	}, [router]);

	return (
		<>
			<div
				className="absolute m-0 flex h-full w-full flex-col bg-cover p-0"
				style={{ backgroundImage: "url('/snowballEffect.jpg')" }}
			>
				<HomeNav
					onSignUpClick={handleSignUpClick}
					onLoginClick={handleLoginClick}
					onMenuClick={handleMenuClick}
				/>
				<IntroComment />
				<SnowEffectDesc />
				{showSignUp && (
					<SignUp
						showLogin={showLoginComponent}
						setShowLogin={(show) => dispatch(showLogin(show))}
						setShowSignUp={setShowSignUp}
					/>
				)}
				{showSignUp && (
					<div
						className="fixed left-0 top-0 h-full w-full"
						style={{ backdropFilter: 'blur(5px)' }}
					></div>
				)}
				{showLoginComponent && (
					<Login
						showSignUp={showSignUp}
						setShowSignUp={setShowSignUp}
						setShowLogin={(show) => dispatch(showLogin(show))}
					/>
				)}
				{showLoginComponent && (
					<div
						className="fixed left-0 top-0 h-full w-full"
						style={{ backdropFilter: 'blur(5px)' }}
					></div>
				)}
			</div>
			<div>
				{showSlideMenu && (
					<SlideMenu
						isRight={true}
						showSlideMenu={showSlideMenu}
						setShowSlideMenu={setShowSlideMenu}
						onMenuClick={handleMenuClick}
					/>
				)}
			</div>
		</>
	);
}

export default Index;
