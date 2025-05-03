import { LadingPageHeroSection, LandingPageHeader } from '../../components';

export const PureDigitalLPContainer = () => {
  return (
    <>
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
      <LadingPageHeroSection
        subTitle={
          <>
            <span style={{ color: '#C91517' }}>
              Estratégia, tecnologia e dados
            </span>{' '}
            movendo o seu negócio todos os dias.
          </>
        }
        title={
          <>
            Performance <strong>digital na prática.</strong>
          </>
        }
        image="/Pure_Digital_Hero_Section.svg"
      />
    </>
  );
};
