import { useContext } from 'react';
import { FormContext, FormContextType } from '../../contexts/Form.context';

export const useFormContext = () => {
  const { state, updateNextTriggered, updateProceedToNext } = useContext(
    FormContext
  ) as FormContextType;

  return {
    updateNextTriggered: () => updateNextTriggered(),
    updateProceedToNext: () => updateProceedToNext(),
    state,
  };
};
