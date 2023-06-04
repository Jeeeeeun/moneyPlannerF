import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import SlideMenu from '../../component/slideMenu/SlideMenu';

interface TableHeader {
  textContent: string;
}
function DailyTracker() {
  const [showSlideMenu, setShowSlideMenu] = useState(false);

  const handleMenuClick = () => {
    // 메뉴 닫기? 열기?
    setShowSlideMenu(true);
  };

  // Date 객체 생성해서 현재 날짜 가져오기
  // styled module 이름과 같으면 에러 난다.
  const today = new Date();

  // getFullYear(): Date 객체의 연도를 숫자 4자리로 return.
  // toString(): 숫자를 문자열로 변환.
  const year = today.getFullYear().toString();

  // getMonth(): Date 객체의 월을 반환. 단, 반환값이 0 ~ 11이라 +1를 해주는 것임.
  // padStart(): 문자열의 길이를 맞추기 위해 사용됨.
  // 첫 번째 매개변수 2는 문자열의 길이,
  // 두 번째 매개변수 '0'은 문자열 길이가 첫 번째 매개변수보다 작을 때 추가할 문자열
  const month = (today.getMonth() + 1).toString().padStart(2, '0');

  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);

  const handleLeftClick = () => {
    // < 화살표 클릭했을 때 호출되는 함수
    const prevMonth = parseInt(currentMonth, 10) - 1;
    let prevYear = currentYear;
    if (prevMonth < 1) {
      prevYear = `${parseInt(currentYear, 10) - 1}`;
      setCurrentMonth('12');
    } else if (prevMonth < 10) {
      setCurrentMonth(`0${prevMonth}`);
    } else {
      setCurrentMonth(`${prevMonth}`);
    }
    setCurrentYear(prevYear);
  };

  const handleRightClick = () => {
    // > 화살표 클릭했을 때 호출되는 함수
    const nextMonth = parseInt(currentMonth, 10) + 1;
    let nextYear = currentYear;
    if (nextMonth > 12) {
      nextYear = `${parseInt(currentYear, 10) + 1}`;
      setCurrentMonth('01');
    } else if (nextMonth < 10) {
      setCurrentMonth(`0${nextMonth}`);
    } else {
      setCurrentMonth(`${nextMonth}`);
    }
    setCurrentYear(nextYear);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const table = document.querySelector<HTMLTableElement>('#calander');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');

      const trDay = document.createElement('tr');
      const days: (string | undefined)[] = [
        'SUN',
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT',
      ];

      if (table) {
        for (let i = 0; i < days.length; i += 1) {
          const th: TableHeader = {
            textContent: days[i] ?? '',
          };
          const thElement = document.createElement('th');
          thElement.textContent = th.textContent;
          trDay.appendChild(thElement);
        }
        thead.appendChild(trDay);
        for (let i = 0; i < 6; i += 1) {
          const trDate = document.createElement('tr');
          for (let j = 0; j < 7; j += 1) {
            const td = document.createElement('td');
            trDate.appendChild(td);
          }
          tbody.appendChild(trDate);
        }
        table.appendChild(thead);
        table.appendChild(tbody);
      }

      // 이전 달 마지막 날짜와 마지막 요일 구하기
      const startDay = new Date(
        parseInt(currentYear, 10),
        parseInt(currentMonth, 10) - 1,
        0
      );
      const prevDate = startDay.getDate();
      const prevDay = startDay.getDay();

      // 이번 달 마지막 날짜와 마지막 요일 구하기
      const endDay = new Date(
        parseInt(currentYear, 10),
        parseInt(currentMonth, 10),
        0
      );
      const nextDate = endDay.getDate();
      const nextDay = endDay.getDay();

      console.log(`startDay = ${startDay}`);
      console.log(`prevDate = ${prevDate}`);
      console.log(`prevDay = ${prevDay}`);

      console.log(`endDay = ${endDay}`);
      console.log(`nextDate = ${nextDate}`);
      console.log(`nextDay = ${nextDay}`);
    }
  }, []);
  return (
    <>
      <div className="flex flex-row">
        {showSlideMenu && (
          <SlideMenu
            showSlideMenu={showSlideMenu}
            setShowSlideMenu={setShowSlideMenu}
            onMenuClick={handleMenuClick}
          />
        )}
        <div className="" style={{ width: '33%' }}>
          <div className="mt-5 flex content-between">
            <div className="mx-9 mt-4 flex w-full justify-start align-super text-xl leading-4">
              <FontAwesomeIcon
                icon={faAngleLeft}
                onClick={handleLeftClick}
                style={{ marginRight: '10px' }}
              />
              {currentYear} {currentMonth}월
              <FontAwesomeIcon
                icon={faAngleRight}
                onClick={handleRightClick}
                style={{ marginLeft: '10px' }}
              />
            </div>
            <div className="text-lg">
              <div className="mt-5 flex flex-row text-lg">
                <div className="mx-9 inline-block text-blue-600">￦0</div>
                <div className="mx-9 inline-block text-rose-600">￦0</div>
              </div>
              <div className="flex flex-row justify-center text-gray-900">
                ￦0
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col justify-center text-center"
          style={{ width: '33%' }}
        >
          <span className="mt-3 text-xl font-bold">
            {currentYear}.{currentMonth} 한 눈에 보기
          </span>
          <table
            id="calander"
            className="border-collapse border border-solid border-slate-600 p-3 text-gray-900"
          >
            {/* <tr className="border border-slate-600">
              <th className="border border-slate-600 p-3 text-rose-600">SUN</th>
              <th className="border border-slate-600 p-3">MON</th>
              <th className="border border-slate-600 p-3">TUE</th>
              <th className="border border-slate-600 p-3">WED</th>
              <th className="border border-slate-600 p-3">THU</th>
              <th className="border border-slate-600 p-3">FRI</th>
              <th className="border border-slate-600 p-3 text-blue-600">SAT</th>
            </tr>
            <tr>
              <td className="border border-slate-600 p-3 text-rose-600"></td>
              <td className="border border-slate-600 p-3">1</td>
              <td className="border border-slate-600 p-3">2</td>
              <td className="border border-slate-600 p-3">3</td>
              <td className="border border-slate-600 p-3">4</td>
              <td className="border border-slate-600 p-3">5</td>
              <td className="border border-slate-600 p-3 text-blue-600">6</td>
            </tr>
            <tr>
              <td className="border border-slate-600 p-3 text-rose-600">7</td>
              <td className="border border-slate-600 p-3">8</td>
              <td className="border border-slate-600 p-3">9</td>
              <td className="border border-slate-600 p-3">10</td>
              <td className="border border-slate-600 p-3">11</td>
              <td className="border border-slate-600 p-3">12</td>
              <td className="border border-slate-600 p-3 text-blue-600">13</td>
            </tr>
            <tr>
              <td className="border border-slate-600 p-3 text-rose-600"></td>
              <td className="border border-slate-600 p-3">1</td>
              <td className="border border-slate-600 p-3">2</td>
              <td className="border border-slate-600 p-3">3</td>
              <td className="border border-slate-600 p-3">4</td>
              <td className="border border-slate-600 p-3">5</td>
              <td className="border border-slate-600 p-3 text-blue-600">6</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr> */}
          </table>
        </div>
        <div
          className="mt-3 flex justify-center text-center font-bold"
          style={{ width: '33%' }}
        >
          전체 자산
        </div>
      </div>
    </>
  );
}

export default DailyTracker;
