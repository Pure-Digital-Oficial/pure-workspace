import { SessionType } from '@pure-workspace/domain';
import { UserContainer } from '@pure-workspace/feature';
import { withSession } from 'libs/feature/src/lib/services';
import { GetServerSideProps } from 'next';

export const User = () => {
  return <UserContainer />;
};

export default User;

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
