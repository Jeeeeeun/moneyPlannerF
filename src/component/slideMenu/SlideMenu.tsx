import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  CloseLeftMenu,
  CloseRightMenu,
} from '@/component/FontAwesome/FontAwesomeIcons';

interface MenuProps {
  showSlideMenu?: boolean;
  setShowSlideMenu?: (value: boolean) => void;
  showMenuItems?: boolean;
  setShowMenuItems?: (value: boolean) => void;
  onClick?: () => void;
  onMenuClick?: () => void;
  isRight?: boolean;
  className?: string;
  style?: object;
}

function SlideMenu(props: MenuProps) {
  const router = useRouter();

  const [showMenuItems, setShowMenuItems] = useState(true);

  const onRightMenuClick = () => {
    // 오른쪽에 있는 slide menu 닫힘 버튼 클릭됐을 때
    if (props.setShowSlideMenu !== undefined) {
      props.setShowSlideMenu(false);
    }
  };

  const onLeftMenuClick = () => {
    // 왼쪽에 있는 slide menu 닫힘 버튼 클릭됐을 때
    if (props.setShowSlideMenu !== undefined) {
      console.log(showMenuItems); // 테스트 아직 못해봄
      props.setShowSlideMenu(false);
    }
  };

  return (
    <>
      <section
        className="fixed m-0 h-full w-1/5 text-white"
        style={{
          backgroundColor: '#76878dee',
          right: props.isRight ? '0' : 'auto',
          left: !props.isRight ? '0' : 'auto',
        }}
      >
        <CloseRightMenu
          onMenuClick={onRightMenuClick}
          className="mb-0.5 pl-4 pt-2 text-lg text-white duration-200 ease-in-out"
          style={{ display: props.isRight ? 'block' : 'none' }}
        />
        <CloseLeftMenu
          onMenuClick={onLeftMenuClick}
          className="absolute right-0 mb-0.5 pr-4 pt-2 text-lg text-white duration-200 ease-in-out"
          style={{ display: props.isRight ? 'none' : 'block' }}
        />
        {showMenuItems && (
          <>
            <h1
              className="mx-0 mb-1 cursor-pointer indent-8 text-xl font-bold text-white hover:bg-neutral-600"
              style={{ marginTop: props.isRight ? '0.3rem' : '2.125rem' }}
            >
              Financial Tracker
            </h1>
            <ul>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/tracker/dailyTracker')}
              >
                Daliy
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/tracker/monthlyTracker')}
              >
                Monthly
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/tracker/annualTracker')}
              >
                Annual
              </li>
            </ul>

            <h1
              className="mx-0 mb-1 cursor-pointer indent-8 text-xl font-bold text-white hover:bg-neutral-600"
              style={{ marginTop: '0.3rem' }}
            >
              Statistics
            </h1>
            <ul>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/stats/monthStat')}
              >
                Monthly
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/stats/annualStat')}
              >
                Annual
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/stats/customPeriodStat')}
              >
                Custom Period Setting
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/stats/wholeStat')}
              >
                Whole Period
              </li>
            </ul>
            <h1
              className="mx-0 mb-1 cursor-pointer indent-8 text-xl font-bold text-white hover:bg-neutral-600"
              style={{ marginTop: '0.3rem' }}
            >
              Comparison
            </h1>
            <ul>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/compare/weeklyCompare')}
              >
                Weekly
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/compare/monthlyCompare')}
              >
                Monthly
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/compare/annualCompare')}
              >
                Annual
              </li>
            </ul>
            <ul>
              <h1
                className="mx-0 mb-1 cursor-pointer indent-8 text-xl font-bold text-white hover:bg-neutral-600"
                style={{ marginTop: '0.3rem' }}
              >
                Settings
              </h1>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/setting/setMode')}
              >
                Mode
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/setting/assetGroup')}
              >
                Asset Group
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/setting/incomeExpenseCategory')}
              >
                Income & Expense Categories
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/setting/budget')}
              >
                Budget
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/setting/repeat')}
              >
                Repeat & Frequency
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/setting/currency')}
              >
                Currency
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/setting/exportToExcel')}
              >
                Export Excel File
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/setting/backupRestore')}
              >
                Backup & Restore
              </li>
              <li
                className="m-0 block cursor-pointer indent-16 text-white no-underline hover:bg-neutral-600"
                onClick={() => router.push('/setting/style')}
              >
                Style
              </li>
            </ul>
            <h1
              className="mx-0 mb-1 cursor-pointer indent-8 text-xl font-bold text-white hover:bg-neutral-600"
              style={{ marginTop: '0.3rem' }}
              onClick={() => router.push('/inquiry')}
            >
              Inquiry
            </h1>

            <h1
              className="mx-0 mb-1 cursor-pointer indent-8 text-xl font-bold text-white hover:bg-neutral-600"
              style={{ marginTop: '0.3rem' }}
              onClick={() => router.push('/guide')}
            >
              Guide
            </h1>
          </>
        )}
      </section>
    </>
  );
}

export default SlideMenu;
