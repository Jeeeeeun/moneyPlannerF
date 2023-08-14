import '../styles/global.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Gamja_Flower } from 'next/font/google'; // google font 사용하기 위함

import { Provider } from 'react-redux';
import store from '../store/store';

const gamjaFlower = Gamja_Flower({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

const cache = createCache({
  key: 'css',
  prepend: true,
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <style jsx global>
      {`
        html {
          font-family: ${gamjaFlower.style.fontFamily};
        }
      `}
    </style>
    <CacheProvider value={cache}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </CacheProvider>
    <ToastContainer />
  </>
);

export default MyApp;
