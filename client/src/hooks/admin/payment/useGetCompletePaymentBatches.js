import  React, { useState, useEffect } from "react";
import { AxiosPrivate , cdtToLocalString} from "utils";
import { useToast, useModal } from "hooks";
import { useHistory } from 'react-router-dom';
import { Route } from 'constants/routes';
import { Button } from 'components/generic';


export function useGetCompletePaymentBatchesMetadata() {
  const history = useHistory();
  const { openToast } = useToast()
  const [completeTableData, setCompleteTableData] = useState({
    rows: [],
    currentPage: 0,
    totalRows: 0,
  });

  const getTableData = async () => {

    try {
      const batchArray = []
      const { data } = await AxiosPrivate.get(`/api/v2/assessment-portal/payment/complete-payment-batches`)

      setCompleteTableData((prevState) => ({
        ...prevState,
          rows: data?.map((item) => ({
          batchId: item.id,
          createdBy: item.createdBy,
          batchName: item.batchName,
          dateCreated:  item.created && cdtToLocalString(item.created, 'YYYY/MM/DD hh:mm A'),
          fundingAmount: item.totalAmount,
          totalApplications: item.totalApplications,
          view: (
            <Button
              text="View"
              variant="outlined"
              size="small"
              onClick={() => history.push(`${Route.AdminPortalPaymentBatchDetailsPage}/${batchId}`)}
            />
          ),
        })),
        totalRows: batchArray.length,
      }));
    } catch (e) {
      openToast({ status: "error", message: "Failed to get complete payment batch meta data" });
    }
  };


  useEffect(() => {
    getTableData();
  }, []);

  return {
    completeTableData,
  };
  }

