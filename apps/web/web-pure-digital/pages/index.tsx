import { CompanyProvider, LoginContainer } from '@pure-workspace/feature';

export const Index = () => {
  return (
    <CompanyProvider
      companyResponse={{
        logo: '/Red_Pure_Digital_Logo.svg',
        balckLogo: '/Black_Pure_Digital_Logo.svg',
      }}
    >
      <LoginContainer />
    </CompanyProvider>
  );
};

export default Index;
