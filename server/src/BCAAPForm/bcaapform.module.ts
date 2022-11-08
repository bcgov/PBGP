import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BCAAPForm } from './bcaapform.entity';
import { BCAAPFormService } from './bcaapform.service';
import { BCAAPFormController } from './bcaapform.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BCAAPForm])],
  exports: [],
  controllers: [BCAAPFormController],
  providers: [BCAAPFormService],
})
export class ApplicationModule {}
