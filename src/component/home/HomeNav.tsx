import Link from 'next/link';

import { OpenMenu } from '@/component/FontAwesome/FontAwesomeIcons';

type HomeNavProps = {
  // props 타입 정의
  onSignUpClick: () => void;
  onLoginClick: () => void;
  onMenuClick: () => void;
};

function HomeNav(props: HomeNavProps) {
  return (
    <div className="fixed left-0 top-0 m-0 flex w-full items-center justify-between p-0">
      <Link id="home" href="/">
        <div className="relative left-4 top-2 flex cursor-pointer flex-col items-center">
          <img
            className="mx-auto mb-1 mt-5 w-12 items-center"
            src="/snowball.png"
            alt="snowEffect Img"
          />
          <span
            className="mx-3 my-0 text-2xl font-black"
            style={{ color: '#7fa4b2' }}
          >
            SNOWBALL
          </span>
        </div>
      </Link>
      <div className="relative right-5 flex items-center">
        <a
          onClick={props.onLoginClick}
          className="p-5 text-2xl font-black"
          style={{ color: '#7fa4b2' }}
        >
          LOGIN
        </a>
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
