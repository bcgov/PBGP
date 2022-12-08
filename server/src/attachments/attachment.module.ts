import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './attachment.entity';
import { AttachmentService } from './attachment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment])],
  exports: [AttachmentService],
  controllers: [],
  providers: [AttachmentService],
})
export class CommentModule {}
