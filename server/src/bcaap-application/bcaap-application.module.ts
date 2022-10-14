import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BCAAPApplication } from './bcaap-application.entity';
import { BCAAPApplicationController } from './bcaap-application.controller';
import { BCAAPApplicationService } from './bcaap-application.service';

@Module({
  imports: [TypeOrmModule.forFeature([BCAAPApplication])],
  exports: [],
  controllers: [BCAAPApplicationController],
  providers: [BCAAPApplicationService],
})
export class BCAAPAppicationModule {}
