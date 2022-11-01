import { useContext } from 'react';
import { GrantApplication, GrantApplicationType } from '../../contexts/GrantApplication.context';

export const useGrantApplication = () => {
  const { state, updateNextTriggered, updateProceedToNext } = useContext(
    GrantApplication
  ) as GrantApplicationType;

  return {
    updateNextTriggered: () => updateNextTriggered(),
    updateProceedToNext: () => updateProceedToNext(),
    state,
  };
};
