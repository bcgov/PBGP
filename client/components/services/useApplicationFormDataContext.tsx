import { getUserId, useAuthContext } from '@contexts';
import { API_ENDPOINT, AxiosPublic, REQUEST_METHOD } from 'constants/request-methods';
import {
  ApplicationFormDataContext,
  ApplicationFormDataContextType,
} from 'contexts/ApplicationFormData.context';
import { useContext, useEffect, useState } from 'react';

const initialValues = {
  contactInfo: {
    facilityName: '',
    applicantName: '',
    primaryContactName: '',
    phoneNumber: '',
    mailingAddress: '',
    mailingAddressPostalCode: '',
    isOneApplication: '',
    priority: '',
  },
};

export const useApplicationFormDataContext = () => {
  const userId = getUserId();
  const { keycloak } = useAuthContext();
  const [applicationValues, setApplicationValues] = useState(initialValues);

  const { applicationId } = useContext(
    ApplicationFormDataContext
  ) as ApplicationFormDataContextType;
  useEffect(() => {
    const getData = async () => {
      if (!applicationId) return;
      const data = { userId: userId };

      const options = {
        method: REQUEST_METHOD.GET,
        token: keycloak?.idToken,
        data,
        endpoint: API_ENDPOINT.APPLICATION_ID(applicationId),
      };

      const response = await AxiosPublic(options);
      setApplicationValues(response.data);
    };
    getData();
  }, [applicationId]);

  return { applicationId, applicationValues, setApplicationValues };
};
