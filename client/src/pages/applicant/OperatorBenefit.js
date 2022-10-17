import React, { useState, useEffect } from 'react'
import { useToast } from 'hooks'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useHistory, useParams } from 'react-router-dom'
import { AxiosPrivate, serializeTopupFormValues } from 'utils'
import { CircularProgress, Dialog } from '@material-ui/core'
import { Box, Typography } from '@material-ui/core'

import { Route as Routes } from 'constants/routes'
import { Button, Card, Page, PageHeader, StyledDialogActions, StyledDialogContent, StyledDialogTitle } from 'components/generic';
import { Form } from 'components/form/topup/OperatorBenefitApplication'
import { ApplicationStatus } from 'components/topup/DashboardComponents'
import { useOperatorInfoForm, useSubmissionLookup } from 'hooks/topup'
import { operatorInfo } from 'constants/topup/initialValues'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

export default function OperatorBenefit() {
  const { submit } = useOperatorInfoForm();
  const { id } = useParams()
  const history = useHistory()
  const { openToast } = useToast()
  const { t } = useTranslation()
  const [isOpen, setOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const { pathname } = useLocation()
  const { formValues, getOne, getComments, commentData, isFetching } = useSubmissionLookup()
  const showComments = pathname.includes('view') || id
  const canEdit = pathname.includes('edit');
  const ContentStyles = StyledDialogContent();

  useEffect(() => {
    if (id) {
      getOne(id)
    }
  }, [id])

  useEffect(() => {
    if (id && (pathname.includes('view') || pathname.includes('download'))) {
      getOne(id)
      setIsDisabled(!isDisabled)
      if (pathname.includes('download')) {
        setOpen(true)
      }
    }
    if (showComments) {
      getComments()
    }
    const beforeunload = (event) => {
    event.preventDefault();

    event.returnValue = 'alert';
    }

    window.scrollTo(0, 0);
    (!pathname.includes('view') && !pathname.includes('download')) && window.addEventListener('beforeunload', beforeunload);
    return () => window.removeEventListener('beforeunload', beforeunload);

    }, [id, pathname])

  useEffect(() => {
    if (!id) {
      const getIdForAutoSave = async () => {
        try {
          let res = await AxiosPrivate.post(`/api/v1/topup/operator`, serializeTopupFormValues(formValues?.data || operatorInfo, 'operator'))
          history.push(`${Routes.OperatorBenefit}/${res.data.id}`)
        } catch (e) {
          openToast({ status: 'error', message: e.message || t('Failed to autosave form') })
        }
      }
      getIdForAutoSave()
    }
  }, [])


  const downloadAsPdf = () => {

    // Remove all floating elements from the component, and get the component to print
    const pageWrapper = document.getElementById('page-wrapper')
    const innerWrapper = document.getElementById('inner-wrapper')
    const formInnerWrapper = document.getElementById('form-inner-wrapper')
    const selectField = document.getElementById('select-field')
    const breadCrumb = document.getElementById('bread-crumb')
    const facilityWrappers = document.getElementsByClassName('facility-wrapper')

    pageWrapper.style.display = 'block'
    innerWrapper.style.display = 'block'
    formInnerWrapper.style.display = 'block'
    selectField.style.display = 'none'
    breadCrumb.style.display = 'none'

    for(var i=0; i<facilityWrappers.length; i++) {
      facilityWrappers[i].style.display = 'block'
  }
    // Set document HTML to only the component tree we are interested in
    const printContents = document.getElementById("exportable-form").innerHTML;

    // Set the document body to the component-to-print, execute print, then route back to root (resets the DOM)
    document.body.innerHTML = printContents;
    window.onafterprint = () => window.location = Routes.Root
    window.print();
    
  }



  return (
    <Page showComments={showComments} commentData={commentData} hideFooter >
      <div id='exportable-form' >
        <PageHeader header='Operator Covid-19 Support Funding Application' />
        <Container maxWidth='md' id="page-wrapper">
          <Grid container id='inner-wrapper' style={{display: 'block'}}>
            <Grid item xs={12} sm={12} height='100%' >
              <Box mt={2} mb={3} id='bread-crumb'>
                <Typography data-html2canvas-ignore >
                  <Link to={Routes.Root}>Dashboard</Link>{` > Operator Covid-19 Support Funding Application`}
                </Typography>
                { formValues  && <ApplicationStatus applicationStatus={formValues.operatorStatus}/>}
              </Box>
              {!(isDisabled || pathname.includes('edit')) && (
                <Box mb={4}>
                  <Alert severity='info' style={{ backgroundColor: '  warning', marginBottom: '30px' }}>
                    <Typography variant='h4' >
                      Form is Auto-Saved every 30 seconds
                    </Typography>
                  </Alert>
                </Box>
              )}
              <Box pb={6}>
                {id && ! isFetching ?
                  <Card title={t('Operator Information')}>
                    <Form
                      id={id}
                      disabled={true}
                      onSubmit={(values, {initialValues})=>submit(values, pathname.includes('edit'))}
                      isDisabled={!!isDisabled}
                      isEditing={pathname.includes('edit')}
                      isFetching={id && isFetching}
                      initialValues={formValues?.data || operatorInfo}
                      disableAutosave={pathname.includes('edit')}
                    />
                  </Card> : <Box display='flex' justifyContent='center' alignItems='center'><CircularProgress /></Box>
                }
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Dialog
        open={isOpen}
        maxWidth='sm'
        fullWidth
        hideBackdrop={false}
        disableBackdropClick={true}
      >
        <StyledDialogTitle component="div">
          <Typography component="div" variant="h4">Download Page as PDF</Typography>
        </StyledDialogTitle>
        <ContentStyles>
          <Typography variant="body2">
            <Box p={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} alignContent='center'>
                  <Typography variant='body1'>
                    Clicking the button below will open your browser's print page dialog with a modified version of this page. 
                    The modified version will contain the Operator submission formatted for printing.
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{textAlign: 'left'}} >
                  <ul>
                    <li>Click the 'Destination' dropdown and select 'Save As PDF'</li>
                    <li>Ensure 'Pages' is set to 'All', and 'Layout' is set to 'Portrait'</li>
                    <li>Under 'More Options', you may have the setting to 'Enable Background Graphics'. This will provide a better looking export, but is not necessary for the export to work.</li>
                  </ul>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={downloadAsPdf} text="download as PDF"/>
                </Grid>
              </Grid>
            </Box>
          </Typography>
        </ContentStyles>
          <StyledDialogActions>
            {/* <Button
              style={{ minWidth: 150 }}
              text="Save to Draft"
              type="submit"
              color="primary"
              variant="contained"
              size="small"
              fullWidth={false}
            /> */}
            <Button
              style={{ minWidth: 150 }}
              text='Cancel'
              onClick={() => {
                setOpen(false)
                history.push(Routes.Root)
              }}
              color="primary"
              variant="outlined"
              size="small"
              fullWidth={false}
            />
          </StyledDialogActions>
      </Dialog>
    </Page>
  )
}
