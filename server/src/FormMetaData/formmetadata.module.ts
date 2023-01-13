import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormMetaData } from './formmetadata.entity';
import { FormMetaDataService } from './formmetadata.service';
import { FormMetaDataController } from './formmetadata.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FormMetaData])],
  exports: [],
  controllers: [FormMetaDataController],
  providers: [FormMetaDataService],
})
export class FormMetaDataModule {}
