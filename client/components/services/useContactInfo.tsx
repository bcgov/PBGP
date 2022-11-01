import { useAuthContext } from '@contexts';
import { useFormContext } from './useFormContext';
import { useState, useEffect } from 'react';
import { API_ENDPOINT, AxiosPublic, REQUEST_METHOD } from 'constants/request-methods';
import { useApplicationContext } from './useApplicationContext';

export const useContactInfo = () => {
  const keycloak = useAuthContext().keycloak;
  const ApplicationContext = useApplicationContext();
  const [initialValues, setInitialValues] = useState(ApplicationContext.initialValues.contactInfo);
  const { updateProceedToNext } = useFormContext();

  useEffect(() => {
    setInitialValues(ApplicationContext.initialValues.contactInfo);
  }, [ApplicationContext.initialValues.contactInfo]);

  const handleSubmit = (values: any) => {
    const patch = async () => {
      const data = { contactInfo: values };

      const options = {
        method: REQUEST_METHOD.PATCH,
        token: keycloak?.idToken,
        data,
        endpoint: API_ENDPOINT.applicationId(ApplicationContext.applicationId),
      };

      await AxiosPublic(options);
    };
    patch();
    updateProceedToNext();
  };

  return { initialValues, handleSubmit };
};
