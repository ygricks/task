import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { StringValue } from 'ms';
import { doubleCsrf } from 'csrf-csrf';
import { DOUBLE_CSRF_TOKEN } from './constants';

@Global()
@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<StringValue>('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: DOUBLE_CSRF_TOKEN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const csrfConfig = doubleCsrf({
          getSecret: () => configService.getOrThrow<string>('CSRF_SECRET'),
          cookieName: 'ps-csrf',
          cookieOptions: {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            path: '/api',
          },
          size: 64,
          ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
          getCsrfTokenFromRequest: (req) => req.headers['x-csrf-token'],
          getSessionIdentifier: (req) => req.cookies?.jwt || '',
        });

        return csrfConfig;
      },
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, AuthGuard, DOUBLE_CSRF_TOKEN],
})
export class AuthModule {}
