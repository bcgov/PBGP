import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom'
import { Route as Routes } from 'constants/routes'
import { Box, Grid, CircularProgress, Typography } from '@material-ui/core'
import { Page, PageHeader } from 'components/generic'
import { Form } from 'components/form/topup/OrganizationInfo'
import { organizationInfo } from 'constants/topup/initialValues'
import { useOrganizationInfoForm, useSubmissionLookup } from 'hooks/topup'
import { Card } from 'components/generic'

export default function CompanyTopUp() {
  const { submit, isFetching, isDisabled } = useOrganizationInfoForm()
  const { isFetching: submissionFetching, formValues, error, getOne, edit, getComments, commentData } = useSubmissionLookup()
  const [showComments, setShowComments]=useState(false)
  const { id } = useParams()
  const { pathname } = useLocation()
  const history=useHistory()

  useEffect(() => {
    id && getOne(id)
    id && setShowComments(true)
    id && getComments()

    const beforeunload = (event) => {
    event.preventDefault();
    event.returnValue = 'alert';
    }
    window.scrollTo(0, 0);
    !pathname.includes('view') && window.addEventListener('beforeunload', beforeunload);
    return () => window.removeEventListener('beforeunload', beforeunload);
  }, [id, pathname])

  const handleSubmit = async (values) => {
    await pathname.includes('edit') ? edit(id, values) : submit(values)
  }

  if (id && submissionFetching) {
    return (
      <Grid style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: "center", alignItems: "center"}} >
        <CircularProgress />
      </Grid>
    )
  }
  return (
    <Page showComments={showComments} commentData={commentData} hideFooter>
      <PageHeader
        header='Organization Info'
        subheader={pathname.includes('view') ? null : pathname.includes('edit') ? 'Update your organization information below...' : 'Complete your organization information below...'}
        alertProp='Are you sure you want to navigate away?'
      />
    
      <Container maxWidth="md">
        <Box flex="true" component={Grid} container>
          <Box component={Grid} item xs={12} sm={12} height="100%">
            <Box mt={2} mb={3}>
              {pathname.includes('view') ?
                <Typography>
                  <Link to={Routes.Root}>Dashboard</Link>{` > My Organization`}
                </Typography>
                :
                <Typography>
                  <Link
                    to="#"
                    onClick={() => {if (window.confirm("Are you sure want to navigate away? Any unsaved changes will be lost")) history.push(`${Routes.Root}`)}}
                  >
                    Dashboard
                  </Link>
                  {` > My Organization`}
                </Typography>
              }
            </Box>
          
            <Box pb={6}>
              <Card title={"Organization Info"}>
                {formValues?.confirmationNumber && (
                  <Box pt={1.5} pb={3.5} pl={3} pr={4}>
                    <Typography>
                      <b>Confirmation Number:</b> {formValues?.confirmationNumber}
                    </Typography>
                  </Box>
                )}
                <Form
                  onSubmit={handleSubmit}
                  isEditing={pathname.includes('edit')}
                  isFetching={isFetching}
                  initialValues={formValues ? {
                    ...formValues?.data,
                    // Field Overrides
                    financial_institution: '',
                    account_holder_name: '',
                    account_type: '',
                    institution_number: '',
                    transit_number: '',
                    account_number: ''
                  } : organizationInfo}
                  disabledInputs={pathname.includes('view')}
                  disabledButton={isDisabled}
                />
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>
    </Page>
  )
}
