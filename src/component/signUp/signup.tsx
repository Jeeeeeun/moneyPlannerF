/* eslint-disable no-nested-ternary */
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Timer from "@/component/signUp/Timer";
import SignupSuccess from "./signupSuccess";

interface SignUpProps {
	showLogin: boolean;
	setShowLogin: (value: boolean) => void;
	setShowSignUp: (value: boolean) => void;
}

interface FormValues {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

interface IconColor {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

interface InputValue {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}


// yup 라이브러리 스키마 정의(유효성 검사 단순화)
const schema = yup.object({
	name: yup.string().min(2).required("이름을 입력해주세요."),
		email: yup
			.string()
			.email("E-mail 형식이 아닙니다.")
			.required("E-mail을 입력해주세요."),
		password: yup
			.string()
			.min(8, "비밀번호는 8글자 이상이어야 합니다.")
			.matches(
				/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, // 정규식 쓸 때는 함부로 띄어쓰기 하지 말자.
				"알파벳, 숫자, 특수문자가 모두 포함되어야 합니다."
				)
				.test(
					"no-consecutive-characters",
					"연속된 숫자, 연속된 알파벳을 사용할 수 없습니다.",
					function passwordConfirmation(value) {
					if (value !== undefined) {
						const regex = /(\w)\1{2,}/g;
						return !regex.test(value); // !regex.test(value)는 boolean이다.
					}
					return true;
				}
				)
				.required("비밀번호를 입력해주세요."),
		passwordConfirmation: yup
			.string()
			.oneOf([yup.ref("password")], "비밀번호가 일치해야 합니다.")
			.required("비밀번호를 다시 입력해주세요."),
	});

	function SignUp({ setShowLogin, setShowSignUp }: SignUpProps) {
		// href 대신 SPA 장점 이용을 위해 useRouter를 사용하자.
		const router = useRouter();
		
		// LOGIN 글씨 클릭하면 Login 창 띄워주고, Sign up 창은 꺼줘.
		const handleLoginClick = () => {
			setShowLogin(true);
			setShowSignUp(false);
		};
		
		// CANCEL 버튼 누르면 Sign up 창 꺼줘 = 홈화면으로 이동
		function handleCancelClick(): void {
			setShowSignUp(false);
		}
		
		// 인증번호 보내기 버튼 활성화 할까 말까
		const emailIsValid = (iconColor: IconColor) => {
			try {
				if (iconColor.email === "#03c03c") {
					return true;
				}
				return false;
			} catch (err) {
				console.error(err);
				throw err;
			}
		};
		
		// form의 상태 및 유효성 검사를 처리하자 - react hook form
		const {
			handleSubmit, // 입력된 데이터를 제출하는 함수
			formState: { errors }, // form 입력 field에서 발생한 오류를 포함한 form 상태 정보
		} = useForm<FormValues>({
			resolver: yupResolver(schema),
			mode: "onChange",
		});
		
		const nameRef = useRef<HTMLInputElement>(null);
		const emailRef = useRef<HTMLInputElement>(null);
		const passwordRef = useRef<HTMLInputElement>(null);
		const passwordConfirmationRef = useRef<HTMLInputElement>(null);
		
		// 인증번호 보내기 버튼이 눌렸는지 확인
		const [showCodeInput, setShowCodeInput] = useState(false);

		const handleRefClick = () => {
			// 인증코드 입력란 생겨라!
			setShowCodeInput(true);
		};
		
		const [showSignUpSuccess, setShowSignUpSuccess] = useState(false); // 회원가입 성공 창 띄우기
		
		// 회원가입 데이터 전송을 해보실까!
		const onSubmit = () => {
			const data = {
				// 데이터 잘 잡아오는 것 console.log로 확인 완료
				name: nameRef.current?.value,
				email: emailRef.current?.value,
				password: passwordRef.current?.value,
			};
			axios
			.post("http://localhost:3000/signUp", data) // "너한테 요청 보낼거야!"라는 주소를 써야 함
			.then((response) => {
				console.log(response);
				setShowSignUpSuccess(true);
				
				setTimeout(() => {
					setShowSignUpSuccess(false);
					setShowSignUp(false);
					setShowLogin(true);
				}, 5000);
			})
			.catch((error) => {
				console.error(error);
			});
		};

		// 유효성 검사 결과 아이콘 변경과 관련한 코드
		const [iconColor, setIconColor] = useState<IconColor>({
			name: "gray",
			email: "gray",
			password: "gray",
			passwordConfirmation: "gray",
		});

		// 사용자 입력값 데려오기
		const [formData, setFormData] = useState<InputValue>({
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
		});

		const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
			// 각 입력란의 입력값 변화 체크(onChange)
			const { name, value } = e.target;

			setFormData((prevState) => ({
				...prevState, // formData의 이전 상태를 복사해서 가져와. (...는 전개연산자: 객체나 배열을 복사해 오거나 병합할 때 사용함)
				[name]: value, // 객체 리터럴의 속성 이름을 동적으로 할당하는 방법. name 속성에 해당하는 값을 value로 바꿔줘.
			}));

			try {
				if (name === "passwordConfirmation") {
					await schema.validateAt(name, {
						// validateAt(검증할 필드의 name 속성값, 객체 형태로 전달하는 검증할 값)
						[name]: value,
						password: formData.password,
					});
				} else {
					await schema.validateAt(name, { [name]: value });
				}
				setIconColor((prevState) => ({
					...prevState, // iconColor의 이전 값을 객체 형태로 복사해서 가져와.
					[name]: "#03c03c", // 그 데려온 name 속성값의 iconColor 상태를 #03c03c로 바꿔줘.
				}));
			} catch (error) {
				setIconColor((prevState) => ({
					...prevState,
					[name]: "red",
				}));
			}
		};

