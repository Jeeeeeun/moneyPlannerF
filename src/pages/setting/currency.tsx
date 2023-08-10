import axios from "axios";
import { useEffect, useState } from "react";
// import type { DragDropContextProps, DroppableProps, DraggableProps } from "react-beautiful-dnd"
import { useRouter } from "next/router";
import SlideMenu from "@/component/slideMenu/SlideMenu";
import { isLoggedIn } from "@/utils/auth";

interface Currency {
	country_name: string;
	country_code: string;
	exchange_rate: number;
}

function Currency() {
	const [currencyList, setCurrencyList] = useState<Currency[]>([])
	const router = useRouter(); // useRouter hook

	useEffect(() => {
		if (!isLoggedIn()) {
			// 로그인되지 않은 사용자를 홈화면으로 redirection
			// redirected란 parameter 추가
			router.push('/?redirected=true');
		} else {
      const getCurrency = async (): Promise<void> => {
        const response = await axios.get(
          "http://localhost:3000/getCurrencyList"
        );
        setCurrencyList(response.data);
      };
      getCurrency();
    }
	}, []);

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
