import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './attachment.entity';
import { AttachmentDto } from './dto/attachment.dto';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>
  ) {}

  async getAttachment(id: string): Promise<Attachment> {
    return this.attachmentRepository.findOne(id);
  }

  async updateAttachment(attachmentDto: AttachmentDto): Promise<Attachment> {
    return await this.attachmentRepository.save({ ...attachmentDto });
  }

  async createOrUpdateAttachment(attachmentDto: AttachmentDto): Promise<Attachment> {
    const attachment = await this.getAttachment(attachmentDto.id);
    if (!attachment) {
      Logger.log('-- Attachment not found, creating');

      return this.createAttachment(attachmentDto);
    }
    Logger.log('-- Attachment exists, updating');
    return this.updateAttachment(attachmentDto);
  }

  async createAttachment(attachmentDto: AttachmentDto): Promise<Attachment> {
    const attachment = this.attachmentRepository.create(attachmentDto);

    return await this.attachmentRepository.save(attachment);
  }
}
