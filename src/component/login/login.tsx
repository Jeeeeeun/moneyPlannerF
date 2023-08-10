import axios, {AxiosError} from 'axios';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice'

interface LoginProps {
	// showSignUp과 setShowSignUp을 props로 받음
	showSignUp: boolean;
	setShowSignUp: (value: boolean) => void;
	setShowLogin: (value: boolean) => void;
}

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError === true;
}

function Login({ setShowSignUp, setShowLogin }: LoginProps) {
	const router = useRouter();

	const handleSignUpClick = () => {
		setShowSignUp(true);
		setShowLogin(false);
	};

	const dispatch = useDispatch();

	// 쿠키에 저장된 token 가져오기
	function getCookie(cookieName: string): string | undefined {
		const cookieValue = document.cookie
		.split(';')
		.map((cookie) => cookie.trim()) // 공백 제거
		.find((row) => row.startsWith(`${cookieName}=`))
		?.split('=')[1];

		return cookieValue;
	}

	// 로그인 데이터 백엔드로 넘겨보자!
	const handleLogin = async () => {
		try {
			const response = await axios.post("http://localhost:3000/login", {
				email: emailRef.current?.value,
				password: passwordRef.current?.value
			}, {
				withCredentials: true,
			});
		
			if(response.status === 200) {

				// console.log('서버에서 받은 header(set-cookie): ', response.headers['set-cookie']);
				// 웹 보안 & 개인정보 보호 문제 때문에 클라이언트 측에서 undefined 뜨는 게 정상임

				const token = getCookie('token');
		
				// console.log("토큰: ", token);

				if(token) {
					// action dispatch
					dispatch(login(token));
				} else {
					console.error('cookie에서 token을 찾지 못했습니다.');
				}
		
				// 로그인 화면 종료
				setShowLogin(false);

        		//console.log("쿠키: ", document.cookie);
		
				// 홈 화면으로 redirect
				router.push('/');

			} else {
				console.error('알 수 없는 오류가 발생했습니다.');
			}
		
		} catch (error: unknown) {
			if (isAxiosError(error) && error.response?.status === 401) {
				alert('이메일 또는 비밀번호가 일치하지 않습니다.');
			} else {
				console.error('로그인에 실패했습니다.', error);
			}
		}
	}
  
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	
	// 이메일과 비밀번호 상태 캐치
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	// 이메일, 비밀번호 모두 입력됐는지 여부
	const [bothFilled, setBothFilled] = useState(false);
	
	// 이메일 입력란 값 변경될 때 상태 업데이트
	const emailFilled = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	
		// 비밀번호까지도 다 입력됐는가
		setBothFilled(e.target.value !== '' && password !== '');
	};
	
	// 비밀번호 입력란 값 변경될 때 상태 업데이트
	const passwordFilled = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	
		// 이메일까지도 다 입력됐는가
		setBothFilled(e.target.value !== '' && email !== '');
	};
	
	const loginIsReady = bothFilled;
	
	// 이메일 입력란에 focus 됐는지 아닌지 체크
	const [mailIsFocused, setMailIsFocused] = useState(false);
	
	const handleMailFocus = () => {
		setMailIsFocused(true);
	};
	
	const handleMailBlur = () => {
		setMailIsFocused(false);
	};
	
	// 비밀번호 입력란에 focus 됐는지 아닌지 체크
	const [pwIsFocused, setPwIsFocused] = useState(false);
	
	const handlePwFocus = () => {
		setPwIsFocused(true);
	};
	
	const handlePwBlur = () => {
		setPwIsFocused(false);
	};

	return (
		<>
			<div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-row shadow-md">
				<img
					className="max-w-none border border-solid border-gray-400"
					src="./originalSnowballEffect.jpg"
					alt="Snowball Effect Img"
				/>
				<div className="flex justify-center w-96 flex-col border border-solid border-gray-400 bg-slate-50 p-2.5 opacity-80">
					<h1 className="mx-6 w-full text-center text-4xl font-bold">LOGIN</h1>
					<form className="w-full border-none p-2.5"
						onSubmit={(e) => {
							e.preventDefault(); // 웹 브라우저의 기본 동작을 막는 함수. 즉 여기서는, submit 이벤트가 발생하더라도 페이지가 기본적으로 새로고침 되는 걸 막는 것임.
							handleLogin();
						}}>
						<div className="mb-6 flex w-full items-center justify-start p-2.5">
							<label
								htmlFor="email"
								className="float-left inline-block w-24 whitespace-pre-wrap break-keep text-right text-lg font-medium"
							>
								E-mail
							</label>
							<input
								id="email"
								key="email"
								name="email"
								type="email"
								ref={emailRef}
								onChange={emailFilled}
								className="my-0 ml-6 mr-2 w-72 border-x-0 border-t-0 bg-transparent p-1 text-sm focus:outline-0"
								style={{
									borderBottomColor: mailIsFocused ? '#ccc' : '#ddd',
									borderBottomWidth: mailIsFocused ? '3px' : '2px',
								}}
								onFocus={handleMailFocus}
								onBlur={handleMailBlur}
							/>
						</div>
						<div className="mb-6 flex w-full items-center justify-start p-2.5">
							<label
								htmlFor="password"
								className="float-left inline-block w-24 whitespace-pre-wrap break-keep text-right text-lg font-normal"
							>
								Password
							</label>
							<input
								id="password"
								key="password"
								name="password"
								type="password"
								ref={passwordRef}
								onChange={passwordFilled}
								className="my-0 ml-6 mr-2 w-72 border-x-0 border-t-0 bg-transparent p-1 text-sm focus:outline-0"
								style={{
									borderBottomColor: pwIsFocused ? '#ccc' : '#ddd',
									borderBottomWidth: pwIsFocused ? '3px' : '2px',
								}}
								onFocus={handlePwFocus}
								onBlur={handlePwBlur}
							/>
						</div>
						<div className="mb-5 ml-6 flex w-11/12 flex-row justify-start text-base">
							<input id="remember" type="checkbox" className="mr-4" />
							<label htmlFor="remember">REMEMBER MY E-MAIL</label>
						</div>
						<p
							onClick={() => router.push('/findAccount')}
							className="mx-auto my-2.5 flex items-center justify-center"
						>
							계정을 잊어버렸어요.
						</p>
						{loginIsReady ? (
							<button
								className="mx-auto my-2.5 flex w-2/3 items-center justify-center rounded-lg border border-solid p-2.5 text-sm text-white"
								style={{ borderColor: '#ddd', backgroundColor: '#7fa4b2' }}
								onClick={() => router.push('/')}
							>
								LOGIN
							</button>
						) : (
							<button
								className="mx-auto my-2.5 flex w-2/3 items-center justify-center rounded-lg border border-solid p-2.5 text-sm text-white"
								style={{ borderColor: '#ddd', backgroundColor: '#aaa' }}
							>
								LOGIN
							</button>
						)}
					</form>
					<div className="mb-0.5 mt-3.5 text-center text-sm">
						DON&apos;T HAVE AN ACCOUNT?
					</div>
					<p
						onClick={handleSignUpClick}
						className="text-center text-lg font-semibold no-underline"
					>
						SIGN UP
					</p>
				</div>
			</div>
		</>
	);
}

export default Login;
