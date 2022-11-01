import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useGrantApplication } from './useGrantApplicationContext';

export const useFormContent = () => {
  const { isSubmitting, submitForm, setSubmitting } = useFormikContext();
  const {
    state: { isNextTriggered },
  } = useGrantApplication();

  useEffect(() => {
    (async () => {
      if (isNextTriggered && !isSubmitting) {
        await submitForm();
        setSubmitting(false);
      }
    })();
  }, [isNextTriggered]);
};
