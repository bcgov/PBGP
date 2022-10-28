import { createContext, useReducer } from 'react';

export interface FormContextStateProps {
  isNextTriggered: boolean;
  canProceedToNext: boolean;
}

const initialState: FormContextStateProps = {
  isNextTriggered: false,
  canProceedToNext: false,
};

export type PlanningContextType = {
  state: FormContextStateProps;
  updateNextTriggered: () => void;
  updateProceedToNext: () => void;
};

const enum FormActions {
  NEXT_TRIGGERED = 'NEXT_TRIGGERED',
  PROCEED_TO_NEXT = 'PROCEED_TO_NEXT',
}

function reducer(state: any, action: any): FormContextStateProps {
  switch (action.type) {
    case FormActions.NEXT_TRIGGERED:
      return {
        ...state,
        isNextTriggered: true,
        canProceedToNext: false,
      };
    case FormActions.PROCEED_TO_NEXT:
      return {
        ...state,
        isNextTriggered: false,
        canProceedToNext: true,
      };
    default:
      return {
        ...state,
      };
  }
}

export interface FormContextType {
  state: FormContextStateProps;
  updateNextTriggered: () => void;
  updateProceedToNext: () => void;
}

export const FormContext = createContext<FormContextType | null>(null);

export const FormProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateNextTriggered = () => dispatch({ type: FormActions.NEXT_TRIGGERED });
  const updateProceedToNext = () => dispatch({ type: FormActions.PROCEED_TO_NEXT });

  return (
    <FormContext.Provider
      value={{
        state,
        updateNextTriggered,
        updateProceedToNext,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
