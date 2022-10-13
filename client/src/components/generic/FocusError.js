import { useEffect } from 'react';
import { useFormikContext } from 'formik';

export const FocusError = () => {
    const { errors, isSubmitting, isValidating } = useFormikContext();

    /**
       * TODO: Fix this 
       *
      useEffect(() => {
          if (isSubmitting && !isValidating) {
              const keys = stringify(errors);
              if (keys.length > 0 && isSubmitting && !isValidating) {
                  const errorElement =
                      document.querySelector(`input[name='${keys[0]}']:not([type='hidden'])`) ||
                      document.querySelector(`div[id='mui-component-select-${keys[0]}']`);
                  if (errorElement) errorElement.focus();
              }
          }
      }, [errors, isSubmitting, isValidating]);
      */

    return null;
};