		// 인증번호 입력 칸 dislpay를 none으로 바꾸기 위한 것.
		const [isHidden, setIsHidden] = useState(false);

		const authenticationBtnRef = useRef<HTMLButtonElement>(null);
		const timerRef = useRef<HTMLDivElement>(null);

		useEffect(() => {
			if (authenticationBtnRef.current && timerRef.current) {
				// 인증번호 인증하기 버튼 & 타이머가 나타나 있을 때
				if (isHidden) {
					authenticationBtnRef.current.style.display = "none"; // 인증번호 인증하기 버튼 숨겨줘.
					timerRef.current.style.display = "none"; // 타이머도 숨겨줘.
				}
			}
		}, [isHidden]); // isHidden의 값이 바뀔 때마다 안의 내용 실행해줘.

		// 이메일로 받은 인증코드가 일치하는지 확인
		const [code, setCode] = useState(""); // 입력 코드 값 캐치
		const [codeValid, setCodeValid] = useState<boolean | null>(null); // 코드가 유효한지 여부
		const sentCode = "ABC123"; // 추후에는 이메일로 인증번호를 전송하겠지만 일단은 인증번호는 이걸로 고정

		function codeValidation(event: React.ChangeEvent<HTMLInputElement>) {
			const inputCode = event.target.value; // 사용자가 입력한 인증번호 값 데려와.
			setCode(inputCode); // 사용자가 입력한 값을 code라는 상태변수 안에 넣어줘.

			if (sentCode === inputCode) {
				// 만약에 보낸 코드랑 사용자가 입력한 코드가 일치하면
				setCodeValid(true);
			} else {
				setCodeValid(false);
			}
		}

		function handleAuthBtn() {
			// 인증하기 버튼 클릭 시
			if (codeValid) {
				// 인증번호가 유효하면 (즉 이메일로 보낸 것과 일치하면)
				setIsHidden(true);
			} else {
				alert("인증번호가 일치하지 않습니다.");
			}
		}

		// 약관 동의 체크박스 체크 상태
		const [isAgreed, setIsAgreed] = useState(false);

		function agreeBox(event: React.ChangeEvent<HTMLInputElement>) {
			setIsAgreed(event.target.checked);
		}

