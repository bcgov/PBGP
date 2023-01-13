import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AppLogger } from './common/logger.service';
import { LoggerMiddleware } from './logger.middleware';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';
import { FormMetaDataModule } from './FormMetaData/formmetadata.module';
import { CommentModule } from './comments/comment.module';
import { BroaderReviewScoreModule } from './score/broader-review-score.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    FormMetaDataModule,
    ApplicationModule,
    UserModule,
    CommentModule,
    BroaderReviewScoreModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppLogger, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
