import React, { Fragment } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { getIn } from 'formik';
import clsx from 'clsx';

import { InputFieldError, Button } from '../generic';

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '16px',
    boxShadow: 'none !important',
  },
  buttonError: {
    borderColor: `${theme.palette.error.main} !important`,
  },
}));

export const RenderButtonGroup = ({
  field: { value, name },
  form: { touched, errors, setFieldValue, setFieldTouched },
  options,
  ...props
}) => {
  const classes = useStyles();
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  return (
    <Fragment>
      <ButtonGroup
        fullWidth
        orientation="vertical"
        color="primary"
        onBlur={() => setFieldTouched(name, true)}
        {...props}
      >
        {options.map((option) => (
          <Button
            key={option.value}
            className={clsx(classes.button, { [classes.buttonError]: touch && !!error })}
            onClick={() => setFieldValue(name, option.value)}
            variant={option.value === value ? 'contained' : 'outlined'}
            text={option.label}
          />
        ))}
      </ButtonGroup>
      {touch && !!error && <InputFieldError error={error} />}
    </Fragment>
  );
};
