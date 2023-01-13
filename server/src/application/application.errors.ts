import { HttpStatus } from '@nestjs/common';
import { GenericError } from '../common/generic-exception';

export const ApplicationError = {
  APPLICATION_NOT_FOUND: {
    errorType: 'APPLICATION_NOT_FOUND',
    errorMessage: 'Cannot find application',
    httpStatus: HttpStatus.NOT_FOUND,
  } as GenericError,
};
