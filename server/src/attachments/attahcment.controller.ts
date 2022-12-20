import { GenericException } from '@/common/generic-exception';
import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { Readable } from 'stream';
import { Attachment } from './attachment.entity';
import { AttachmentError } from './attachment.errors';
import { AttachmentService } from './attachment.service';

@Controller('attachments')
export class AttachmentController {
  constructor(private attachmentService: AttachmentService) {}

  @Get('/:id')
  async getAttachment(@Param('id') attachmentId: string) {
    const attachment: Attachment = await this.attachmentService.getAttachment(attachmentId);
    if (attachment) {
      const file = Readable.from(attachment.data);

      return new StreamableFile(file, {
        disposition: `attachment; filename=${attachment.originalName}`,
      });
    }
    throw new GenericException(AttachmentError.ATTACHMENT_NOT_FOUND);
  }
}
