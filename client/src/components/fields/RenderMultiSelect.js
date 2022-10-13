import React, { Fragment } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip'
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import { getIn } from 'formik';
import { useTranslation } from "react-i18next";
import ListSubheader from '@material-ui/core/ListSubheader';

import { InputFieldError, InputFieldLabel } from '../generic';
import { Input } from '@material-ui/core';

export const RenderMultiSelect = ({
  field: { value, name, onChange, onBlur },
  form: { touched, errors, setFieldTouched },
  label,
  options,
  ...props
}) => {
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const { t } = useTranslation();

  return (
    <Fragment>
      {label && <InputFieldLabel label={t(label)} />}
      <Select
        name={name}
        fullWidth
        multiple
        variant="outlined"
        input={<Input />}
        // inputProps={{ displayEmpty: true, onClose: () => setFieldTouched(name, true) }}
        error={touch && !!error}
        value={value || []}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
        renderValue={(selected) => (
          <div >
            {selected.map((value) => (
              <Chip key={value} label={value} style={{marginLeft: '5px'}}/>
            ))}
          </div>
        )}

      >
        <MenuItem value="" disabled>{t('Select...')}</MenuItem>
        {options.map((option) => (
          option.options ? (
            <ListSubheader key={option.value}>{t(option.label)}</ListSubheader>
          ) :
            (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={value.indexOf(option.value) > -1} />
                <ListItemText>{t(option.label)}</ListItemText>
              </MenuItem>
            )
        ))}
      </Select>
      {touch && !!error && <InputFieldError error={t(error)} />}
    </Fragment>
  );
};
