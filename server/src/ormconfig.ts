import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DatabaseNamingStrategy } from './database/database.naming-strategy';
import DatabaseLogger from './database/database-logger';
// import { join } from 'path';
dotenv.config();
// Check typeORM documentation for more information.

// const isTestMode = process.env.NODE_ENV === 'test';
// COmmenting these lines out for now
const entities =
  // process.env.NODE_ENV === 'development' || isTestMode
  //   ? join(__dirname, '../**/**.entity{.ts,.js}')
  'dist/**/*.entity{ .ts,.js}';

const config: PostgresConnectionOptions = {
  host: process.env.POSTGRES_HOST,
  type: 'postgres',
  port: +(process.env.PORTGRES_PORT || 5432),
  username: process.env.POSTGRES_USERNAME || 'freshworks',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE || 'tbcm',
  cli: {
    migrationsDir: 'src/migration',
    entitiesDir: 'src/**/*.entity.ts',
  },
  entities: [entities],
  migrations: ['dist/migration/*.js'],
  subscribers: ['dist/**/*.subscribers.js'],
  synchronize: false,
  migrationsRun: true,
  namingStrategy: new DatabaseNamingStrategy(),
  logging: !!process.env.DEBUG,
  logger: process.env.DEBUG ? new DatabaseLogger() : undefined,
};

export default config;
