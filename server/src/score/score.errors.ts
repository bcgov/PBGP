import { HttpStatus } from '@nestjs/common';
import { GenericError } from '../common/generic-exception';

export const ScoreError = {
  SCORE_NOT_FOUND: {
    errorType: 'SCORE_NOT_FOUND',
    errorMessage: 'Cannot find score',
    httpStatus: HttpStatus.NOT_FOUND,
  } as GenericError,

  USER_MISMATCH: {
    errorType: 'USER_MISMATCH',
    errorMessage: 'Score is assigned to a different user',
    httpStatus: HttpStatus.BAD_REQUEST,
  } as GenericError,

  APPLICATION_MISMATCH: {
    errorType: 'APPLICATION_MISMATCH',
    errorMessage: 'Score is assigned to a application user',
    httpStatus: HttpStatus.BAD_REQUEST,
  } as GenericError,

  SCORE_EXISTS: {
    errorType: 'SCORE_EXISTS',
    errorMessage: 'Score already exists for this application',
    httpStatus: HttpStatus.BAD_REQUEST,
  },
};
