import { useContext } from 'react';

import { ToastContext } from '../providers';

export const useToast = () => {
  const { handleOpen, handleClose, state } = useContext(ToastContext);
  return {
    openToast: (payload) => handleOpen(payload),
    closeToast: () => handleClose(),
    state,
  };
};
