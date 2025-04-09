import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { authService } from './auth.service';
import { SessionResponseDto } from '@pure-workspace/domain';

export function withSession<P = unknown>(
  handler: (
    ctx: GetServerSidePropsContext & {
      req: GetServerSidePropsContext['req'] & { session: SessionResponseDto };
    }
  ) => Promise<GetServerSidePropsResult<P>>
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    try {
      const session = await authService.getSession(ctx, '1');

      const reqWithSession = Object.assign(ctx.req, {
        session,
      }) as unknown as typeof ctx.req & { session: SessionResponseDto };

      return handler({
        ...ctx,
        req: reqWithSession,
      });
    } catch (err) {
      console.error(err);
      return {
        redirect: {
          permanent: false,
          destination: '/?error=401',
        },
      };
    }
  };
}
