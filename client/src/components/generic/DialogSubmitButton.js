import React from 'react';
import { Button } from './Button';
import { useFormikContext } from 'formik';


export const DialogSubmitButton = ({ isEligible }) => {
  const { submitForm } = useFormikContext();

  return (
    <Button text={!isEligible ? "Verify Eligibility" : "Submit"} onClick={() => submitForm()} />
  )
}