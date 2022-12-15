import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Attachment } from './attachment.entity';
import { AttachmentService } from './attachment.service';

@Controller('attachments')
export class AttachmentController {
  constructor(private attachmentService: AttachmentService) {}

  @Get('/:id')
  async getAttachment(@Res() res: Response, @Param('attachmentId') attachmentId: string) {
    const attachment: Attachment = await this.attachmentService.getAttachment(attachmentId);
    if (attachment) {
      return res
        .set({
          'content-disposition': `attachment; filename=${attachment.originalName}`,
          'Content-Type': 'application/pdf',
        })
        .json(attachment.data);
    }
    return;
  }
}
