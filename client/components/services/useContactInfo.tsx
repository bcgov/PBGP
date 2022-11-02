import { useAuthContext } from '@contexts';
import { useGrantApplication } from './useGrantApplicationContext';
import { useState, useEffect } from 'react';
import { API_ENDPOINT, AxiosPublic, REQUEST_METHOD } from 'constants/request-methods';
import { useApplicationFormDataContext } from './useApplicationFormDataContext';

export const useContactInfo = () => {
  const keycloak = useAuthContext().keycloak;
  const { applicationValues, applicationId } = useApplicationFormDataContext();
  const [contactInfoValues, setContactInfoValues] = useState(applicationValues.contactInfo);
  const { updateProceedToNext } = useGrantApplication();

  useEffect(() => {
    setContactInfoValues(applicationValues.contactInfo);
  }, [applicationValues.contactInfo]);

  const handleSubmit = (values: any) => {
    const patch = async () => {
      const data = { contactInfo: values };

      const options = {
        method: REQUEST_METHOD.PATCH,
        token: keycloak?.idToken,
        data,
        endpoint: API_ENDPOINT.APPLICATION_ID(applicationId),
      };

      await AxiosPublic(options);
    };
    patch();
    updateProceedToNext();
  };

  return { contactInfoValues, handleSubmit };
};
