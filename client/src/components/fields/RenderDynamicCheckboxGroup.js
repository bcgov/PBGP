import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getIn, Field } from 'formik';

import { InputFieldLabel, InputFieldError } from '../generic';
import { PotentialLostIncomeDays } from '../../constants';

export const RenderDynamicCheckboxGroup = ({
  field: { value, name, onChange, onBlur },
  form: { touched, errors, setFieldValue },
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
        {options.map(({ name: fieldName, label, component, options, fieldValue }) => (
          <>
            <FormControlLabel
              key={fieldName}
              name={`${name}.${fieldName}`}
              value={value[fieldName]}
              label={label}
              labelPlacement="end"
              control={<Checkbox color="primary" />}
              checked={value[fieldName] && value[fieldName].checked === true }
              onChange={(e) => setFieldValue(`${name}.${fieldName}.checked`, e.target.checked)}
              onBlur={onBlur}
              disabled={disabled}
            />
            {value[fieldName] && value[fieldName].checked === true && (
              <Grid key={`${fieldName}.${fieldValue}`} item xs={12} md={6} style={{marginLeft: '5%'}}>
                <Field
                  name={`${name}.${fieldName}.${fieldValue}`}
                  component={component}
                  disabled={disabled}
                  options={options}
                  onChange={(e) => setFieldValue(`${name}.${fieldName}.${fieldValue}`, e.target.value)}
                />
              </Grid>
            )}
          </>
        ))}
      </FormGroup>
      {touch && !!error && <InputFieldError error={error} />}
    </Fragment>
  );
};
