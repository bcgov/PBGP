import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { REQUEST_METHOD } from '../constants';
import { toast } from 'react-toastify';
import { useKeycloak } from '@react-keycloak-fork/ssr';

type HttpReturn = {
  sendApiRequest: any;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  fetchData: any;
};

axios.interceptors.response.use(
  response => response?.data,
  error => Promise.reject(error),
);

export const useHttp = (): HttpReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { keycloak } = useKeycloak();

  const errorHandler = (err: any) => {
    let errorMessage = err?.response?.data?.message ?? 'Error fetching data';
    if (err?.response?.status === 401) {
      keycloak?.logout();
      errorMessage = 'You are not authorized! Kindly contact admin!';
    } else if (err?.response?.status === 400) {
      errorMessage = 'Kindly verify the input';
    }

    toast.error(errorMessage);
  };

  const fetchData = useCallback(async (requestConfig: any, handleData: any) => {
    const configOptions: AxiosRequestConfig = {
      method: REQUEST_METHOD.GET,
      params: requestConfig?.params,
      data: requestConfig?.data,
    };
    try {
      setIsLoading(true);
      const response = await axios(requestConfig.endpoint, configOptions);
      handleData(response);
    } catch (err: any) {
      errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendApiRequest = async (requestConfig: any, handleData: any) => {
    const configOptions = {
      method: requestConfig.method,
      body: requestConfig?.body,
      params: requestConfig?.params,
      data: requestConfig?.data,
    };
    setIsLoading(true);
    try {
      const res = await axios(requestConfig.endpoint, configOptions);
      handleData(res);
    } catch (err: any) {
      errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendApiRequest,
    setIsLoading,
    isLoading,
    fetchData,
  };
};
