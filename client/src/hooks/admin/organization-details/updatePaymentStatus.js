import React, { useState } from "react";
import { AxiosPrivate } from "utils";
import { OrganizationContext } from "providers";
import { useModal, useToast } from "hooks";
import { useHistory } from "react-router";

export const useUpdatePaymentStatus = () => {
  const { openToast } = useToast();
  const { openModal, closeModal } = useModal();
  const [
    isUpdatePaymentStatusLoading,
    setIsUpdatePaymentStatusLoading,
  ] = useState(undefined);
  const history = useHistory();

  const handleSubmitPaymentStatus = async (id, status, type, setStatus) => {
    try {
      closeModal();
      setIsUpdatePaymentStatusLoading(true);
      await AxiosPrivate.post(
        `/api/v2/assessment-portal/update-payment-status/${id}`,
        { paymentStatus: status, submissionType: type }
      );
      openToast({ status: "success", message: "Payment Status Updated" });
      // setStatus(status)
      history.go(0)
    } catch (e) {
      openToast({ status: "error", message: e.message || "Failed to update" });
    } finally {
      setIsUpdatePaymentStatusLoading(false);
    }
  };

  const description = (prevStatus, nextStatus) => {
    return (
      <span
        style={{
          display:"block",
          backgroundColor: "#FBCBC9",
          margin: "10px",
          padding: "10px",
        }}
      >
        Please confirm that you wish to change the payment status of this
        benefit application. This may trigger follow up actions for the operator
        or affect how the benefit is seen on the dashboard
        <br/><span style={{color: "red"}}>Updating From {prevStatus} to {nextStatus}</span>
      </span>
    );
  };

  return {
    isUpdatePaymentStatusLoading,
    submitPaymentStatus: (id, status, type, resetForm, initialState) => {
      openModal({
        title: `Payment Status Update`,
        description: description(initialState, status),
        negativeActionText: "Back",
        positiveActionText: "Confirm",
        negativeActionOnClick: () => {
          resetForm();
          closeModal();
        },
        positiveActionOnClick: () =>
          handleSubmitPaymentStatus(id, status, type),
        checkboxText: "Hello there",
        positiveButtonVariant: "contained",
      });
    },
  };
};
