import { getUserId, useAuthContext } from '@contexts';
import axios from 'axios';
import { useFormContext } from './useFormContext';
import { useState, useEffect } from 'react';

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
  // maybe move this to context later
  const userId = getUserId();
  const keycloak = useAuthContext().keycloak;

  const [initialValues, setInitialValues] = useState(initialValuesInit);
  const { updateProceedToNext } = useFormContext();
  const [applicationId, setApplicationId] = useState('');

  useEffect(() => {
    const getData = async () => {
      const data = { userId: userId };

      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${keycloak?.idToken}`,
        },
        data,
        url: 'http://localhost:8080/api/v1/applications/in-progress',
      };

      const response = await axios(options);
      setApplicationId(response.data.id);
      setInitialValues(response.data.contactInfo);
    };
    getData();
  }, []);

  const handleSubmit = (values: any) => {
    const patch = async () => {
      const data = { contactInfo: values };
      const url = `http://localhost:8080/api/v1/applications/${applicationId}`;
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${keycloak?.idToken}`,
        },
        data,
        url,
      };

      const response = await axios(options);
    };
    patch();
    updateProceedToNext();
  };

  return { initialValues, handleSubmit };
};
