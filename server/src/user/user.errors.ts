import { HttpStatus } from '@nestjs/common';
import { GenericError } from '../common/generic-exception';

export const UserError = {
  USER_NOT_FOUND: {
    errorType: 'USER_NOT_FOUND',
    errorMessage: 'Cannot find user',
    httpStatus: HttpStatus.NOT_FOUND,
  } as GenericError,
};
