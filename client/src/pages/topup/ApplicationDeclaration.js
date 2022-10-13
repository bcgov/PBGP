import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import { Button, Page, PageHeader } from 'components/generic'
import { Field, Form, Formik } from 'formik'
import { RenderCheckbox } from 'components/fields'
import { ApplicationDeclarationSchema } from 'constants/topup/schema'
import { useApplicationDeclarationForm } from 'hooks/topup/applicationDeclaration'
import { useTranslation } from 'react-i18next'

export default function ApplicationDeclaration() {
  const { submit, isFetching } = useApplicationDeclarationForm()
  const { t } = useTranslation()

  return (
    <Page>
      <PageHeader
        header='Application Declaration'>
      </PageHeader>
      <Container maxWidth='lg' style={{ paddingBottom: '40px' }}>
        <Container maxWidth='md'>
          <Box mt={2} mb={4}>
            <Box my={2}>
              <Typography>
                <Link to='/'>{t("Dashboard")}</Link>&nbsp;
                {'> Application Declaration'}
              </Typography>
            </Box>
          </Box>
          <Container maxWidth='md'>
            <Box mt={4} mb={4} >
              <Grid container spacing={2} >
                <Grid item xs={12}>
                  <Typography variant='h4'>
                    {t("Declaration")}
                  </Typography>
                  <br />
                  <Typography variant='body1'>
                    By submitting this Application Form (“Application”), the organization confirms that:
                    <br/>
                    <ol type="1" style={{ paddingInlineStart: '15px' }}>
                      <li style={{ margin: '5px 0' }} >The organization has authorized the individual completing this Application to execute the Application on behalf of the organization.</li>
                      <li style={{ margin: '5px 0' }} >The organization, in applying for either, or both, of the Alberta Critical Worker Benefit Program and Alberta Health Operator COVID-19 Support Funding Program (“Program(s)”) has provided true, complete and correct information in its Application.</li>
                      <li style={{ margin: '5px 0' }} >The organization acknowledges that if any false or misleading information is submitted or any relevant or significant fact is concealed, or any other misrepresentation occurs, the Minister or the Minister’s delegate (the “Minister”) may decline the organization’s application.  The organization may also be ineligible to apply for future grants.</li>
                      <li style={{ margin: '5px 0' }} >The organization has read and acknowledges the version of the Program(s) Guidelines in effect at the time of submitting the Application.  All Program Guidelines, as amended from time to time, are available at the Alberta Critical Worker Benefit Program website - <a href='https://www.alberta.ca/critical-worker-benefit.aspx' target='_blank' >www.alberta.ca/critical-worker-benefit</a>.</li>
                      <li style={{ margin: '5px 0' }} >The organization acknowledges that both the organization and the Minister will need to sign a Grant Agreement before the grant funds will be paid to the organization.</li>
                      <li style={{ margin: '5px 0' }} >
                      The organization acknowledges that meeting the eligibility criteria does not guarantee grant funding, and that the Minister retains the sole discretion to
                        <ol type="a">
                          <li style={{ margin: '5px 0' }} >approve an application,</li>
                          <li style={{ margin: '5px 0' }} >enter into the Grant Agreement,</li>
                          <li style={{ margin: '5px 0' }} >approve each eligible employee and/or number of eligible beds and hours under the Program(s) applied for in the Application,</li>
                          <li style={{ margin: '5px 0' }} >approve the grant amount, and</li>
                          <li style={{ margin: '5px 0' }} >allocate grant funds.</li>
                        </ol>
                      </li>
                      <li style={{ margin: '5px 0' }} >The organization acknowledges that the Application will be considered on a first completed application received, first approved basis, and that the exhaustion of program funding may result in the organization’s application not being approved, subject to the sole discretion of the Minister.  The organization acknowledges that an incomplete Application will not be considered and approved.</li>
                    </ol>
                  </Typography>
                </Grid>
                <Container maxWidth='sm'>
                  <Box mt={2}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Formik
                          initialValues={{ ApplicationDeclaration: false }}
                          validationSchema={ApplicationDeclarationSchema}
                          onSubmit={submit}
                        >
                          {({ values }) => (
                            <Form>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Field
                                    name='application_declaration'
                                    label={<Typography variant='h3'>{t("By checking this box, the organization declares that it confirms the statements set out above.")}</Typography>}
                                    component={RenderCheckbox}
                                  />
                                </Grid>
                                <Grid container item xs={12} justify='flex-end'>
                                  <Button
                                    type='submit'
                                    maxWidth={false}
                                    style={{ marginBottom: '10px' }}
                                    text='Submit Application Declaration'
                                    disabled={!values.application_declaration || isFetching}
                                  />
                                </Grid>
                              </Grid>
                            </Form>
                          )}
                        </Formik>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </Grid>
            </Box>
          </Container>
        </Container>
      </Container>
    </Page>
  )
}


