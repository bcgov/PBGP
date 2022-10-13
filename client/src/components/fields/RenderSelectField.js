import React, { Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { getIn } from 'formik'
import { useTranslation } from 'react-i18next'
import ListSubheader from '@material-ui/core/ListSubheader'
import { InputFieldError, InputFieldLabel } from '../generic'

export const RenderSelectField = ({
  field: { value, name, onChange, onBlur },
  form: { touched, errors, setFieldTouched },
  label,
  options,
  disabled,
  ...props
}) => {
  const error = getIn(errors, name)
  const touch = getIn(touched, name)
  const { t } = useTranslation()

  return (
    <Fragment>
      {label && <InputFieldLabel label={t(label)} />}
      <TextField
        name={name}
        select
        fullWidth
        variant='outlined'
        inputProps={{ displayEmpty: true, onClose: () => setFieldTouched(name, true) }}
        error={touch && !!error}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
        disabled={disabled}
      >
        <MenuItem value='' disabled>{t('Select...')}</MenuItem>
        {options.map((option) => (
          option.options ? (
            <ListSubheader disabled={disabled} key={option.value}>{t(option.label)}</ListSubheader>
          ) :
            (
              <MenuItem disabled={disabled}  key={option.value} value={option.value} >
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {
                    option.LabelComponent 
                      &&
                    React.createElement(option.LabelComponent, {style: option.style})
                  }
                  {t(option.label)}
                </div>
              </MenuItem>
            )
        ))}
      </TextField>
      { touch && !!error && <InputFieldError error={t(error)} />}
    </Fragment >
  )
}
