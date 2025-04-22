import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { CustomThemeProvider } from '@pure-workspace/feature';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bem Vindo(a)</title>
      </Head>
      <main className="app">
        <CustomThemeProvider>
          <Component {...pageProps} />
        </CustomThemeProvider>
      </main>
    </>
  );
}

export default CustomApp;
