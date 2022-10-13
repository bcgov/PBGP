import { dateToString } from './date';

export const serializeTopupFormValues = (values, submissionType) => {
  const valuesCopy = { ...values, submissionType };
  valuesCopy.established = dateToString(valuesCopy.established, false);
  return valuesCopy;
}