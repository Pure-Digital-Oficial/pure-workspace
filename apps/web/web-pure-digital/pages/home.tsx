import {
  HomeContainerPropsDto,
  SessionResponseDto,
} from '@pure-workspace/domain';
import { HomeContainer } from '@pure-workspace/feature';
import { withSession } from 'libs/feature/src/lib/services';
import { GetServerSideProps } from 'next';

export const Home = ({ session }: HomeContainerPropsDto) => {
  return <HomeContainer session={session} />;
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeContainerPropsDto> =
  withSession('1', async (ctx) => {
    return {
      props: {
        session: ctx.req.session,
      },
    };
  });
