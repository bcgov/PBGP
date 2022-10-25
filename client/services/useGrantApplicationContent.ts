import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useGrantApplicationContext } from './useGrantApplicationContext';

export const useGrantApplicationContent = () => {
  const { isSubmitting, submitForm, setSubmitting } = useFormikContext();
  const {
    state: { isNextTriggered },
    updateWaitForValidation,
  } = useGrantApplicationContext();

  useEffect(() => {
    (async () => {
      if (isNextTriggered && !isSubmitting) {
        await submitForm();
        updateWaitForValidation();
        setSubmitting(false);
      }
    })();
  }, [isNextTriggered]);
};