import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AppLogger } from './common/logger.service';
import { LoggerMiddleware } from './logger.middleware';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';
import { SyncChefsDataService } from './database/scripts/sync-chefs-data.service';
import { FormMetaDataModule } from './FormMetaData/formmetadata.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    FormMetaDataModule,
    FormMetaDataModule,
    ApplicationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppLogger, AppService, SyncChefsDataService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
