import { useContext } from 'react';
import { GrantApplicationContext, GrantApplicationContextType } from '../contexts';

export const useGrantApplicationContext = () => {
  const {
    state,
    updateNextTriggered,
    updateProceedToNext,
    updateWaitForValidation,
    updateSessionId,
    updateShowModal,
    updateCanProceedToPrevious,
  } = useContext(GrantApplicationContext) as GrantApplicationContextType;

  return {
    updateNextTriggered: () => updateNextTriggered(),
    updateProceedToNext: () => updateProceedToNext(),
    updateWaitForValidation: () => updateWaitForValidation(),
    updateSessionId: (sessionId: string) => updateSessionId(sessionId),
    updateShowModal: (showModal: boolean) => updateShowModal(showModal),
    updateCanProceedToPrevious: (canProceedToPrevious: boolean) =>
      updateCanProceedToPrevious(canProceedToPrevious),

    state,
  };
};
