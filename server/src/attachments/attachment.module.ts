import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './attachment.entity';
import { AttachmentService } from './attachment.service';
import { AttachmentController } from './attahcment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment])],
  exports: [AttachmentService],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
