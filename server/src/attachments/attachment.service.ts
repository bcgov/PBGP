import { Injectable } from '@nestjs/common';
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

  async createAttachment(attachmentDto: AttachmentDto): Promise<Attachment> {
    const attachment = this.attachmentRepository.create(attachmentDto);

    return await this.attachmentRepository.save(attachment);
  }
}
