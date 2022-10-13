import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Box, Card, CardContent, Typography, Dialog } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { Button, StyledDialogContent, StyledDialogTitle } from 'components/generic'
import { useAgreementFileUpload } from 'hooks/admin';
import { Formik, Form as FormikForm, FastField } from 'formik';
import { RenderCheckbox, RenderRadioGroup, RenderTextField } from 'components/fields';
import { SubmitEmployeesPaidSchema } from 'constants/topup/schema';
import { useHistory } from 'react-router';
import { Route } from 'constants/routes';
import { FileDropzone } from 'components/generic/FileDropzone';

export function Success({ Icon, title, subtitle, children, type = null, id, isExportable, applicationStatus }) {
  const history = useHistory()

  return (
    <>
      <Box mb={4}>
        <Card style={{ borderWidth: 2 }}>
          <CardContent>
            <Grid container>
              <Grid container item xs={3} justify='center' alignItems='center'>
                <Box p={5}>{Icon}</Box>
              </Grid>
              <Grid container item xs={9}>
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: '1 1 auto' }}>
                <Typography variant='h3' >
                  {title}
                  
                  
                </Typography>
                {!applicationStatus &&<CheckCircleOutlineIcon style={{ color: '#16c92e', fontSize: '2rem' }} />}
                {applicationStatus && <ApplicationStatus applicationStatus={applicationStatus}/>}
                </Box>
                {
                  type && isExportable
                    &&
                  <Grid container item xs={8} style={{marginTop: '1rem'}}>
                    <Button 
                      text={type === 'operator' ? 'Export Application as PDF' : 'Export Application as Excel'}
                      onClick={() => 
                        type === 'operator' 
                          ? history.push(`${Route.OperatorBenefit}/${id}/download`)
                          : history.push(`${Route.EmployeesDetail}/${id}/download`)
                      }
                    />
                  </Grid>
                }
                <Typography variant='body1' style={{ margin: '1rem 0' }}>
                  {subtitle}
                </Typography>
                <Grid container item xs={12} justify='space-between'>
                  <Grid item>
                    {children}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export function Deny({ Icon, title, subtitle, children }) {
  return (
    <>
      <Box mb={4}>
        <Card style={{ borderWidth: 2 }}>
          <CardContent>
            <Grid container>
              <Grid container item xs={3} justify='center' alignItems='center'>
                <Box p={5}>{Icon}</Box>
              </Grid>
              <Grid container item xs={9}>
                <Typography variant='h3' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: '1 1 auto' }}>
                  {title}
                  <ErrorOutlineIcon style={{ color: '#FEBA35', fontSize: '2rem' }} />
                </Typography>
                <Typography variant='body1' style={{ margin: '1rem 0' }}>
                  {subtitle}
                </Typography>
                <Grid container item xs={12} justify='space-between'>
                  <Grid item>
                    {children}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}


