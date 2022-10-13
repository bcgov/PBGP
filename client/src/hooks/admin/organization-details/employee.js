import React, { useState } from 'react';
import { AxiosPrivate } from 'utils';
import { OrganizationContext } from "providers";
import { useModal, useToast } from 'hooks';

export const useHandleEmployeeApprove = () => {
  const { closeModal } = useModal();
  const { openToast } = useToast();
  const { organization: { setEmployeeDetails } } = React.useContext(OrganizationContext);
  const [isApproving, setApproving] = useState({ loading: false, indexId: "" });
  const [isDenying, setDenying] = useState({ loading: false, indexId: "" })

  const handleApprove = async (formId, id) => {
    try {
      closeModal()
      setApproving({ loading: true, indexId: id });
      await AxiosPrivate.patch(`/api/v2/assessment-portal/form/${formId}/employee/approve/${id}`);
      setEmployeeDetails((prevState) => {
        const matchingEmployee = prevState.data.employees.find((employee) => employee.indexId === id);
        if (matchingEmployee) matchingEmployee.status = 'approved'; matchingEmployee.statusReason = "";
        return prevState;
      });
      openToast({ status: 'success', message: 'Employee Approved' });
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to submit approval' });
    } finally {
      setApproving({ loading: false, indexId: id });
    }
  }

  const handleDeny = async (formId, id, statusReason) => {
    try {
      closeModal()
      setDenying({ loading: true, indexId: id });
      await AxiosPrivate.patch(`/api/v2/assessment-portal/form/${formId}/employee/deny/${id}`, { statusReason });
      setEmployeeDetails((prevState) => {
        const matchingEmployee = prevState.data.employees.find((employee) => employee.indexId === id);
        if (matchingEmployee) matchingEmployee.status = 'denied'; matchingEmployee.statusReason = statusReason;
        return prevState;
      });
      openToast({ status: 'success', message: 'Employee Denied' });
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to submit denial' });
    } finally {
      setDenying({ loading: false, indexId: id });
    }
  }

  return {
    isApproving,
    isDenying,
    approve: (formId, id) => handleApprove(formId, id),
    deny: (formId, id, statusReason) => handleDeny(formId, id, statusReason)
  }
}

