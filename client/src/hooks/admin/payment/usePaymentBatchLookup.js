import { Button } from "../../../components/generic";
import React, { useState, useEffect } from "react";
import { AxiosPrivate } from "../../../utils";
import { useHistory } from "react-router-dom";
import { Route } from "../../../constants/routes";
import { useToast, useModal } from "hooks";
import { numberFormat } from "utils/numberFormat";

export const usePaymentBatchLookup = (batchId) => {
  const history = useHistory();
  const { openToast } = useToast();
  const [tableData, setTableData] = useState([]);
  const [batchDetails, setBatchDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(undefined);
  const [edit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const { openModal, closeModal } = useModal()
  const [paymentFilesFlag, setPaymentFilesflag]=useState(null)
  
  const handleSetTableData = (results) => {
    setTableData((prevState) => ({
      ...prevState,
      count: results?.length,
      rows: results?.map(
        ({ id, name, confirmationNumber, submissionType, totalPaymentAmount, organizationId, paymentStatus }) => ({
          id,
          organizationName: name,
          confirmationNumber,
          benefitType: submissionType,
          fundingAmount: `$${numberFormat(totalPaymentAmount)}`,
          paymentStatus: paymentStatus,
          viewOrg: (
            <Button
              text="View"
              variant="outlined"
              size="small"
              style={{ color: "primary" }}
              onClick={() =>
                history.push(`${Route.AdminPortalOrganizationDetails}/${organizationId}`)
              }
            />
          ),
        })
      ),
    }));
  };

const refreshTableData = async () => {
    try {
      setIsFetching(true);
      const {data} = await (await AxiosPrivate.get(`/api/v2/assessment-portal/payment/batch-details/${batchId}`))
      setPaymentFilesflag(data.hasFiles)
      const batchDetails = data      
      setIsError(false);
      batchDetails.isActive && batchDetails.status === 'open' && !batchDetails.flag && setEdit(true);
      handleSetTableData(batchDetails.organizations);
      setBatchDetails(batchDetails);
    } catch (e) {
      openToast({ status: "error", message: e.message || "Failed to get data" });
      setIsError(true);
    }finally{
        setIsFetching(false);
    }
}
  useEffect(() => {
    (async ()=>{
      refreshTableData()
    })()
  }, []);

  const cancelActivePaymentBatch = async() => {
    try {
      await AxiosPrivate.patch(`/api/v2/assessment-portal/payment/cancel-payment-batch/${batchId}`)
      openToast({
        status: "success",
        message: "Active payment batch cancelled",
      });
      closeModal()
      setEdit(false)
      history.go(0)
    } catch (e) {
      openToast({
        status: "error",
        message: "Failed to cancel active payment batch",
      });
    }
    
  };

  const removeFromBatch = async () => {
    const ids = selectedRow?.map((row) => row.id);
    try {
      const { organizations } = await (await AxiosPrivate.patch(`/api/v2/assessment-portal/payment/batch-details`, { formIds: ids , batchId: +batchId })).data;
      handleSetTableData(organizations);
      setSelectedRow(null)
      openToast({
        status: "success",
        message: "Successfully removed applications from batch.",
      });

    } catch (e) {
      openToast({
        status: "error",
        message: e.message || "Failed to remove applications",
      });
    }
  };

  const createPaymentFiles = async() => {
    const id = batchId
    try {
      await AxiosPrivate.post(`/api/v2/assessment-portal/payment/generate-payment-files/${id}`);
      openToast({ status: 'success', message: "Payment file successfully generated." });
      closeModal();
      setBatchDetails((prevState) => ({
        ...prevState,
        status: 'ready',
      }));
      history.go(0);
    } catch (e) {
      openToast({ status: 'error', message:  "Failed to generate payment files" });
    }
  }

  return {
    tableData,
    batchDetails,
    isFetching,
    isError,
    removeFromBatch,
    edit,
    selectedRow,
    generatePaymentFiles: async () => openModal({
      title: 'Generate Files',
      description: `Payment files can only be generated once per batch. Would you like to continue?`,
      disableOnClick: true,
      negativeActionText: 'Cancel',
      positiveActionText: 'Continue',
      negativeActionOnClick: () => closeModal(),
      positiveActionOnClick: () => createPaymentFiles(),
    }),
    onCancelPaymentBatch: () => openModal({
      title: 'Confirm Cancellation',
      description: `Are you sure you want to cancel the active payment batch?`,
      negativeActionText: 'Cancel',
      positiveActionText: 'Yes, Continue',
      negativeActionOnClick: () => closeModal(),
      positiveActionOnClick: () => cancelActivePaymentBatch()
    }),
    setSelectedRow,
  };
};
