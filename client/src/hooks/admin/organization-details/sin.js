import React, { useState } from 'react';
import { AxiosPrivate } from 'utils';
import { useModal, useToast } from 'hooks';
import { OrganizationContext } from "providers";

export const useManualSinCheck = () => {
  const { openToast } = useToast()
  const { openModal, closeModal } = useModal();
  const [isRunningSinCheck, setRunningSinCheck] = useState(false)
  const { organization: { refreshData }} = React.useContext(OrganizationContext);

  const showWarningModal = () => {
    openModal({
      title: "This application contains duplicate SIN numbers",
      description: "This organization has multiple employees with the same SIN number. These issues must be resolved with the operator before further duplicate checking can be performed.",
      positiveActionText: 'Ok',
      positiveActionOnClick: () => closeModal(),
    });
  }

  const showSuccessToast = () => {
    openToast({ status: 'success', message: 'Duplicate SIN check is complete' });
  }

  const checkDuplicateSinCheck = async (id) => {
    try {
      setRunningSinCheck(true)
      let res = await AxiosPrivate.post(`/api/v2/assessment-portal/manual-check/${id}`);
      if (res.data === "Status: 204"){
        showWarningModal()
      } else {
        showSuccessToast()
      }
      await refreshData(false);
    } catch (e){
      openToast({ status: 'error', message: e.response?.data?.message || e.message || 'Error running duplicate SIN check' });
    } finally {
      setRunningSinCheck(false)
    }
  }

  return {
    isRunningSinCheck,
    showExportedWarningModal: ()=> showWarningModal(),
    showExportedSuccessToast: ()=> showSuccessToast(),
    handleDuplicateSinCheck: (id) => checkDuplicateSinCheck(id)
  }
}
