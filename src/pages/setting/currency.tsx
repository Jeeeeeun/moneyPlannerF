import axios from "axios";
import { useEffect, useState } from "react";
// import type { DragDropContextProps, DroppableProps, DraggableProps } from "react-beautiful-dnd"
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import SlideMenu from "@/component/slideMenu/SlideMenu";
import { isLoggedIn, getAuthToken } from "@/utils/auth";
import { useDispatch } from "react-redux";
import { showLogin } from "@/store/slices/loginUiSlice";

interface Currency {
	country_name: string;
	country_code: string;
	exchange_rate: number;
}

function Currency() {
	const [currencyList, setCurrencyList] = useState<Currency[]>([])
	const router = useRouter(); // useRouter hook

	const dispatch = useDispatch();

	const isUserLoggedIn = isLoggedIn();

	useEffect(() => {
		const init = async () => {
			if(router.isReady && !isUserLoggedIn) {
				const toastMsg = toast.error('로그인이 필요한 서비스입니다.', {
					position: toast.POSITION.TOP_CENTER,
				});

				dispatch(showLogin(true));

				// router.replace(url, as, options)
				// url: 지정된 url로 이동
				// as: 표시될 url 지정. undefined를 쓰면, 앞서 작성된 url 인자와 동일함을 의미
				// options: 추가 옵션을 지정하는 객체.
				// shallow: true => 페이지를 전환하지만, state 변경을 trigger하지는 않음.
				// 즉, react component 상태가 유지되면서 페이지 데이터는 다시 불러오지 않음. 페이지 전환에 대한 성능이 향상됨.
				router.replace('/', '/', { shallow: true });

				setTimeout(() => {
					toast.dismiss(toastMsg);
				}, 3000);
			} else {
				const token = getAuthToken();

				if (token) {
					const response = await axios.get("http://localhost:3000/api/getCurrencyList", {
						headers: {
							Authorization: `Bearer ${token}`,
						}
					});
					setCurrencyList(response.data);
				}
			}
		}
		init();
	}, [router.isReady, isUserLoggedIn]);

	return (
		<>
			{/* <SlideMenu isRight={false} /> */}
			<div className="relative flex h-full flex-row">
				<div className="relative flex w-1/2 flex-col p-2.5">
					<fieldset className="relative m-4">
						<legend className="mb-3 text-2xl font-bold">
							My Currency
						</legend>
						<div className="h-2/5 border">
							{/* <table className="relative w-full border-collapse border">
                                <tr>
                                    <th className="w-1/3 border p-4">
                                        주 화폐
                                    </th>
                                    <td className="w-2/3 border p-4"></td>
                                </tr>
                                <tr>
                                    <th className="w-1/3 border p-4">
                                        보조 화폐
                                    </th>
                                    <td className="w-2/3 border p-4"></td>
                                </tr>
                            </table> */}
						</div>
					</fieldset>
					<fieldset className="relative m-4">
						<legend className="mb-3 text-2xl font-bold">
							List of Currencies
						</legend>
						<div className="flex flex-col justify-center items-center text-xl">
							<div className="flex flex-row justify-between w-11/12 font-bold text-center">
								<p className="w-1/3 border-t border-l border-b border-gray-800 m-0 p-3">Country Code</p>
								<p className="w-1/3 border border-gray-800 m-0 p-3">Country Name</p>
								<p className="w-1/3 border-t border-r border-b border-gray-800 m-0 p-3">Exchange Rate</p>
							</div>
							{currencyList.map((currency) => (
								<div className="flex flex-row justify-between w-11/12" key={currency.country_code}>
									<p className="w-1/3 border-l border-b border-gray-800 text-center m-0 p-3">{currency.country_code}</p>
									<p className="w-1/3 border-l border-b border-r border-gray-800 text-center m-0 p-3">{currency.country_name}</p>
									<p className="w-1/3 border-r border-b border-gray-800 text-right m-0 p-3">{currency.exchange_rate}</p>
								</div>
							))}
						</div>

					</fieldset>
				</div>
				<fieldset className="mr-2 mt-4 w-1/2 border-2 p-2.5">
					<legend className="mb-3 flex flex-col text-2xl font-bold">
						Detail of Currency
					</legend>
					<div className="mb-3 flex h-1/2 border p-10 text-center">
						graph
					</div>
					<div className="flex w-full flex-row justify-between p-3">
						<select className="w-1/3 border p-2">
							<option value="">매도할 화폐</option>
							<option value="KRW">KRW</option>
							<option value="USD">USD</option>
							<option value="CAD">CAD</option>
						</select>
						<p className="text-2xl">/</p>
						<select className="w-1/3 border p-2">
							<option value="">매수할 화폐</option>
							<option value="KRW">KRW</option>
							<option value="USD">USD</option>
							<option value="CAD">CAD</option>
						</select>
					</div>
					<div className="mb-5 flex flex-row justify-around text-center text-xl">
						<span>￦ 1339.00</span>
						<span className="text-2xl">/</span>
						<span>US$ 1.00</span>
					</div>
					{/* <table className="w-full border">
                        <tr className="border-collapse border">
                            <td className="border-collapse border p-3 text-center">
                                52주 평균
                            </td>
                            <td className="border-collapse border p-3 text-right">
                                ￦ 1331.22
                            </td>
                            <td className="border-collapse border p-3 text-center">
                                주의
                            </td>
                        </tr>
                    </table> */}
				</fieldset>
			</div>
		</>
	);
}

export default Currency;
