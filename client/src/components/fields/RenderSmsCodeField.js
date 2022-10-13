import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { getIn } from 'formik';
import { useTranslation } from "react-i18next";

import { InputFieldLabel, InputFieldError } from '../generic';

export const RenderSmsCodeField = ({
  field: { value, name, onChange, onBlur },
  form: { touched, errors, setFieldValue },
  label,
  placeholder,
  ...props
}) => {
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const { t } = useTranslation();

  return (
    <Fragment>
      {label && <InputFieldLabel label={t(label)} />}
      <TextField
        name={name}
        inputProps={{
          maxLength: 10,
          inputMode: 'numeric',
          pattern: '[0-9]{4,10}',
          "aria-autocomplete": 'one-time-code'
        }}
        variant="outlined"
        autoComplete="one-time-code"
        fullWidth
        error={touch && !!error}
        value={value || ''}
        placeholder={t(placeholder)}
        onChange={onChange}
        onBlur={(event) => {
          setFieldValue(name, event.target.value.trim());
          onBlur(event);
        }}
        {...props}
      />
      {touch && !!error && <InputFieldError error={t(error)} />}
    </Fragment>
  );
};
