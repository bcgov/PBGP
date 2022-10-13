import React, { Fragment } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getIn } from 'formik';
import { InputFieldError } from '../generic';

export const RenderCheckbox = ({
  field: { value, name, onChange, onBlur },
  form: { touched, errors },
  label,
  ...props
}) => {
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  return (
    <Fragment>
      <FormControlLabel
        name={name}
        value={value}
        label={label}
        labelPlacement='end'
        control={<Checkbox color='primary' />}
        checked={value === true}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      {touch && !!error && <InputFieldError error={error} />}
    </Fragment>
  );
};
