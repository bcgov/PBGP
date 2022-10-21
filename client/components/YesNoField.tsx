import React from 'react';
import { Field } from 'formik';
import { Label } from './Label';

interface InputField {
  name: string;
  children?: React.ReactNode;
}

export const YesNoField = ({ name, children }: InputField) => {
  return (
    <div>
      <Label>{children}</Label>
      <div>
        <label>
          <Field type='radio' name={name} value='yes' />
          Yes
        </label>
        <label>
          <Field type='radio' name={name} value='no' />
          No
        </label>
      </div>
    </div>
  );
};
