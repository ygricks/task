import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>, @Res() res) {
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
    return res.send({ payload: data.payload });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
