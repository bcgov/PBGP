import { useContext } from 'react';

import { ModalContext } from '../providers';

export const useModal = () => {
  const { handleOpen, handleClose, state } = useContext(ModalContext);
  return {
    openModal: (payload) => handleOpen(payload),
    closeModal: () => handleClose(),
    state,
  };
};
