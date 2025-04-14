import { SessionType } from '@pure-workspace/domain';
import {
  CustomThemeProvider,
  HomeContainer,
  SessionProvider,
} from '@pure-workspace/feature';
import { withSession } from 'libs/feature/src/lib/services';
import { GetServerSideProps } from 'next';

export const Home = ({ session }: SessionType) => {
  return (
    <SessionProvider session={session}>
      <CustomThemeProvider>
        <HomeContainer />
      </CustomThemeProvider>
    </SessionProvider>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<SessionType> = withSession(
  process.env['NEXT_PUBLIC_PURE_DIGITAL_APP_ID'] ?? '',
  async (ctx) => {
    return {
      props: {
        session: ctx.req.session,
      },
    };
  }
);
