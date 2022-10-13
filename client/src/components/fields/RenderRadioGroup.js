import React, { Fragment } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { getIn } from 'formik';
import { useTranslation } from "react-i18next";

import { InputFieldError, InputFieldLabel } from '../generic';

export const RenderRadioGroup = ({
  field: { value, name, onChange, onBlur },
  form: { touched, errors },
  label,
  disabled,
  options,
  ...props
}) => {
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const { t } = useTranslation();

  return (
    <Fragment>
      {label && <InputFieldLabel label={t(label)} />}
      <RadioGroup name={name} value={value} {...props}>
        {options.map((option) => (
          <>
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={t(option.label)}
            labelPlacement="end"
            control={<Radio color="primary" />}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
          />
          <br/>
          </>
        ))}
      </RadioGroup>
      {touch && !!error && <InputFieldError error={t(error)} />}
    </Fragment>
  );
};
