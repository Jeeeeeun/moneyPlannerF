import { useState } from 'react';

import HomeNav from '@/component/home/HomeNav';
import IntroComment from '@/component/home/IntroComment';
import SnowEffectDesc from '@/component/home/SnowEffectDesc';
import Login from '@/component/login/login';
import SignUp from '@/component/signUp/signup';
import SlideMenu from '@/component/slideMenu/SlideMenu';

function Index() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSlideMenu, setShowSlideMenu] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleMenuClick = () => {
    setShowSlideMenu(true);
  };

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
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            setShowSignUp={setShowSignUp}
          />
        )}
        {showSignUp && (
          <div
            className="fixed left-0 top-0 h-full w-full"
            style={{ backdropFilter: 'blur(5px)' }}
          ></div>
        )}
        {showLogin && (
          <Login
            showSignUp={showSignUp}
            setShowSignUp={setShowSignUp}
            setShowLogin={setShowLogin}
          />
        )}
        {showLogin && (
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
