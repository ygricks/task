import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { type Response, type Request } from 'express';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { DOUBLE_CSRF_TOKEN } from './constants';
import { CsrfCookieOptions, JwtCookieOptions } from './auth.cookieOptions';
import { type IRequestWithJwt, type ISignData } from './auth.type';
import { type DoubleCsrfUtilities } from 'csrf-csrf';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(DOUBLE_CSRF_TOKEN) private csrfActions: DoubleCsrfUtilities,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: ISignData,
    @Req() req: IRequestWithJwt,
    @Res() res: Response,
  ) {
    const data = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    res.cookie('jwt', data.jwt, JwtCookieOptions);
    req.cookies.jwt = data.jwt;
    this.csrfActions.generateCsrfToken(req, res);
    return res.send({ payload: data.payload });
  }

  @Public()
  @Post('logout')
  signOut(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('jwt', JwtCookieOptions);
    // req.user = undefined;
    res.clearCookie('XSRF-TOKEN', CsrfCookieOptions);
    return res.send({ message: 'Logged out successfully' });
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Public()
  @Get('csrf-token')
  getCsrfToken(@Req() req: Request, @Res() res: Response) {
    const token = this.csrfActions.generateCsrfToken(req, res);
    return res.json({ generated: !!token });
  }
}
