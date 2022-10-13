import React, { useReducer, createContext } from 'react';

const OPEN = 'OPEN';
const CLOSE = 'CLOSE';

const initialState = {
  isOpen: false,
  status: '',
  message: '',
  actionText: '',
  timeout: 6000,
  onActionClick: () => {},
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

export const ToastContext = createContext(initialState);

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOpen = (payload) => dispatch({ type: OPEN, payload });
  const handleClose = () => dispatch({ type: CLOSE });

  const contextValue = {
    handleOpen,
    handleClose,
    state,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};
