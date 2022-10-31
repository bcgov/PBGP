import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useFormContext } from './useFormContext';

export const useFormContent = () => {
  const { isSubmitting, submitForm, setSubmitting } = useFormikContext();
  const {
    state: { isNextTriggered },
  } = useFormContext();

  useEffect(() => {
    (async () => {
      if (isNextTriggered && !isSubmitting) {
        await submitForm();
        setSubmitting(false);
      }
    })();
  }, [isNextTriggered]);
};
