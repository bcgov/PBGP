import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportingDocument } from './supporting-document.entity';
import { SupportingDocumentController } from './supporting-document.controller';
import { SupportingDocumentService } from './supporting-document.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupportingDocument])],
  exports: [],
  controllers: [SupportingDocumentController],
  providers: [SupportingDocumentService],
})
export class SupportingDocumentModule {}
