import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

ConfigModule.forRoot();

export function TypeOrmConfigFactory(
  config: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: config.getOrThrow<string>('DB_HOST'),
    port: +config.getOrThrow<number>('DB_PORT', 5432),
    username: config.getOrThrow<string>('DB_USER'),
    password: config.getOrThrow<string>('DB_PASSWORD'),
    database: config.getOrThrow<string>('DB_DB'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: config.getOrThrow<string>('NODE_ENV') !== 'production',
  };
}
