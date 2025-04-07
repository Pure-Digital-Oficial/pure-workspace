import nookies from 'nookies';
const ACCESS_TOKEN_KEY = process.env['NEXT_PUBLIC_ACCESS_TOKEN_KEY'] ?? '';

export const tokenService = {
  save(accessToken: string, ctx = null) {
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
    globalThis?.sessionStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
    nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: process.env['NEXT_PUBLIC_JWT_ACCESS_EXPIRATION_IN'],
      path: '/',
    });
  },
  get(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_KEY] || '';
  },
  delete(ctx = null) {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY);
    globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN_KEY);
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
  },
};
