import { getUserId, useAuthContext } from '@contexts';
import { API_ENDPOINT, AxiosPublic, REQUEST_METHOD } from 'constants/request-methods';
import { ApplicationContext, ApplicationContextType } from 'contexts/Application.Context';
import { useContext, useEffect, useState } from 'react';

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

export const useApplicationContext = () => {
  const userId = getUserId();
  const keycloak = useAuthContext().keycloak;
  const [initialValues, setInitialValues] = useState(initialValuesInit);

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
      setInitialValues(response.data);
    };
    getData();
  }, [applicationId]);

  return { initialValues, setInitialValues };
};
