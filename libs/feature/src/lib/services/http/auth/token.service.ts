import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
const ACCESS_TOKEN_KEY = process.env['NEXT_PUBLIC_ACCESS_TOKEN_KEY'] ?? '';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;

export const tokenService = {
  save(accessToken: string, ctx = null) {
    nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: ONE_MINUTE,
      path: '/',
    });
  },
  get(ctx: GetServerSidePropsContext) {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_KEY] || '';
  },
  delete(ctx: GetServerSidePropsContext) {
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
  },
};
