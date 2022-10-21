import React from 'react';
import { Field } from 'formik';
import { Label } from './Label';

interface InputField {
  name: string;
  children?: React.ReactNode;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel';
}

export const InputField = ({ name, children, placeholder = '', type = 'text' }: InputField) => {
  return (
    <div>
      <Label>{children}</Label>
      <Field name={name} type={type} placeholder={placeholder}></Field>
    </div>
  );
};
