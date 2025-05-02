import { LandingPageHeader } from '../../components';

export const PureDigitalLPContainer = () => {
  return (
    <LandingPageHeader
      listOfSinkerTexts={[
        {
          title: 'Home',
          to: 'home',
        },
        {
          title: 'Serviços',
          to: 'servico',
        },
        {
          title: 'Contato',
          to: 'contato',
        },
        {
          title: 'Blog',
          to: 'blog',
        },
        {
          title: 'Login',
          to: 'login',
        },
      ]}
    />
  );
};
