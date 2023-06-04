import axios from "axios";
import { useEffect } from "react";
// import type { DragDropContextProps, DroppableProps, DraggableProps } from "react-beautiful-dnd"
import SlideMenu from "@/component/slideMenu/SlideMenu";

interface CurrencyDB {
    country_code: string;
    country_name: string;
    exchange_rate: string;
}

function Currency() {
    useEffect(() => {
        const getCurrency = async (): Promise<CurrencyDB[]> => {
            const response = await axios.get<CurrencyDB[]>(
                "http://localhost:3000/getCurrency"
            );
            return response.data;
        };

        const renderCurrency = async () => {
            const currencies = await getCurrency();
            const currencyTable = document.querySelector("#currency-table");
            currencies.forEach((currency) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                        <td>${currency.country_code}</td>
                        <td>${currency.country_name}</td>
                        <td>${currency.exchange_rate}</td>
                        `;
                currencyTable?.appendChild(row);
            });
        };
        renderCurrency();
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
                            <table className="relative w-full border-collapse border">
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
                            </table>
                        </div>
                    </fieldset>
                    <fieldset className="relative m-4">
                        <legend className="mb-3 text-2xl font-bold">
                            List of Currencies
                        </legend>
                        <table>
                            <thead>
                                <tr>
                                    <th>국가 코드</th>
                                    <th>국가 이름</th>
                                    <th>환율</th>
                                </tr>
                            </thead>
                            <tbody id="currency-table"></tbody>
                        </table>
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
                    <table className="w-full border">
                        <tr className="border-collapse border">
                            <th className="border-collapse border p-3 text-center">
                                52주 평균
                            </th>
                            <td className="border-collapse border p-3 text-right">
                                ￦ 1331.22
                            </td>
                            <td className="border-collapse border p-3 text-center">
                                주의
                            </td>
                        </tr>
                        <tr className="border-collapse border">
                            <th className="border-collapse border p-3 text-center">
                                달러인덱스
                            </th>
                            <td className="border-collapse border p-3 text-right">
                                102.28
                            </td>
                            <td className="border-collapse border p-3 text-center">
                                양호
                            </td>
                        </tr>
                        <tr className="border-collapse border">
                            <th className="border-collapse border p-3 text-center">
                                달러갭비율
                            </th>
                            <td className="border-collapse border p-3 text-right">
                                7.63
                            </td>
                            <td className="border-collapse border p-3 text-center">
                                위험
                            </td>
                        </tr>
                    </table>
                </fieldset>
            </div>
        </>
    );
}

export default Currency;
