import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { Comment } from '../comments/comment.entity';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Comment, User]), UserModule],
  exports: [],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
