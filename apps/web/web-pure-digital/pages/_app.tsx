import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { CustomThemeProvider, SessionProvider } from '@pure-workspace/feature';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pure Digital</title>
      </Head>
      <main className="app">
        <SessionProvider session={pageProps.session}>
          <CustomThemeProvider>
            <Component {...pageProps} />
          </CustomThemeProvider>
        </SessionProvider>
      </main>
    </>
  );
}

export default CustomApp;
