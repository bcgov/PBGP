import React from 'react'
import { Container, Grid, Box } from '@material-ui/core'
import { Formik, Form as FormikForm } from 'formik'
import { useTranslation } from 'react-i18next'
import { OrganizationInfoSchema } from 'constants/topup/schema'
import { FocusError } from 'components/generic'
import { OrganizationInfo } from 'components/form/topup/OrganizationInfoInputs'
import {Button} from 'components/generic'

export const Form = ({
  onSubmit,
  initialValues,
  isFetching,
  disabledInputs,
  isEditing,
  details,
  disabledButton
}) => {

  const { t } = useTranslation()

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={OrganizationInfoSchema}
      onSubmit={onSubmit}
      
    >
      <FormikForm>
        <FocusError />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <OrganizationInfo isDisabled={disabledInputs} />
          </Grid>
          {!disabledInputs  && !details &&
            <Container maxWidth='md' >
              <Box ml={[1, 0]} mr={[1, 0]} pb={2}>
                <Button
                  text={!isEditing ? t('Submit Form') : 'Update Form'}
                  type='submit'
                  loading={isFetching}
                  disabled={disabledButton}
                />
              </Box>
            </Container>
          }
        </Grid>
      </FormikForm>
    </Formik>
  )
}
