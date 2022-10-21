import React from 'react';
import { Field } from 'formik';
import { Label } from './Label';

interface InputField {
  name: string;
  children?: React.ReactNode;
  placeholder?: string;
  options?: { value: string; text: string }[];
}

export const DropdownField = ({
  name,
  children,
  options = [{ value: 'placeholder', text: 'Placeholder' }],
}: InputField) => {
  return (
    <div>
      <Label>{children}</Label>
      <Field name={name} as='select'>
        {options.map((option) => (
          <option value={option.value}>{option.text}</option>
        ))}
      </Field>
    </div>
  );
};
