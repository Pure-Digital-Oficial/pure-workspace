import { AppProvider, LoginContainer } from '@pure-workspace/feature';

export const Index = () => {
  return (
    <AppProvider
      company={{
        logo: '/Red_Pure_Digital_Logo.svg',
        balckLogo: '/Black_Pure_Digital_Logo.svg',
      }}
      appId={process.env['NEXT_PUBLIC_PURE_DIGITAL_APP_ID'] ?? ''}
    >
      <LoginContainer />
    </AppProvider>
  );
};

export default Index;
