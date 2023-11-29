import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Application } from '../../application/application.entity';
import { ApplicationModule } from '../../application/application.module';
import { AttachmentModule } from '../../attachments/attachment.module';
import { FormMetaData } from '../../FormMetaData/formmetadata.entity';
import { FormMetaDataModule } from '../../FormMetaData/formmetadata.module';
import { SyncChefsDataService } from './sync-chefs-data.service';
import { SyncDataController } from './sync-chefs-data.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    TypeOrmModule.forFeature([FormMetaData]),
    ApplicationModule,
    AttachmentModule,
    FormMetaDataModule,
  ],
  exports: [SyncChefsDataService],
  controllers: [SyncDataController],
  providers: [SyncChefsDataService],
})
export class SyncChefsDataModule {}
