import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Grid, Typography, LinearProgress } from '@material-ui/core'
import { Button, Page, PageHeader } from 'components/generic'
import { Field, Form, Formik } from 'formik'
import { RenderCheckbox } from 'components/fields'
import { ApplicationDeclarationSchema } from 'constants/topup/schema'
import { useApplicationDeclarationForm } from 'hooks/topup/applicationDeclaration'
import { useTranslation } from 'react-i18next'
import { useSubmitEmployeesPaid } from 'hooks/topup/useSubmitEmployeesPaid'
import { useSubmissionLookup } from 'hooks'
import { EmployeesPaid } from 'components/topup/DashboardComponents'

export default function SubmitPaidEmployees() {
  const { t } = useTranslation()
  const { isFetchingSubmissions, formValues, lookup } = useSubmissionLookup()
  const { submitEmployeesPaid, isSubmitting: isSubmittingEmployeesPaid} = useSubmitEmployeesPaid();

  const submission = formValues?.find(s => s.submissionType === 'employee');

  useEffect(() => {
    lookup();
  }, []);

  return (
    <Page>
      <PageHeader
        header='Confirmation(s) of Grant Recipient'>
      </PageHeader>
      <Container maxWidth='lg' style={{ paddingBottom: '40px' }}>
        <Container maxWidth='md'>
          <Box mt={2} mb={4}>
            <Box my={2}>
              <Typography>
                <Link to='/'>{t("Dashboard")}</Link>&nbsp;
                {'> Confirmation(s) of Grant Recipient'}
              </Typography>
            </Box>
          </Box>
          <Container maxWidth='md'>
            <Box mt={4} mb={4} >
              <Grid container spacing={2} >
                <Grid item xs={12}>
                  <Typography variant='h4'>
                    {t("Confirmation(s) of Grant Recipient")}
                  </Typography>
                  <br />
                  <Typography variant='body1'>
                    {isFetchingSubmissions? <LinearProgress/>: (
                      <EmployeesPaid form={submission} submitEmployeesPaid={submitEmployeesPaid} isSubmittingEmployeesPaid={isSubmittingEmployeesPaid} />
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Container>
      </Container>
    </Page>
  )
}


