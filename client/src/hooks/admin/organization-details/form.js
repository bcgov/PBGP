import React, { useState } from 'react';
import { AxiosPrivate } from 'utils';
import { useToast } from 'hooks';

export const useHandleLockUnlockForm = () => {
  const { openToast } = useToast();
  const [isFetching, setFetching] = useState(false)

  const handleLock = async (operatorDetailsOrEmployeeDetailsId) => {
    try {
      setFetching(true);
      await AxiosPrivate.patch(`/api/v2/assessment-portal/form/lock/${operatorDetailsOrEmployeeDetailsId}`);
      openToast({ status: 'success', message: 'Form Locked' });
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to lock form' });
    } finally {
      setFetching(false);
    }
  }

  const handleUnlock = async (operatorDetailsOrEmployeeDetailsId) => {
    try {
      setFetching(true);
      await AxiosPrivate.patch(`/api/v2/assessment-portal/form/unlock/${operatorDetailsOrEmployeeDetailsId}`);
      openToast({ status: 'success', message: 'Form Unlocked' });
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to unlock form' });
    } finally {
      setFetching(false);
    }
  }

  return {
    isFetching,
    lock: (operatorDetailsOrEmployeeDetailsId) => handleLock(operatorDetailsOrEmployeeDetailsId),
    unlock: (operatorDetailsOrEmployeeDetailsId) => handleUnlock(operatorDetailsOrEmployeeDetailsId)
  }
}
