import { SessionType } from '@pure-workspace/domain';
import { HomeContainer } from '@pure-workspace/feature';
import { withSessionService } from '@pure-workspace/feature';
import { GetServerSideProps } from 'next';

export const Home = () => {
  return <HomeContainer />;
};

export default Home;

export const getServerSideProps: GetServerSideProps<SessionType> =
  withSessionService(
    process.env['NEXT_PUBLIC_PURE_DIGITAL_APP_ID'] ?? '',
    async (ctx) => {
      return {
        props: {
          session: ctx.req.session,
        },
      };
    }
  );
