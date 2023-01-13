import { HttpStatus } from '@nestjs/common';
import { GenericError } from './generic-exception';

export const getGenericError = (error: any): GenericError => {
  const customError = {
    errorType: error?.response?.statusText || error?.message || 'INTERNAL_SERVER_ERROR',
    errorMessage:
      error?.response?.data?.message ?? error?.response?.data ?? 'Internal server error',
    httpStatus: error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
  };
  return customError;
};

/**
 *
 * @param text Input text to be cleaned
 * @returns input text in lowercase with only alphanumeric chars
 */
export const cleanText = (text: string): string => {
  const regex = /\W/gm;
  return text.toLowerCase().replace(regex, '');
};

export const flattenArray = (input: any[], depth = 1, stack = []) => {
  for (const item of input) {
    if (item instanceof Array && depth > 0) {
      flattenArray(item, depth - 1, stack);
    } else {
      stack.push(item);
    }
  }

  return stack;
};

// Extracts {} objects from nested arrays and object values
export const extractObjects = (input: any[], depth = 1, stack = []) => {
  for (const item of input) {
    if (item instanceof Array && depth > 0) {
      extractObjects(item, depth - 1, stack);
    } else if (item instanceof Object) {
      const arrs = Object.values(item).filter((element) => Array.isArray(element));
      if (arrs.length > 0) {
        extractObjects(arrs, depth - 1, stack);
      } else {
        stack.push(item);
      }
    }
  }

  return stack;
};
