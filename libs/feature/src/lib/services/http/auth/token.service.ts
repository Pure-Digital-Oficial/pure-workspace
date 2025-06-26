import { TokenResponseDto } from '@pure-workspace/domain';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

const ACCESS_TOKEN_KEY = process.env['NEXT_PUBLIC_ACCESS_TOKEN_KEY'] ?? '';
const REFRESH_TOKEN_KEY = process.env['NEXT_PUBLIC_REFRESH_TOKEN_KEY'] ?? '';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

export const tokenService = {
  async save(
    tokens: TokenResponseDto,
    ctx: GetServerSidePropsContext | null = null
  ) {
    nookies.set(ctx, ACCESS_TOKEN_KEY, tokens.accessToken, {
      maxAge: ONE_MINUTE,
      path: '/',
    });

    nookies.set(ctx, REFRESH_TOKEN_KEY, tokens.refreshToken, {
      maxAge: ONE_DAY * 7,
      sameSite: 'lax',
      path: '/',
    });
  },
  get(ctx: GetServerSidePropsContext) {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_KEY] || '';
  },
  delete(ctx = null) {
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
    nookies.destroy(ctx, REFRESH_TOKEN_KEY);
  },
};
