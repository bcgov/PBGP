import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  exports: [],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
