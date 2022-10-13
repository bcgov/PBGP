import React, { useState, useEffect } from 'react'
import { AxiosPrivate } from 'utils';
import { useHistory } from 'react-router-dom';
import { useToast } from 'hooks/toast';
import { Route } from 'constants/routes'

export const useSubmitEmployeesPaid = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const history = useHistory();
  const {openToast} = useToast();

  const submitEmployeesPaid = async (formId, employeesPaid) => {
    try {
        setIsSubmitting(true);
        await AxiosPrivate.patch(`/api/v1/topup/form/${formId}/employees-paid`, employeesPaid);

        openToast({ status: 'success', message: 'Confirmation of grant recipients successfully submitted' })
        history.push(Route.Root)
    } finally{
        setIsSubmitting(false);
    }  
  }

  return { submitEmployeesPaid, isSubmitting };
}

