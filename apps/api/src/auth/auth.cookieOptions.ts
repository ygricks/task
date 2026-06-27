import { CsrfTokenCookieOptions } from 'csrf-csrf';
import { CookieOptions } from 'express';

export const JwtCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/api',
};

export const CsrfCookieOptions: CsrfTokenCookieOptions = {
  httpOnly: false,
  sameSite: 'strict',
  secure: true,
  path: '/',
};
