import { getUserId, useAuthContext } from '@contexts';
import axios from 'axios';
import { useFormContext } from './useFormContext';
import { useState, useEffect, useContext } from 'react';
import { ApplicationContext, ApplicationContextType } from 'contexts/Application.Context';
import { API_ENDPOINT, AxiosPublic, REQUEST_METHOD } from 'constants/request-methods';

const initialValuesInit = {
  facilityName: '',
  applicantName: '',
  primaryContactName: '',
  phoneNumber: '',
  mailingAddress: '',
  mailingAddressPostalCode: '',
  isOneApplication: '',
  priority: '',
};

export const useContactInfo = () => {
  const userId = getUserId();
  const keycloak = useAuthContext().keycloak;

  const [initialValues, setInitialValues] = useState(initialValuesInit);
  const { updateProceedToNext } = useFormContext();
  const { applicationId } = useContext(ApplicationContext) as ApplicationContextType;

  useEffect(() => {
    const getData = async () => {
      if (!applicationId) return;
      const data = { userId: userId };

      const options = {
        method: REQUEST_METHOD.GET,
        token: keycloak?.idToken,
        data,
        endpoint: API_ENDPOINT.applicationId(applicationId),
      };

      const response = await AxiosPublic(options);
      setInitialValues(response.data.contactInfo);
    };
    getData();
  }, [applicationId]);

  const handleSubmit = (values: any) => {
    const patch = async () => {
      const data = { contactInfo: values };

      const options = {
        method: REQUEST_METHOD.PATCH,
        token: keycloak?.idToken,
        data,
        endpoint: API_ENDPOINT.applicationId(applicationId),
      };

      const response = await AxiosPublic(options);
    };
    patch();
    updateProceedToNext();
  };

  return { initialValues, handleSubmit };
};