		// 회원가입 완료 버튼 활성화 조건
		const signUpIsReady = () => {
			if (
				iconColor.name === "#03c03c" && // 이름 유효성 검사 통과
				iconColor.email === "#03c03c" && // 이메일 유효성 검사 통과
				iconColor.password === "#03c03c" && // 비밀번호 유효성 검사 통과
				iconColor.passwordConfirmation === "#03c03c" && // 비밀번호 재확인 유효성 검사 통과
				isHidden === true && // 인증번호 일치 여부
				isAgreed === true // 약관 동의 여부
			) {
				return true;
			}
			return false;
		};

		// 이름 입력란에 focus 됐는지 아닌지 체크 (반복되는 거 같은데.. 줄일 방법 없나...)
		const [nameIsFocused, setNameIsFocused] = useState(false);

		const handleNameFocus = () => {
			setNameIsFocused(true);
		};

		const handleNameBlur = () => {
			setNameIsFocused(false);
		};

		// 이메일 입력란에 focus 됐는지 아닌지 체크
		const [mailIsFocused, setMailIsFocused] = useState(false);

		const handleMailFocus = () => {
			setMailIsFocused(true);
		};

		const handleMailBlur = () => {
			setMailIsFocused(false);
		};

		// 이메일 인증번호 입력란에 focus 됐는지 아닌지 체크
		const [codeIsFocused, setCodeIsFocused] = useState(false);

		const handleCodeFocus = () => {
			setCodeIsFocused(true);
		};

		const handleCodeBlur = () => {
			setCodeIsFocused(false);
		};

		// 비밀번호 입력란에 focus 됐는지 아닌지 체크
		const [pwIsFocused, setPwIsFocused] = useState(false);

		const handlePwFocus = () => {
			setPwIsFocused(true);
		};

		const handlePwBlur = () => {
			setPwIsFocused(false);
		};

		// 비밀번호 입력란에 focus 됐는지 아닌지 체크
		const [rePwIsFocused, setRePwIsFocused] = useState(false);

		const handleRePwFocus = () => {
			setRePwIsFocused(true);
		};

		const handleRePwBlur = () => {
			setRePwIsFocused(false);
		};

