import { useRouter } from 'next/router';
import {
  LandingPageHeroSection,
  LandingPageServicesSection,
  LandingPageHeader,
} from '../../components';
import { scrollToService } from '../../services';

export const PureDigitalLPContainer = () => {
  const router = useRouter();
  return (
    <>
      <LandingPageHeader
        listOfSinkerTexts={[
          {
            title: 'Home',
            to: () => scrollToService('home'),
          },
          {
            title: 'Serviços',
            to: () => scrollToService('services'),
          },
          {
            title: 'Contato',
            to: () => scrollToService('contato'),
          },
          {
            title: 'Blog',
            to: () => scrollToService('blog'),
          },
          {
            title: 'Login',
            to: () => {
              router.push('/login');
            },
          },
        ]}
      />
      <LandingPageHeroSection
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
      <LandingPageServicesSection />
    </>
  );
};
