import { PublicRoute } from '@/common/decorator';
import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { Readable } from 'stream';
import { Attachment } from './attachment.entity';
import { AttachmentService } from './attachment.service';

@Controller('attachments')
export class AttachmentController {
  constructor(private attachmentService: AttachmentService) {}

  @Get('/:id')
  async getAttachment(
    @Res({ passthrough: true }) res: Response,
    @Param('attachmentId') attachmentId: string
  ) {
    const attachment: Attachment = await this.attachmentService.getAttachment(attachmentId);
    if (attachment) {
      const file = Readable.from(attachment.data);

      res.set({
        'content-disposition': `attachment; filename=${attachment.originalName}`,
      });

      return new StreamableFile(file);
    }
    return;
  }
}
