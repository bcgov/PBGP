import { createContext, useReducer } from 'react';

export interface ModalInterface {
  isOpen: boolean;
  title: string;
  children: any;
  cancelButton: boolean;
  closeCallback: any;
  positiveActionText?: string;
  positiveActionOnClick?: () => void;
}

export interface ModalContextType {
  openModal: (payload: Partial<ModalInterface>) => any;
  closeModal: () => any;
  state: ModalInterface;
}

const OPEN = 'OPEN';
const CLOSE = 'CLOSE';

const initialState: ModalInterface = {
  isOpen: false,
  title: '',
  children: '',
  cancelButton: false,
  closeCallback: null,
};

function modalReducer(state: ModalInterface, action: any) {
  switch (action.type) {
    case OPEN:
      return {
        ...initialState,
        isOpen: true,
        ...action.payload,
        tabIndex: 0,
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

const ModalContext = createContext<any>(initialState);

const ModalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const handleOpen = (payload: ModalInterface) => dispatch({ type: OPEN, payload });
  const handleClose = () => dispatch({ type: CLOSE });

  return (
    <ModalContext.Provider value={{ state, handleOpen, handleClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
