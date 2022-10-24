import { createContext, useReducer } from 'react';

export interface GrantApplicationContextStateProps {
  isNextTriggered: boolean;
  canProceedToNext: boolean;
  sessionId: string;
  showModal: boolean;
  canProceedToPrevious: boolean;
}

const initialState: GrantApplicationContextStateProps = {
  isNextTriggered: false,
  canProceedToNext: false,
  sessionId: '',
  showModal: false,
  canProceedToPrevious: false,
};

export type GrantApplicationContextType = {
  state: GrantApplicationContextStateProps;
  updateNextTriggered: () => void;
  updateProceedToNext: () => void;
  updateWaitForValidation: () => void;
  updateSessionId: (sessionId: string) => void;
  updateShowModal: (showModal: boolean) => void;
  updateCanProceedToPrevious: (canProceedToPrevious: boolean) => void;
};

const enum GrantApplicationActions {
  NEXT_TRIGGERED = 'NEXT_TRIGGERED',
  PROCEED_TO_NEXT = 'PROCEED_TO_NEXT',
  WAIT_FOR_VALIDATION = 'WAIT_FOR_VALIDATION',
  UPDATE_SESSION_ID = 'UPDATE_SESSION_ID',
  UPDATE_SHOW_MODAL = 'UPDATE_SHOW_MODAL',
  PROCEED_TO_PREVIOUS = 'PROCEED_TO_PREVIOUS',
}

function reducer(state: any, action: any): GrantApplicationContextStateProps {
  switch (action.type) {
    case GrantApplicationActions.NEXT_TRIGGERED:
      return {
        ...state,
        isNextTriggered: true,
        canProceedToNext: false,
      };
    case GrantApplicationActions.PROCEED_TO_NEXT:
      return {
        ...state,
        isNextTriggered: false,
        canProceedToNext: true,
      };
    case GrantApplicationActions.WAIT_FOR_VALIDATION:
      return {
        ...state,
        isNextTriggered: false,
        canProceedToNext: false,
      };
    case GrantApplicationActions.UPDATE_SESSION_ID:
      return {
        ...state,
        ...action.payload,
      };
    case GrantApplicationActions.UPDATE_SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload.showModal,
      };
    case GrantApplicationActions.PROCEED_TO_PREVIOUS:
      return {
        ...state,
        canProceedToPrevious: action.payload.canProceedToPrevious,
      };
    default:
      return {
        ...state,
      };
  }
}

export const GrantApplicationContext = createContext<GrantApplicationContextType | null>(null);

export const GrantApplicationProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateNextTriggered = () => dispatch({ type: GrantApplicationActions.NEXT_TRIGGERED });
  const updateProceedToNext = () => dispatch({ type: GrantApplicationActions.PROCEED_TO_NEXT });
  const updateWaitForValidation = () => dispatch({ type: GrantApplicationActions.WAIT_FOR_VALIDATION });
  const updateSessionId = (sessionId: string) =>
    dispatch({ type: GrantApplicationActions.UPDATE_SESSION_ID, payload: { sessionId } });

  const updateShowModal = (showModal: boolean) =>
    dispatch({ type: GrantApplicationActions.UPDATE_SHOW_MODAL, payload: { showModal } });

  const updateCanProceedToPrevious = (canProceedToPrevious: boolean) =>
    dispatch({ type: GrantApplicationActions.PROCEED_TO_PREVIOUS, payload: { canProceedToPrevious } });

  return (
    <GrantApplicationContext.Provider
      value={{
        state,
        updateNextTriggered,
        updateProceedToNext,
        updateWaitForValidation,
        updateSessionId,
        updateShowModal,
        updateCanProceedToPrevious,
      }}
    >
      {children}
    </GrantApplicationContext.Provider>
  );
};
