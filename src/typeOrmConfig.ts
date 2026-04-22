import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

ConfigModule.forRoot();

export function TypeOrmConfigFactory(
  config: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: +config.get<number>('DB_PORT', 5432),
    username: config.get<string>('DB_USER'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_DB'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: config.get<string>('NODE_ENV') !== 'production',
  };
}
