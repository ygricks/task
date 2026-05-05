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
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { DOUBLE_CSRF_TOKEN } from './constants';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(DOUBLE_CSRF_TOKEN) private csrfActions: any,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>, @Req() req, @Res() res) {
    const data = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    res.cookie('jwt', data.jwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/api',
    });
    req.cookies.jwt = data.jwt;
    const token = this.csrfActions.generateCsrfToken(req, res);
    return res.send({ payload: data.payload, token });
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Public()
  @Get('csrf-token')
  getCsrfToken(@Req() req, @Res() res) {
    const token = this.csrfActions.generateCsrfToken(req, res);
    return res.json({ token });
  }
}
