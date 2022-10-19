import { Controller } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private fileService: FileService) {}
}