export const SubmissionPending = ({ title, Icon, subtitle, buttonText, onClick, variant, children, link }) => {
  const { t } = useTranslation()
  return (
    <Box mb={4}>
      <Card style={{ borderWidth: 2 }}>
        <CardContent>
          <Grid container>
            <Grid container item xs={3} justify='center' alignItems='center'>
              <Box p={5}>{Icon}</Box>
            </Grid>
            <Grid container item xs={9}>
              <Grid item xs={12}>
                <Typography variant='h3'>{t(title)}</Typography>
                <Typography variant='body1' style={{ margin: '1rem 0' }}>
                  {subtitle} {link && link}
                </Typography>
                <Box my={2}>
                  {children}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button style={{ height: "auto" }} text={buttonText} onClick={onClick} fullWidth={false} variant={variant} />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}


export const AgreementTask = ({ title, fileRef, refreshFiles, Icon, buttonText, onClick, variant }) => {
  const { t } = useTranslation()
  const [isOpen, setOpen] = useState(false)
  const {
    isUploading,
    handleOperatorDashboardFileUpload
  } = useAgreementFileUpload()

  useEffect(() => {
    if (!isUploading && isUploading !== undefined) {
      refreshFiles()
    }
  }, [isUploading])
  
  const ContentStyles = StyledDialogContent();

  const grantTypeContent = {
    employee: {
      notSubmitted: {
        primary: t(`This is your grant agreement for the Critical Worker Benefit.
        `),
        secondary: t(`Please download the file and print it. On page 7, have the authorized representative sign above the “Signature of Authorized Official” line, print name, title and date.  Please upload the completed signature page in PDF format and named as “CWB Grant Agreement Signed by Operator”.`
        ),
        teritiary: t(`Please note – One or more of your employees may have been denied. Your grant does not include funding for denied employees. Do not provide the Critical Worker Benefit payment to any denied employees. You can review the approved and denied employee list in your Critical Worker Benefit application.`
        )
      },
      submitted: t('You may re-download the original Critical Worker Benefit grant agreement here'),
      completed: t('You may download the completed Health - Critical Worker Benefit grant agreement here.')  
    },
    operator: {
      notSubmitted:{
        primary: t(`This is your grant agreement for the Operator COVID-19 Support Funding.`),
        secondary:  t(`Please download the file and print it. On page 6, have the authorized representative sign above the “Signature of Authorized Official” line, print name, title and date.  Please upload the completed signature page in PDF format and named as “Op Grant Agreement Signed by Operator”.`),
        teritiary:``
      },
      submitted: t('You may re-download the original Operator COVID-19 Support Funding grant agreement here'),
      completed: t('You may download the completed Operator COVID-19 Support Funding grant agreement here')
    }
  }[fileRef.task.submissionType];

  return (
    <Box mb={4}>
      <Card style={{ borderWidth: 2, borderColor: '#0A70C4'}}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid container item xs={3} justify='center' alignItems='center'>
              <Box p={5}>{Icon}</Box>
            </Grid>
              {fileRef.taskIndex === 5
                  ?
                       <>
                      <Grid container item xs={9} >
                        <Grid item xs={12}>
                        <Typography variant='h3' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: '1 1 auto' }}>
                            {title} <br/><br/>Download Signed Agreement
                            <CheckCircleOutlineIcon style={{ color: '#16c92e', fontSize: '2rem' }} />
                          </Typography>
                          <Box my={2}>
                            <Typography variant='body1'>{grantTypeContent.completed}</Typography>
                            {fileRef.task.submissionType==="employee" && 
                            <Typography>
                            <br/>
                            <span style={{fontWeight: 'bold'}}>Note:</span>{"  "}Please return here within 4 weeks of receiving payment from Alberta Health to confirm payment to eligible employees
                            </Typography>}
                          </Box>
                        </Grid>
                        <Grid item container xs={12} justify='flex-end'>
                          <Button style={{ height: "auto" }} text={buttonText} onClick={onClick} fullWidth={false} variant={variant} />
                        </Grid>
                      </Grid>
                    </>
                  : fileRef.task.status === 'complete'
                  ?
                    <>
                      <Grid container item xs={9} >
                        <Grid item xs={12}>
                        <Typography variant='h3' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: '1 1 auto' }}>
                            {title} <br/><br/> Has been signed and uploaded.
                            <CheckCircleOutlineIcon style={{ color: '#16c92e', fontSize: '2rem' }} />
                          </Typography>
                          <Box my={2}>
                            <Typography variant='body1'>{grantTypeContent.submitted}</Typography>
                          </Box>
                        </Grid>
                        <Grid item container xs={12} justify='flex-end'>
                          <Button style={{ height: "auto" }} text={buttonText} onClick={onClick} fullWidth={false} variant={variant} />
                        </Grid>
                      </Grid>
                    </>
                  :
                  <>
                    <Grid container item xs={9} >
                      <Grid item xs={12}>
                      <Typography variant='h3' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: '1 1 auto' }}>
                          {title} <br></br><br></br> Ready for signature
                          <ErrorOutlineIcon style={{ color: '#0A70C4', fontSize: '2rem' }} />
                        </Typography>
                        <Box my={2}>
                          <Typography variant='body1'>{grantTypeContent.notSubmitted.primary}</Typography>
                          <br/>
                          <Typography variant='body2'>{grantTypeContent.notSubmitted.secondary}</Typography>
                          <br/>
                          <Typography variant='body2'>{grantTypeContent.notSubmitted.teritiary}</Typography>
                        </Box>
                      </Grid>
                      <Grid item container xs={12} justify='flex-end'>
                        <Button style={{ height: "auto" }} text={buttonText + ' For Signature'} onClick={onClick} fullWidth={false} variant={variant} />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        style={{ height: "auto" }}
                        text='Upload and Complete'
                        onClick={() => setOpen(true)}
                        fullWidth={true}
                        variant={variant}
                      />
                    </Grid>
                  </>
              }
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        open={isOpen}
        maxWidth='md'
        fullWidth
        disableBackdropClick={true}
      >
        <StyledDialogTitle component="div">
          <Typography component="div" variant="h4">Upload File</Typography>
        </StyledDialogTitle>
        <ContentStyles>
          <Typography variant="body2">
            <Box p={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FileDropzone 
                    acceptedFileTypes={[
                      'application/pdf', // .pdf
                    ]}
                    acceptedFileString='.pdf'
                    minFileSize={1}
                    maxFileSize={5000000}
                    maxNumberOfFiles={1}
                    uploadCallbackHandler={(file) => {
                      handleOperatorDashboardFileUpload(file, fileRef.taskIndex)
                      setOpen(false)
                    }}
                    cancelCallbackHandler={() => setOpen(false)}
                  />
                </Grid>
              </Grid>
            </Box>
          </Typography>
        </ContentStyles>
      </Dialog>
    </Box>
  )
}

