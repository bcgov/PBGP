import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { Formik, Form as FormikForm } from 'formik'
import { useTranslation } from 'react-i18next'
import { OperatorInfoSchema } from 'constants/topup/operatorSchema'
import { Button, FocusError } from 'components/generic'
import { OperatorInfo } from 'components/form/topup/OperatorInfo'

export const Form = ({
  onSubmit,
  initialValues,
  isFetching,
  isDisabled,
  isEditing,
  id,
  disableAutosave
}) => {
  const { t } = useTranslation()
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={OperatorInfoSchema}
      onSubmit={onSubmit}
      id={id}
    >
      <FormikForm>
        <FocusError />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <OperatorInfo isDisabled={isDisabled} id={id} disableAutosave={disableAutosave} />
          </Grid>
          {(!isDisabled || isEditing) && (
            <Container maxWidth='md'>
              <Box ml={[1, 0]} mr={[1, 0]} pt={4} pb={2}>
                <Button
                  text={!isEditing ? t('Submit Form') : 'Update Form'}
                  type='submit'
                  loading={isFetching}
                  id={id}
                />
              </Box>
            </Container>
          )}
        </Grid>
      </FormikForm>
    </Formik>
  );
};
