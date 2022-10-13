import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Formik, Form as FormikForm } from 'formik'
import { OperatorInfoSchema } from 'constants/topup/operatorSchema'
import { OperatorInfo } from './OperatorInfo'

export const Form = ({
  onSubmit,
  initialValues,
  isDisabled,
  id,
  details,
  submitDetermination,
  isAssignedToMe,
  isApproving,
  isDenying,
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={OperatorInfoSchema}
      onSubmit={onSubmit}
      id={id}
    >
      {({ ...helpers }) => (
        <FormikForm>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <OperatorInfo
                isAssignedToMe={isAssignedToMe}
                isApproving={isApproving}
                isDenying={isDenying}
                isDisabled={isDisabled}
                id={id}
                details={details}
                submitDetermination={(...args) => submitDetermination(...args, helpers.setFieldValue)}
              />
            </Grid>
          </Grid>
        </FormikForm>
      )}
    </Formik>
  );
};