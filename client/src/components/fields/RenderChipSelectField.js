import React, { Fragment } from 'react';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import { getIn } from 'formik';

import { InputFieldError, InputFieldLabel } from '../generic';

export const RenderChipSelectField = ({
  field: { value, name, onBlur },
  form: { touched, errors, setFieldValue },
  label,
  options,
  placeholder = 'Select...',
  ...props
}) => {
  const error = getIn(errors, name);
  const touch = getIn(touched, name);

  return (
    <Fragment>
      {label && <InputFieldLabel label={label} />}
      <Select
        name={name}
        value={value}
        onChange={(event) => setFieldValue(name, event.target.value)}
        onBlur={onBlur}
        multiple
        fullWidth
        displayEmpty
        variant="outlined"
        MenuProps={{ getContentAnchorEl: null }}
        renderValue={(selected) => selected.length === 0 ? placeholder : selected.map((value) => (
          <Box mx={0.5} key={value} display="inline-block">
            <Chip style={{ cursor: 'pointer' }} label={value} color="primary" />
          </Box>
        ))}
        {...props}
      >
        <MenuItem value="" disabled>{placeholder}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox color="primary" size="small" checked={value.indexOf(option.value) > -1} />
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {touch && !!error && <InputFieldError error={error} />}
    </Fragment>
  );
};
