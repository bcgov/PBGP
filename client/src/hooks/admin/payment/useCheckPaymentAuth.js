import React, { useState, useEffect } from 'react'
import { AxiosPrivate } from 'utils';

export const useCheckPaymentAuth = () => {
  const [auth, setAuth] = useState(null)
  const [loadingEnv, setLoadingEnv] = useState(true)
    const checkAuth = async () => {
    try {
      const res = await AxiosPrivate.get(`/api/v2/assessment-portal/payment/config`);
      setAuth(res.data.CAN_UPDATE_PAYMENT_STATUS)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingEnv(false)
    }
  };

  useEffect(() => {
    checkAuth()
  }, [])

  return { auth, loadingEnv }
}

