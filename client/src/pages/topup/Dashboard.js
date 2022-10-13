import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CircularProgress, Grid, Box, Container, Typography, LinearProgress } from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import Alert from '@material-ui/lab/Alert'
import { Page, Button, PageHeaderImage } from 'components/generic'
import { OrganizationIcon, EmployeeIcon, OperatorIcon, SignatureIcon, ConfirmationIcon } from 'components/generic/TopUpIcons'
import { ProgramInfo } from 'components/generic/ProgramInfo'
import { AgreementTask, Deny, SubmissionPending, Success } from 'components/topup/DashboardComponents'
import { Route as Routes } from 'constants/routes'
import { useGetFilesRequestingSignature, useSubmissionLookup, useEnableApplications } from 'hooks';
import { PaymentStatus } from 'constants/topup/PaymentStatus';

export default function TopUpDashboard() {
  const { t } = useTranslation()
  const { isFetching, formValues, error, commentData , lookup ,getComments} = useSubmissionLookup()
  const { filesList, isFetching: isFetchingFiles, downloadIndividualFile, refreshFiles} = useGetFilesRequestingSignature()
  const history = useHistory()
  const [submissions, setSubmissions] = useState([])
  const [hasOrgInfo, toggleHasOrgInfo] = useState(false)
  const [status, setStatus] = useState({ message: 'Your Application is in Draft', severity: 'warning' })
  const [opStatus, setOpStatus]=useState(null)
  const [operatorFormIsDraft, setOperatorFormDraft ] = useState(null);
  const operatorForm = submissions && submissions.find((submission)=>(submission.submissionType==='operator'))
  const organizationForm = submissions &&  submissions.find((submission)=>(submission.submissionType==='organization'))
  const employeeForm = submissions &&  submissions.find((submission)=>(submission.submissionType==='employee'))
  const { enableApplications, enablePdfExport, loadingEnv } = useEnableApplications()
  const employeeStatus = employeeForm?.employeeStatus
  const operatorStatus = operatorForm?.operatorStatus

  const showComments = commentData && commentData.count >0;

  useEffect(() => {
    lookup()
    getComments()
  }, [])

  useEffect(() => {
    if (formValues) {
      setSubmissions(formValues)
    }
  }, [formValues])

  useEffect(() => {
    toggleHasOrgInfo(submissions.some(s => s.submissionType === 'organization'))
    submissions.some(s => s.submissionType === 'declaration') && setStatus({ message: 'Your application has been Submitted', severity: 'success' })
    submissions.some(s => s.isCompleted === true) && setOpStatus(true)
    if(submissions.find(s => {
      return s.submissionType === 'operator' && s.isCompleted === true
    })){
      setOperatorFormDraft(false);
    }else{
      setOperatorFormDraft(true)
    }
  }, [submissions])

  const subByType = submissions.reduce((subs, sub) => {
    subs[sub.submissionType] = sub
    return subs
  }, {})

  let commentDataMessage = ""
  if(commentData && commentData.count > 0){
    if( commentData.count ===1){
      commentDataMessage = "There is an action item for this organization."
    }else{
      commentDataMessage = `There are ${commentData.count} action items for this organization.`
    }
  }

  if (loadingEnv){
    return(
    <Grid style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: "center", alignItems: "center"}} >
        <CircularProgress />
      </Grid>
    )
  }


  return (
    <Page showComments={showComments} commentData={commentData}>
      <PageHeaderImage
        header='Health Care Covid-19 Funding for Critical Workers and Operators'
        subheader='Submit and view your applications for the Health Care Covid-19 Funding for Critical Workers and Operators program'>
      </PageHeaderImage>
      <Container maxWidth='sm'>
        <ProgramInfo />
          <Box mb={6}>
            <>
              {
                isFetching
                  ? <Box mb={2}><LinearProgress /></Box>
                  : opStatus || submissions.some(s => ['employee'].includes(s.submissionType))
                  ? <Alert severity={status.severity} style={{ backgroundColor: { status }, marginBottom: '30px' }}>
                      <Typography variant='h4' >{status.message}</Typography>
                    </Alert>
                  : null
              }

              {
                subByType['employee']?.paymentStatus === PaymentStatus.PAID &&
                (!subByType['employee']?.employeesPaidDetermination?
                  <SubmissionPending
                      title={t('Confirmation(s) of Grant Recipient')}
                      subtitle={'Please confirm distribution of payment to eligible employees. This must be completed within 4 weeks of receiving payment from Alberta Health. If you require an extension to complete this task, please email'}
                      buttonText={t('Submit')}
                      history={history}
                      onClick={() => history.push(Routes.PaidEmployees)}
                      Icon={<ConfirmationIcon/>}
                      link={<a href="mailto:health.cwb@gov.ab.ca">health.cwb@gov.ab.ca</a>}
                    />
                    :
                  <Success
                    title={t('Confirmation(s) of Grant Recipient')}
                    subtitle={'The Confirmation you entered has been received'}
                    history={history}
                    Icon={<ConfirmationIcon />}
                  >
                    <Grid container spacing={2} direction='row'>
                      <Grid item xs={6}>
                        <Button
                          variant='outlined'
                          text='View'
                          onClick={() => history.push(Routes.PaidEmployees)} />
                      </Grid>
                    </Grid>
                </Success>)
              }

              {
                filesList?.map(file => (
                  <AgreementTask
                    buttonText='Download File'
                    variant='contained'
                    fileRef={file}
                    refreshFiles={refreshFiles}
                    onClick={() => downloadIndividualFile(file)}
                    Icon={<SignatureIcon style={{width:'100%', height:'auto'}} />}
                    title={file.fileName}
                  />
                ))
              }

            {
              !isFetching && !enableApplications && !hasOrgInfo
                ? <Deny
                    title={t('Organization Information')}
                    Icon={<OrganizationIcon />}
                  >
                    <Typography>{t('Application Deadline has passed. No longer accepting new applications.')}</Typography>
                  </Deny>
                : !isFetching && hasOrgInfo
                ? <Success
                    title={t('Organization Information')}
                    subtitle={
                      <>
                        The organization information you entered has been received.<br />
                        <b>Note: </b>As a security precaution Editing Organization Information will require you
                        to re-enter your “Deposit Information” as well as a copy of your void cheque.
                      </>
                    }
                    history={history}
                    Icon={<OrganizationIcon />}
                  >
                    <Grid container spacing={2} direction='row'>
                      {(organizationForm && !organizationForm.isLocked)?
                        <Grid item xs={6}>
                          <Button
                            text='Edit'
                            onClick={() => history.push(`/organization/${subByType['organization']?.id}/edit`)}
                          />
                        </Grid> : null}
                        <Grid item xs={6}>
                          <Button
                            variant='outlined'
                            text='View'
                            onClick={() => history.push(`/organization/${subByType['organization']?.id}/view`)} />
                        </Grid>
                      </Grid>
                    </Success>
                : null
              }

            {
              !isFetching && !hasOrgInfo && enableApplications
                ? <SubmissionPending
                    buttonText='Start Now'
                    variant='contained'
                    onClick={() => history.push(`${Routes.Organization}`)}
                    Icon={<OrganizationIcon />}
                    title='Organization Information'>
                      <Typography variant='body1'>{t('Enter your Organization information in order to apply for benefits')}</Typography>
                  </SubmissionPending>
                : null
              }

            {
              !hasOrgInfo
                ? null
                : !enableApplications && !operatorForm
                ? <Deny
                    title={t('Operator Covid-19 Support Funding Application')}
                    subtitle={t('Application Deadline has passed. No longer accepting new applications.')}
                    Icon={<OperatorIcon />}
                    />
                : !operatorFormIsDraft
                ? <Success
                    isExportable={enablePdfExport &&(filesList?.filter(file => file.task.name === "Send Fully Executed Grant Agreement to Operator").some(result => result.task.submissionType === 'operator'))}
                    type='operator'
                    id={subByType['operator']?.id}
                    applicationStatus={operatorStatus}
                    title={t('Operator Covid-19 Support Funding Application')}
                    subtitle={t('Your application has been received')}
                    Icon={<OperatorIcon />}
                  >
                    <Grid container spacing={2} direction='row'>
                      {(operatorForm && !operatorForm.isLocked)?
                        <Grid item xs={6}>
                          <Button
                            variant='contained'
                            text='Edit'
                            onClick={() => history.push(`${Routes.OperatorBenefit}/${subByType['operator']?.id}/edit`)}
                          />
                        </Grid> : null}
                        <Grid item xs={6}>
                          <Button
                            variant='outlined'
                            text='View'
                            onClick={() => history.push(`${Routes.OperatorBenefit}/${subByType['operator']?.id}/view`)}
                          />
                        </Grid>
                    </Grid>
                  </Success>
                : <SubmissionPending
                    title='Operator Covid-19 Support Funding Application'
                    variant='contained'
                    buttonText={submissions.some(s => s.submissionType === 'operator') ? 'Continue' : 'Start Now'}
                    onClick={
                      submissions.some(s => s.submissionType === 'operator')
                        ? () => history.push(`${Routes.OperatorBenefit}/${subByType['operator']?.id}/continue`)
                        : () => history.push(Routes.OperatorBenefit)
                        }
                        fullWidth={false}
                        Icon={<OperatorIcon />}
                  >
                    <Typography variant='body1'>
                      {t(`Operators of non-contracted licensed supportive living, contracted and non-contracted home care, hospices and residential addiction and mental health treatment centres can apply for COVID-19 support funding. Refer to the`)}
                        &nbsp;
                          <a href='https://open.alberta.ca/publications/operator-covid-19-support-funding-application-guidelines-for-operators'
                            target='_blank'>
                            Application Guideline for Operator COVID-19 Support Funding Support
                          </a>.
                    </Typography>
                  </SubmissionPending>
              }

            {
              !hasOrgInfo
                ? null
                : !enableApplications && !employeeForm
                ? <Deny
                    title={t('Health Sector - Critical Worker Benefit Application')}
                    subtitle={t('Application Deadline has passed. No longer accepting new applications.')}
                    Icon={<EmployeeIcon />}
                  />
                : submissions.some(s => s.submissionType === 'employee')
                ? <Success
                    isExportable={enablePdfExport && (filesList?.filter(file => file.task.name === "Send Fully Executed Grant Agreement to Operator").some(result => result.task.submissionType === 'employee'))}
                    type='employee'
                    id={subByType['employee']?.id}
                    applicationStatus ={employeeStatus}
                    Icon={<EmployeeIcon />}
                    title={t('Health Sector - Critical Worker Benefit Application')}
                    subtitle={t('Your application has been received')}>
                      <Typography component="div" variant='body2'>
                        {t('Submitted for') + ` ${subByType['employee']?.numSubmissions} employees`}
                      </Typography>
                        <Grid container spacing={2} direction='row'>
                          {(employeeForm && !employeeForm.isLocked)?
                          <Grid item xs={6}>
                            <Button
                              text='Edit'
                              onClick={() => history.push(`${Routes.EmployeesDetail}/${subByType['employee']?.id}/edit`)}
                            />
                          </Grid>:null}
                          <Grid item xs={6}>
                            <Button
                              variant='outlined'
                              text='View'
                              onClick={() => history.push(`${Routes.EmployeesDetail}/${subByType['employee']?.id}/view`)} />
                          </Grid>
                       </Grid>
                    </Success>
                  : <SubmissionPending
                      Icon={<EmployeeIcon />}
                      title='Health Sector - Critical Worker Benefit Application'
                      buttonText='Start Now'
                      variant='contained'
                      onClick={() => history.push(Routes.Employees)}
                    >
                      <Typography variant='body1'>
                        {t('Applications must be submitted by employers on behalf of their eligible workers. Employers are required to comply with the')}
                          <a target='_blank' href=' https://open.alberta.ca/publications/critical-worker-benefit-application-guidelines-for-the-health-sector'
                            style={{ paddingLeft: '6px', paddingRight: '6px' }}>
                            Critical Worker Benefit program guidelines
                          </a>
                            {t('and are responsible for administering funds on behalf of government.')}
                      </Typography>
                      <Typography variant='body1'>
                        {t('Individual workers do not apply directly for the benefit.')}
                      </Typography>
                    </SubmissionPending>
                }

              {
                submissions.some(s => s.submissionType === 'declaration')
                  ? <Success
                      Icon={<AssignmentTurnedInIcon style={{ fontSize: '4rem' }} />}
                      title={t('Application Declaration')}>
                        <Typography>{t('Your declaration has been received')}</Typography>
                      </Success>
                  : opStatus|| submissions.some(s => s.submissionType === 'employee')|| submissions.some(s => s.submissionType === 'operator')
                  ? <SubmissionPending
                      Icon={<AssignmentTurnedInIcon style={{ fontSize: '4rem' }} />}
                      title='Application Declaration'
                      subtitle='Please note that in order to process your applications a Declaration must be completed.'
                      buttonText='To Declaration'
                      variant='contained'
                      onClick={() => history.push(Routes.ApplicationDeclaration)}
                    /> : null}
          </>
        </Box>
      </Container>
    </Page>
  )
}
