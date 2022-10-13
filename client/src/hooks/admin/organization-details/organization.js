import React, { useState } from "react";
import { AxiosPrivate } from "utils";
import { OrganizationContext } from "providers";
import { useModal, useToast } from "hooks";

export const useHandleOrganizationApprove = () => {
  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();
  const { organization: { setOrganizationDetails } } = React.useContext(OrganizationContext);
  const [isApproveLoading, setApproveLoading] = useState(undefined)
  const [isDenyLoading, setDenyLoading] = useState(undefined)
  const [isRequestInfoLoading, setRequestInfoLoading] = useState(undefined)

  const handleApprove = async (id) => {
    try {
      closeModal()
      setApproveLoading(true);
      await AxiosPrivate.patch(`/api/v2/assessment-portal/form/approve/${id}`);
      setOrganizationDetails((prevState) => ({ ...prevState, status: "validated" }));
      openToast({ status: 'success', message: 'Organization Information Validated' });
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to validate Organization Information' });
    } finally {
      setApproveLoading(false);
    }
  }
  const handleDeny = async (id) => {
    try {
      closeModal()
      setDenyLoading(true);
      await AxiosPrivate.patch(`/api/v2/assessment-portal/form/deny/${id}`);
      setOrganizationDetails((prevState) => ({ ...prevState, status: "denied" }));
      openToast({ status: 'success', message: 'Organization Information Not Validated' });
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to submit application denial' });
    } finally {
      setDenyLoading(false);
    }
  }
  const handleRequestInfo = async (id) => {
    try {
      closeModal()
      setRequestInfoLoading(true);
      await AxiosPrivate.patch(`/api/v2/assessment-portal/form/information/${id}`);
      setOrganizationDetails((prevState) => ({ ...prevState, status: "needs information" }));
      openToast({ status: 'success', message: 'Marked as: Needs Information' });
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to submit status update' });
    } finally {
      setRequestInfoLoading(false);
    }
  }

  return {
    isApproveLoading,
    isDenyLoading,
    isRequestInfoLoading,
    approve: (id, status = 'approved') => openModal({
      title: 'Are you Sure?',
      description: `Are you sure you want to approve this information?`,
      negativeActionText: 'No',
      positiveActionText: 'Yes',
      positiveActionOnClick: () => handleApprove(id, status),
      negativeActionOnClick: () => closeModal(),
    }),
    validate: (id, status = 'validated') => openModal({
      title: 'Are you Sure?',
      description: `Are you sure you want to validate this information?`,
      negativeActionText: 'No',
      positiveActionText: 'Yes',
      positiveActionOnClick: () => handleApprove(id, status),
      negativeActionOnClick: () => closeModal(),
    }),
    deny: (id) => openModal({
      title: 'Are you Sure?',
      description: `Are you sure you want to deny this form?`,
      negativeActionText: 'No',
      positiveActionText: 'Yes',
      positiveActionOnClick: () => handleDeny(id),
      negativeActionOnClick: () => closeModal(),
    }),
    information: (id) => openModal({
      title: 'Are you Sure?',
      description: `Request more information?`,
      negativeActionText: 'No',
      positiveActionText: 'Yes',
      positiveActionOnClick: () => handleRequestInfo(id),
      negativeActionOnClick: () => closeModal(),
    })
  }
}

export const useHandleSubmitAddictions = () => {
  const { openToast } = useToast();
  const { openModal, closeModal } = useModal();
  const { organization: { refreshData } } = React.useContext(OrganizationContext);
  const [isAddictionsAmountLoading, setAddictionsAmountLoading] = useState(undefined)

  const handleSubmitAddictionsAmount = async (id, amount) => {
    const paymentAmount = parseFloat(amount)
    try {
      closeModal()
      setAddictionsAmountLoading(true);
      await AxiosPrivate.post(`/api/v2/assessment-portal/updatepayment/${id}`, {amount: paymentAmount});
      await refreshData(false);
      openToast({ status: 'success', message: 'Payment Amount Submitted' });
    } catch (e){
      openToast({ status: 'error', message: e.message || 'Failed to submit' });
    } finally {
      setAddictionsAmountLoading(false);
    }
  }

  return {
    isAddictionsAmountLoading,
    submitAddictionsAmount: (id, amount) => {
      openModal({
        title: 'Verify Total Amount',
        description: `Are you ready to submit?`,
        negativeActionText: 'No',
        positiveActionText: 'Yes, submit now.',
        negativeActionOnClick: () => closeModal(),
        positiveActionOnClick: () => handleSubmitAddictionsAmount(id, amount),
      });
    },
  }
}