import React, { useState } from "react";
import { AxiosPrivate } from "utils";
import { OrganizationContext } from "providers";
import { useToast } from "hooks";

export const useHandleOperatorApprove = () => {
  const { openToast } = useToast();
  const { organization: { refreshData, operatorDetails } } = React.useContext(OrganizationContext);
  const [isApproving, setApproving] = useState({ loading: false, type: "", index: null });
  const [isDenying, setDenying] = useState({ loading: false, type: "", index: null });

  const handleApproveOrDeny = async (type, index, formID, determination, status, setFieldValue) => {
    try {
      if (determination) setApproving({ loading: true, type, index });
      else setDenying({ loading: true, type, index });
      await AxiosPrivate.patch(`/api/v2/assessment-portal/form/${formID}/operator/${determination ? "approve" : "deny"}`, { type, index });

      const matchingOperator = type === "home_care" ? operatorDetails.data.home_care : operatorDetails.data[type][index];
      matchingOperator.status = determination ? "approved" : "denied";
      setFieldValue(`${type}[${index}]`, matchingOperator);

      openToast({ status: 'success', message: `Form ${determination ? 'approved' : 'denied'} successfully` });
      //we only want to call this if the button has no previous status. Buttons with no previous status are not updating the UI properly without a page refresh.
      !status && await refreshData(false)
    } catch (e) {
      openToast({ status: 'error', message: e.message || 'Failed to update form' });
    } finally {
      if (determination) setApproving({ loading: false, type, index });
      else setDenying({ loading: false, type, index });
    }
  }

  return {
    isApproving,
    isDenying,
    approveOrDeny: (...args) => handleApproveOrDeny(...args),
  }
}