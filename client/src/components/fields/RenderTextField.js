import React, { Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import { getIn } from 'formik'
import { useTranslation } from 'react-i18next'
import { InputFieldLabel, InputFieldError } from '../generic'

export const RenderTextField = ({
  field: { value, name, onChange, onBlur },
  form: { touched, errors, setFieldValue },
  label,
  placeholder,
  disabled,
  ...props
}) => {
  const error = getIn(errors, name)
  const touch = getIn(touched, name)
  const { t } = useTranslation()

  return (
    <Fragment>
      {label && <InputFieldLabel label={label} />}
      <TextField
        name={name}
        variant='outlined'
        fullWidth
        error={touch && !!error}
        value={value || ''}
        placeholder={t(placeholder)}
        onChange={onChange}
        onBlur={(event) => {
          setFieldValue(name, event.target.value.trim())
          onBlur(event)
        }}
        disabled={disabled}
        {...props}
      />
      {touch && !!error && <InputFieldError error={t(error)} />}
    </Fragment>
  )
}
