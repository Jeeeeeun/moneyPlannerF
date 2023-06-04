import '../styles/global.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { Gamja_Flower } from 'next/font/google'; // google font 사용하기 위함

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
			<Component {...pageProps} />
		</CacheProvider>
	</>
);

export default MyApp;
