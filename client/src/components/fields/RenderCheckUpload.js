import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { getIn } from 'formik'
import { InputFieldLabel, InputFieldError } from 'components/generic'

const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3 MB

export const RenderCheckUpload = ({
  field: { value, name, onChange, onBlur },
  form: { touched, errors, setFieldValue },
  label,
  placeholder,
  ...props
}) => {
  const error = getIn(errors, name)
  const touch = getIn(touched, name)
  const { t } = useTranslation()
  const [preview, setPreview] = useState('')
  const [fileError, setFileError] = useState(null);

  const handleChange = (e) => {
    setFileError(null);
    e.preventDefault()

    if(e.target.files[0]?.size > MAX_FILE_SIZE) {
      setFileError('Selected file has a file size greater than 3MB');
    } else {
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onloadend = () => {
        const base64result = reader.result
        setPreview(reader.result)
        setFieldValue('void_cheque', base64result)
      }
    }
  }

  return (
    !props.disabled
    &&
    <Fragment>
      {label && <InputFieldLabel label={t(label)} />}
      {preview ?
        (
          <>
            <Container maxWidth='md'>
              <Grid item xs={12}>
                <img src={preview} alt='preview' style={{ width: '100%', height: 200, borderRadius: '8px' }} />
              </Grid>
            </Container>
            <Grid item xs={12}>
              <Button
                color='primary'
                size='medium'
                onClick={() => setPreview(null)}
              >
                Change Image
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <label htmlFor='void_cheque' style={{ cursor: 'pointer' }}>
              <Typography variant="body2">Void cheque must be made under the name of the organization</Typography>
              <AddAPhotoIcon color='primary' fontSize='large' style={{ margin: 12 }} />
            </label>
            <input
              hidden
              id='void_cheque'
              type='file'
              name={name}
              onChange={handleChange}
              onBlur={(event) => {
                onBlur(event)
              }}
              {...props}
            />
            <Typography variant="body2" paragraph>
              Void cheque image must have a file size less than 3MB.
            </Typography>
          </>
        )}
      {(!!error || !!fileError) && <InputFieldError error={t(error || fileError)} />}
    </Fragment >
  )
}


