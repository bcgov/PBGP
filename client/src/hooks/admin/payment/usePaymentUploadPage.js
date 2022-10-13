import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Route } from 'constants/routes'
import { AxiosPrivate, serializeTopupFormValues } from 'utils'
import { useToast } from 'hooks'
import { Button } from 'components/generic'
import {cdtToLocalString} from 'utils'

export const usePaymentUploadPage = () => {
  const [isFetching, setFetching] = useState(false)

  const { t } = useTranslation()
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const { id } = useParams()

  const { openToast } = useToast()
  const [isDownloadingIndividualFile, setDownloadingIndividualFile] = useState(undefined);

  const [tableData, setTableData] = useState({
    rows: [],
    currentPage: 0,
    totalRows: 0,
  })
  const downloadXLS = async (fileId) => {
    try {
      setDownloadingIndividualFile(true)
      const response = await AxiosPrivate.get(`/api/v2/assessment-portal/payment/download-payment-xls/${fileId}`)
      const link = document.createElement('a');
      link.setAttribute('href', JSON.parse(response.data.file));
      link.setAttribute('download', `payment_file.${fileId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      openToast({ status: 'error', message: `Failed to download file` });
    } finally {
      setDownloadingIndividualFile(false)
    }
  }


  const getUploadedFiles = async () => {
    try {
      const { data } = await AxiosPrivate.get(`/api/v2/assessment-portal/payment/upload-payment-xls/${id}`)
      setTableData((prevState) => ({
        ...prevState,
        rows:
          data &&
          data.map((item) => ({
            file: `payment_file.${item.id}.xlsx`,
            fileId: item.id,
            agentName: item.agentName,
            created: cdtToLocalString(item.created,'YYYY/MM/DD hh:mm A'),
            download: <Button text="Download" onClick={() => downloadXLS(item.id)} />
          })),
        totalRows: data.length,
      }))
    } catch (e) {
      openToast({ status: 'error', message: `Failed to get files` });
    }
  }

  useEffect(() => {
    getUploadedFiles()
  }, [])
  return {
    isFetching,
    buttonDisabled,
    tableData,
    submit: async (values) => {
      const { fileData, rawData } = values

      const extractedFileData = fileData.map(app => {
        return {
          form_id: parseInt(app.reference),
          document_number: app.document_number,
          document_date: app.document_date,
          vendor_account: app.vendor_account_name_1,
          amount: parseFloat(app.company_code_currency_value.replace(/[,]+/g, ''))
        }
      })
      try {
        setFetching(true);
        //parse the data here - extract the data needed, pass in values required from dto, and pass base64
        await AxiosPrivate.post(`/api/v2/assessment-portal/payment/upload-payment-xls/${id}`, { applications: extractedFileData, file: rawData.toString() });
        openToast({ status: 'success', message: t("Payment file successfully submitted.") });
        setButtonDisabled(true)
        setFetching(false)
        window.location.reload()
      } catch (e) {
        openToast({ status: 'error', message: e.message || t("Failed to submit form") });
      } finally {
        setFetching(false);

      }
    }
  }
};


