import React, { useReducer, createContext } from 'react';

const OPEN = 'OPEN';
const CLOSE = 'CLOSE';

const initialState = {
  isOpen: false,
  title: '',
  description: '',
  negativeActionText: '',
  positiveActionText: '',
  negativeActionOnClick: () => {},
  positiveActionOnClick: () => {},
  disableOnClick: false,
  disableBackdropClick: false,
  disabled: false,
};

function reducer(state, action) {
  switch (action.type) {
    case OPEN:
      return {
        isOpen: true,
        ...action.payload,
      };
    case CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return {
        ...state,
      };
  }
}

export const ModalContext = createContext(initialState);

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOpen = (payload) => dispatch({ type: OPEN, payload });
  const handleClose = () => dispatch({ type: CLOSE });

  const contextValue = {
    handleOpen,
    handleClose,
    state,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
