import React, { Fragment } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getIn } from 'formik';

import { InputFieldLabel, InputFieldError } from '../generic';

export const RenderCheckboxGroup = ({
  field: { value, name, onChange, onBlur },
  form: { touched, errors },
  label,
  disabled,
  options,
  ...props
}) => {
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  return (
    <Fragment>
      {label && <InputFieldLabel label={label} />}
      <FormGroup {...props}>
        {options.map(({ name: fieldName, label }) => (
          <FormControlLabel
            key={fieldName}
            name={`${name}.${fieldName}`}
            value={value[fieldName]}
            label={label}
            labelPlacement="end"
            control={<Checkbox color="primary" />}
            checked={value[fieldName] === true}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
          />
        ))}
      </FormGroup>
      {touch && !!error && <InputFieldError error={error} />}
    </Fragment>
  );
};