		return (
			<>
				<div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-row shadow-md">
					<img
						className="max-w-none border border-solid border-gray-400"
						src="./originalSnowballEffect.jpg"
						alt="Snowball Effect Img"
					/>
					<div
						className="flex flex-col border border-solid border-gray-400 bg-slate-50 p-2.5 opacity-80"
						style={{ width: "30rem" }}
					>
						<h1 className="mx-1.5 w-full text-center text-4xl font-bold">
							SIGN UP NOW
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="mb-4 w-full border-none p-2.5"
						>
							<div className="mb-1 flex w-full items-center justify-start p-1.5">
								<label
									htmlFor="name"
									className="float-left inline-block w-14 whitespace-pre-wrap break-keep text-right text-lg font-medium"
								>
									Name
								</label>
								<input
									id="name"
									key="name"
									name="name"
									type="text"
									placeholder="띄어쓰기 없이 입력해주세요."
									ref={nameRef}
									onChange={(e) => {
										handleChange(e);
									}}
									className="mx-6 my-0 w-1/2 border-x-0 border-b-2 border-t-0 border-solid bg-transparent p-1 text-sm outline-0"
									style={{
										borderBottomColor: nameIsFocused
											? "#ccc"
											: "#ddd",
										borderBottomWidth: nameIsFocused
											? "3px"
											: "2px",
									}}
									onFocus={handleNameFocus}
									onBlur={handleNameBlur}
								/>
								<FontAwesomeIcon
									icon={
										iconColor.name === "#03c03c"
											? faCheck
											: iconColor.name === "red"
												? faTimes
												: faCheck // 회색일 때 모양
									}
									color={iconColor.name}
								/>
							</div>
							{errors?.name && (
								<p style={{ color: "red", fontSize: "12px" }}>
									{errors?.name?.message}
								</p>
							)}
							<div className="mb-1 flex w-full items-center justify-start p-1.5">
								<label
									htmlFor="email"
									className="float-left inline-block w-14 whitespace-pre-wrap break-keep text-right text-lg font-medium"
								>
									E-mail
								</label>
								<input
									id="email"
									key="email"
									name="email"
									type="email"
									title="로그인 ID로 활용됩니다."
									ref={emailRef}
									onChange={(e) => {
										handleChange(e);
									}}
									className="mx-6 my-0 w-1/2 border-x-0 border-b-2 border-t-0 border-solid bg-transparent p-1 text-sm outline-0"
									style={{
										borderBottomColor: mailIsFocused
											? "#ccc"
											: "#ddd",
										borderBottomWidth: mailIsFocused
											? "3px"
											: "2px",
									}}
									onFocus={handleMailFocus}
									onBlur={handleMailBlur}
								/>
								<FontAwesomeIcon
									icon={
										iconColor.email === "#03c03c"
											? faCheck
											: iconColor.email === "red"
												? faTimes
												: faCheck // 회색일 때 모양
									}
									color={iconColor.email}
								/>
								<button
									type="button"
									onClick={handleRefClick}
									className="float-right ml-3 w-16 whitespace-pre-wrap break-keep rounded-lg border border-solid p-2 text-sm text-white"
									style={{
										backgroundColor: emailIsValid(iconColor)
											? "#7fa4b2"
											: "#aaa",
									}}
									disabled={!emailIsValid(iconColor)}
								>
									인증번호 보내기
								</button>
							</div>
							{errors?.email && (
								<p style={{ color: "red", fontSize: "12px" }}>
									{errors?.email?.message}
								</p>
							)}
							{showCodeInput && (
								<div className="mb-1 flex w-full items-center justify-start p-1.5">
									<label
										htmlFor="authentication"
										className="float-left mr-5 inline-block w-14 whitespace-pre-wrap break-keep text-end text-lg font-medium"
										style={{ paddingLeft: "30px" }}
									>
										Authentication Code
									</label>
									<input
										id="authentication"
										key="authentication"
										name="authentication"
										type="text"
										value={code || ""}
										onChange={codeValidation}
										className="mx-6 my-0 w-3/4 border-x-0 border-b-2 border-t-0 border-solid bg-transparent p-1 text-sm outline-0"
										style={{
											marginLeft: "60px",
											width: "34%",
											borderBottomColor: codeIsFocused
												? "#ccc"
												: "#ddd",
											borderBottomWidth: codeIsFocused
												? "3px"
												: "2px",
										}}
										onFocus={handleCodeFocus}
										onBlur={handleCodeBlur}
									/>
									<button
										id="anthenticationBtn"
										type="button"
										className="float-right w-10 whitespace-pre-wrap break-keep rounded-lg border border-solid p-2 text-sm text-white"
										style={{
											display: isHidden ? "none" : "flex",
											backgroundColor: isHidden
												? "ddd"
												: "#7fa4b2",
										}}
										onClick={handleAuthBtn}
									>
										인증
									</button>

									<Timer
										id="timer"
										initialTimeLeft={180}
										style={{
											marginLeft: "15px",
											color: "red",
											display: isHidden ? "none" : "flex",
										}}
									/>
									{isHidden && (
										<FontAwesomeIcon
											icon={faCheck}
											style={{
												display: "flex",
												color: "#03c03c",
											}}
										/>
									)}
								</div>
							)}
							<div className="mb-1 flex w-full items-center justify-start p-1.5">
								<label
									htmlFor="password"
									className="float-left inline-block w-14 whitespace-pre-wrap break-keep text-right text-lg font-medium"
								>
									Password
								</label>
								<input
									id="password"
									key="password"
									name="password"
									type="password"
									ref={passwordRef}
									onChange={(e) => {
										handleChange(e);
									}}
									placeholder="알파벳, 숫자, 특수문자 포함 8글자 이상"
									className="mx-6 my-0 w-1/2 border-x-0 border-b-2 border-t-0 border-solid bg-transparent p-1 text-sm outline-0"
									style={{
										borderBottomColor: pwIsFocused
											? "#ccc"
											: "#ddd",
										borderBottomWidth: pwIsFocused
											? "3px"
											: "2px",
									}}
									onFocus={handlePwFocus}
									onBlur={handlePwBlur}
								/>
								<FontAwesomeIcon
									icon={
										iconColor.password === "#03c03c"
											? faCheck
											: iconColor.password === "red"
												? faTimes
												: faCheck // 회색일 때 모양
									}
									color={iconColor.password}
								/>
							</div>
							{errors?.password && (
								<p style={{ color: "red", fontSize: "12px" }}>
									{errors?.password?.message}
								</p>
							)}
							<div className="mb-1 flex w-full items-center justify-start p-1.5">
								<label
									htmlFor="re-password"
									className="float-left inline-block w-14 whitespace-pre-wrap break-keep text-right text-lg font-medium"
								>
									Confirm Password
								</label>
								<input
									id="re-password"
									key="re-password"
									name="passwordConfirmation"
									type="password"
									ref={passwordConfirmationRef}
									onChange={(e) => {
										handleChange(e);
									}}
									placeholder="앞서 입력한 비밀번호와 동일하게 입력"
									className="mx-6 my-0 w-1/2 border-x-0 border-b-2 border-t-0 border-solid bg-transparent p-1 text-sm outline-0"
									style={{
										borderBottomColor: rePwIsFocused
											? "#ccc"
											: "#ddd",
										borderBottomWidth: rePwIsFocused
											? "3px"
											: "2px",
									}}
									onFocus={handleRePwFocus}
									onBlur={handleRePwBlur}
								/>
								<FontAwesomeIcon
									icon={
										iconColor.passwordConfirmation === "#03c03c"
											? faCheck
											: iconColor.passwordConfirmation ===
												"red"
												? faTimes
												: faCheck // 회색일 때 모양
									}
									color={iconColor.passwordConfirmation}
								/>
							</div>
							{errors?.passwordConfirmation && (
								<p style={{ color: "red", fontSize: "12px" }}>
									{errors?.passwordConfirmation?.message}
								</p>
							)}
						<div className="mb-3.5 flex w-full flex-row justify-center text-base">
							<input
								id="agree"
								type="checkbox"
								className="mr-4"
								checked={isAgreed}
								onChange={agreeBox}
							/>
							<label htmlFor="agree">
								I agree all the
								<span
									onClick={() =>
										router.push("/termsAndConditions")
									}
									className="no-underline"
								>
									{" "}
									Terms & Conditions
								</span>
								.
							</label>
						</div>
						<div className="mb-2 mr-6 flex flex-row justify-end">
							<button
								onClick={handleCancelClick}
								className="float-right ml-2 w-20 whitespace-pre-wrap break-keep rounded-lg border border-solid px-2 py-1 text-base text-white"
								style={{
									borderColor: "#ddd",
									backgroundColor: "#7fa4b2",
								}}
							>
								CANCEL
							</button>
							{signUpIsReady() ? (
								<button
									className="float-right ml-2 w-20 whitespace-pre-wrap break-keep rounded-lg border border-solid p-2 text-base text-white"
									style={{
										borderColor: "#ddd",
										backgroundColor: "#7fa4b2",
									}}
									onClick={onSubmit}
									type="submit"
								>
									SIGN UP
								</button>
							) : (
								<button
									className="float-right ml-2 w-20 whitespace-pre-wrap break-keep rounded-lg border border-solid p-2 text-base text-white"
									style={{
										borderColor: "#ddd",
										backgroundColor: "#aaa",
									}}
									disabled
								>
									SIGN UP
								</button>
							)}
						</div>
						</form>
						<div style={{ textAlign: "center" }}>
							Already Have Acccount?
						</div>
						<p
							onClick={handleLoginClick}
							className="text-center text-lg font-semibold no-underline"
						>
							LOGIN
						</p>
					</div>
				</div>
				{showSignUpSuccess && <SignupSuccess />}
			</>
		);
	}

	export default SignUp;
