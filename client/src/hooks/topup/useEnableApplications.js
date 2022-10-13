import React, { useState, useEffect } from 'react'
import { AxiosPrivate } from 'utils';

export const useEnableApplications = () => {
  const [enableApplications, setEnableApplications] = useState(null)
  const [enablePdfExport, setEnablePdfExport] = useState(null)
  const [loadingEnv, setLoadingEnv] = useState(true)

  const checkEnv = async () => {
    try {
      const res = await AxiosPrivate.get(`/api/v1/topup/config`);
      setEnableApplications(res.data.ENABLE_APPLICATIONS)
      setEnablePdfExport(res.data.ENABLE_PDF_EXPORT)
    } catch (e) {
      console.error(e)
    }finally{
      setLoadingEnv(false)
    }
  };

  useEffect(() => {
    checkEnv()
  }, [])

  return { enableApplications, enablePdfExport, loadingEnv }
}

