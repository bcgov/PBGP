import { HttpStatus } from '@nestjs/common';
import { GenericError } from '../common/generic-exception';

export const AttachmentError = {
  ATTACHMENT_NOT_FOUND: {
    errorType: 'ATTACHMENT_NOT_FOUND',
    errorMessage: 'Cannot find attachment',
    httpStatus: HttpStatus.NOT_FOUND,
  } as GenericError,
};
