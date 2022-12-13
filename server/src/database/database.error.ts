import { GenericError } from '../common/generic-exception';

export const DatabaseError = {
  TOKEN_NOT_FOUND: {
    errorType: 'TOKEN_NOT_FOUND',
    errorMessage: "Couldn't find the bearer token argument. Please provide it as -- token=<token>.",
  } as GenericError,
};
