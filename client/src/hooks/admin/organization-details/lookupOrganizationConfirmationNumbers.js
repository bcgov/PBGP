import React, { useState } from 'react';
import { AxiosPrivate } from 'utils';

export const useHandleLookupConfirmationNumbers = () => {
    const [isFetching, setFetching] = useState(false)
    const [confirmationNumbers, setConfirmationNumbers] = useState({});

  const lookupOrganizationConfirmationNumbers = async (confirmationNumbers) => {
      setFetching(true);
      try {
        const {data} = await AxiosPrivate.post(`/api/v2/assessment-portal/organization-confirmation-numbers`, confirmationNumbers);
        setConfirmationNumbers(data.reduce((r, c) => {
          r[c.confirmationNumber] = c;

          return r;
        }, {}));

      } finally {
        setFetching(false);
      } 
  }

  return {
    isFetching,
    confirmationNumbers,
    lookupOrganizationConfirmationNumbers
  }
}
