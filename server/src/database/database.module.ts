import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SyncChefsDataService } from './scripts/sync-chefs-data.service';

import config from '../ormconfig';
import { Application } from '../application/application.entity';
import { FormMetaDataService } from '../FormMetaData/formmetadata.service';
import { FormMetaData } from '../FormMetaData/formmetadata.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../user/user.entity';
import { ApplicationModule } from '../application/application.module';
import { Attachment } from '../attachments/attachment.entity';
import { AttachmentModule } from '../attachments/attachment.module';
import { SyncChefsDataModule } from './scripts/sync-chefs-data.module';

// const getEnvironmentSpecificConfig = (env?: string) => {
//   switch (env) {
//     case 'production':
//       return {
//         entities: [join(__dirname, '../**/*.entity.js')],
//         migrations: [join(__dirname, '../migration/*.js')],
//         logging: ['migration'] as LoggerOptions,
//       };
//     case 'test':
//       return {
//         port: parseInt(process.env.TEST_POSTGRES_PORT || '5432'),
//         host: process.env.TEST_POSTGRES_HOST,
//         username: process.env.TEST_POSTGRES_USERNAME,
//         password: process.env.TEST_POSTGRES_PASSWORD,
//         database: process.env.TEST_POSTGRES_DATABASE,
//         entities: ['dist/**/*.entity.js'],
//         migrations: ['dist/migration/*.js'],
//         logging: ['error', 'warn', 'migration'] as LoggerOptions,
//       };
//     default:
//       return {
//         entities: ['dist/**/*.entity.js'],
//         migrations: ['dist/migration/*.js'],
//         logging: ['error', 'warn', 'migration'] as LoggerOptions,
//       };
//   }
// };

// const nodeEnv = process.env.NODE_ENV;
// const environmentSpecificConfig = getEnvironmentSpecificConfig(nodeEnv);

const appOrmConfig: PostgresConnectionOptions = {
  ...config,
  migrationsRun: true,
  synchronize: false,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(appOrmConfig),
    TypeOrmModule.forFeature([Application, FormMetaData, Comment, User, Attachment]),
    ApplicationModule,
    AttachmentModule,
    SyncChefsDataModule,
  ],
  providers: [Logger, SyncChefsDataService, FormMetaDataService],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
