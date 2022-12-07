import { HttpStatus } from '@nestjs/common';
import { GenericError } from '../common/generic-exception';

export const ApplicationError = {
  APPLICATION_NOT_FOUND: {
    errorType: 'APPLICATION_NOT_FOUND',
    errorMessage: 'Cannot find application',
    httpStatus: HttpStatus.NOT_FOUND,
  } as GenericError,

  USER_EMPTY: {
    errorType: 'USER_EMPTY',
    errorMessage: 'Empty User is not allowed',
    httpStatus: HttpStatus.BAD_REQUEST,
  } as GenericError,
};
