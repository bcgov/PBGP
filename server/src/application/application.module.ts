import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { FormMetaDataModule } from '../FormMetaData/formmetadata.module';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), FormMetaDataModule],
  exports: [],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
