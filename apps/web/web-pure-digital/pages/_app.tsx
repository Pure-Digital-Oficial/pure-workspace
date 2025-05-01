import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import {
  AlertProvider,
  AppProvider,
  CustomThemeProvider,
  SessionProvider,
} from '@pure-workspace/feature';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pure Digital</title>
      </Head>
      <main className="app">
        <SessionProvider session={pageProps.session}>
          <AppProvider
            company={{
              logo: '/Red_Pure_Digital_Logo.svg',
              balckLogo: '/Black_Pure_Digital_Logo.svg',
              logoAndText: '/Pure_Digital_Logo_and_Text.svg',
            }}
            appId={process.env['NEXT_PUBLIC_PURE_DIGITAL_APP_ID'] ?? ''}
          >
            <AlertProvider>
              <CustomThemeProvider>
                <Component {...pageProps} />
              </CustomThemeProvider>
            </AlertProvider>
          </AppProvider>
        </SessionProvider>
      </main>
    </>
  );
}

export default CustomApp;
