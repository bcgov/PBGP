import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getIn } from 'formik';
import { useTranslation } from "react-i18next";

import { InputFieldError, InputFieldLabel } from '../generic';

export const RenderAutocompleteField = ({
  field: { value, name, onChange, onBlur },
  form: { touched, errors, setFieldValue },
  label,
  options,
  placeholder,
  ...props
}) => {
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const { t } = useTranslation();
  
  return (
    <Fragment>
      {label && <InputFieldLabel label={t(label)} />}
      <Autocomplete
        inputValue={value || ''}
        options={options}
        freeSolo
        onInputChange={(event, newInputValue) => {
          setFieldValue(name, newInputValue || value);
        }}
        disableClearable
        autoHighlight
        onBlur={onBlur}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            autoComplete={'off'}
            name={name}
            onChange={onChange}
            placeholder={t(placeholder)}
            error={touch && !!error}
            variant="outlined"
            fullWidth
            inputProps={{ ...params.inputProps, form: { autoComplete: 'off' } }}
            onBlur={(event) => {
              setFieldValue(name, event.target.value.trim());
              onBlur(event);
            }}
          />
        )}
        {...props}
      />
      {touch && !!error && <InputFieldError error={t(error)} />}
    </Fragment>
  );
};