export const EmployeesPaid = ({ form, submitEmployeesPaid, isSubmittingEmployeesPaid  }) => {
  const alreadySubmitted = !!form?.employeesPaidDetermination;

  const initialValues = alreadySubmitted? Object.assign(form, {correctInfo: true}): {
    employeesPaidDetermination: '',
    employeesReceivedPayment: '',
    employeesNotReceivedPayment: '',
    employeesNotReceivedPaymentReason: '',
    correctInfo: false,
  }

  // Reset dependent fields when paid determination changes in order to avoid
  // silent validation errors when submitting
  const handlePaidDeterminationChange = (e, setFieldValue) => {
    setFieldValue('employeesPaidDetermination', e.target.value);
    setFieldValue('employeesReceivedPayment', '');
    setFieldValue('employeesNotReceivedPayment', '');
    setFieldValue('employeesNotReceivedPaymentReason', '');
    setFieldValue('correctInfo', false);
  }

  const resetCorrectInfo = (field, e, setFieldValue) => {
    setFieldValue(field, e.target.value);
    setFieldValue('correctInfo', false);
  }

const breakElement = <><br/><br/><br/><br/></>
  return (
    <>
    <Box mb={4}>
      <Grid container>
        <Grid container item xs={12} justify='space-between'>
          <Grid item>
            <Formik
              validationSchema={SubmitEmployeesPaidSchema}
              onSubmit={values => submitEmployeesPaid(form.id, Object.assign({}, values, {
                  employeesNotReceivedPayment: parseInt(values.employeesNotReceivedPayment) || 0,
                  employeesReceivedPayment: parseInt(values.employeesReceivedPayment) || 0
                }))}
              initialValues={initialValues}
            >
            {({ values, setFieldValue }) => (
              <FormikForm>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <FastField
                      disabled={alreadySubmitted}
                      name='employeesPaidDetermination'
                      component={RenderRadioGroup}
                      onChange={e => handlePaidDeterminationChange(e, setFieldValue)}
                      options={[
                        { 
                          label: 'All of your Eligible Employees have received the payment of $1,200.00, in accordance with the HCWB Program and the terms of the Agreement; or', 
                          break: `${breakElement}`,
                          value: 'all_paid'
                        },
                        { 
                          label:  `If you were not able to pay one or more Eligible Employees, the number of Eligible Employees that both have, and have not, received the payment of $1,200.00, in accordance with the HCWB Program and the terms of this Agreement, and the reasons why any of the Eligible Employee(s) have not been paid.`,
                          break: `${breakElement}`,
                          value: 'some_paid' 
                        },
                        
                      ]}
                      
                    />
                  </Grid>
                {values.employeesPaidDetermination === 'some_paid' && (<>
                  <Grid item xs={6}>
                    <FastField
                      disabled={alreadySubmitted}
                      name="employeesReceivedPayment"
                      label="Number of Eligible employees that have received the payment*"
                      type="number"
                      component={RenderTextField}
                      onChange={e => resetCorrectInfo('employeesReceivedPayment',e, setFieldValue)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FastField
                      disabled={alreadySubmitted}
                      name="employeesNotReceivedPayment"
                      label="Number of Eligible employees that have not received payment*"
                      type="number"
                      component={RenderTextField}
                      onChange={e => resetCorrectInfo('employeesNotReceivedPayment',e, setFieldValue)}
                    />
                  </Grid>

                  {parseInt(values.employeesNotReceivedPayment) > 0 && (
                    <Grid item xs={12}>
                      <Grid item xs={12}>
                        <FastField
                          disabled={alreadySubmitted}
                          name="employeesNotReceivedPaymentReason"
                          label="Employees did not receive payment due to*"
                          component={RenderTextField}
                          onChange={e => resetCorrectInfo('employeesNotReceivedPaymentReason',e, setFieldValue)}
                          />
                      </Grid>
                    </Grid>
                  )}
                </>)}

                  {!alreadySubmitted && (<>
                    <Grid item xs={12}>
                      <FastField
                        name='correctInfo'
                        label={"By checking this box, the organization declares that it confirms the statements set out above as they cannot be changed."}
                        component={RenderCheckbox}
                      />
                    </Grid>
                    <Grid container item xs={12} justify='flex-end'>
                      <Button
                          text={'Submit'}
                          type='submit'
                          maxWidth={false}
                          disabled={!values.correctInfo  ||  !values.employeesPaidDetermination || isSubmittingEmployeesPaid}
                          loading={isSubmittingEmployeesPaid}
                        />
                    </Grid>
                  </>)}
                </Grid>
              </FormikForm>
            )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </>


  )
}

export const ApplicationStatus = ({applicationStatus}) => {
  let bkg = "#000"
  switch(applicationStatus){
    case "Denied":
      bkg = "#FF534A";
      break;

    case "Under Review ":
      bkg = "#56BD5B";
      break;

    default:
      bkg = "#56BD5B"
  }
   
  return (
    <Box> 
      <Typography align="center" style={{lineHeight: "1rem", color:"white", backgroundColor:bkg, padding: "5px", fontWeight: "bold",}}>
        {applicationStatus}
      </Typography>
    </Box>
  )
}