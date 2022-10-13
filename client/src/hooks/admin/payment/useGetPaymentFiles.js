import  React, { useState, useEffect } from "react";
import { AxiosPrivate, cdtToLocalString } from "utils";
import { useToast, useModal } from "hooks";
import { useHistory} from 'react-router-dom';
import { Route } from 'constants/routes';
import { Button } from 'components/generic';


import { useParams } from 'react-router';
import { numberFormat } from "utils/numberFormat";
export function useGetPaymentFiles() {
  const history = useHistory();
  const { openToast } = useToast()
  const [isDownloadingIndividualFile, setDownloadingIndividualFile] = useState(undefined);
  const [paymentFilesTableData, setPaymentFilesTableData] = useState({
    rows: [],
    currentPage: 0,
    totalRows: 0,
  });
  const {id} = useParams()
  const getTableData = async () => {

    try {

      const { data } = await AxiosPrivate.get(`/api/v2/assessment-portal/payment/payment-file/${id}`)

      setPaymentFilesTableData((prevState) => ({
        ...prevState,
          rows: data?.map((item) => ({
          fileName: item.fileName,
          fileType: item.type,
          dateCreated: item.paymentFileCreated && cdtToLocalString(item.paymentFileCreated,'YYYY/MM/DD hh:mm A'),
          totalFundingAmount: `$${numberFormat(item.totalAmount)}`,
          totalApplications: item.totalApplications,
          download: (
            <Button
              text="Download"
              variant="outlined"
              size="small"
              onClick={() => downloadIndividualFile(item.type)}
            />
          ),
        })),
        totalRows: data?.length,
      }));
    } catch (e) {
      openToast({ status: "error", message: "Failed to get complete payment batch meta data" });
    }
  };
  const downloadIndividualFile = async(fileType) => {
    try {
      setDownloadingIndividualFile(true)
      const response = await AxiosPrivate.get(`/api/v2/assessment-portal/payment/payment-file/download/${id}/${fileType}`);
      const link = document.createElement('a');
      link.setAttribute('href', 'data:application/octet-stream;charset=utf-8;base64,'+response.data.file);
      link.setAttribute('download', response.data.fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      openToast({ status: 'error', message: `Failed to download file batch ${id} ${fileType} file` });
    } finally {
      setDownloadingIndividualFile(false)
    }
  }

  useEffect(() => {
    getTableData();
  }, []);

  return {
    paymentFilesTableData,
  };
  }

