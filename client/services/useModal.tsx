import { useContext } from 'react';
import { ModalContext, ModalContextType, ModalInterface } from '../contexts';

export const useModal = (): ModalContextType => {
  const { handleOpen, handleClose, state } = useContext(ModalContext);
  return {
    openModal: (payload: Partial<ModalInterface>) => {
      handleOpen(payload);
    },
    closeModal: () => handleClose(),
    state,
  };
};
