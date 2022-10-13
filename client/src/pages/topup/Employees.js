import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Card, CardContent, Box, Container, Grid, Typography, Dialog, withStyles, DialogContent } from '@material-ui/core'
import { SecondaryButton, Button, Page, PageHeader, Table, StyledDialogActions, StyledDialogTitle } from 'components/generic'
import { useEmployeeDetailsForm, useEmployeeXmlParser } from 'hooks'
import { RenderFileDropzone } from 'components/fields/RenderFileDropzone'
import UploadABBlue from 'assets/images/upload-ABBlue.png'

export const StyledDialogContent = textAlign => withStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    textAlign: textAlign || 'center',
  },
}))(DialogContent);

export default function EmployeesTopUp() {
  const {
    fileData,
    tableData,
    isFileUploaded,
    isFileValid,
    isParsing,
    triggerReportDownload,
    triggerTemplateDownload,
    handleFileDrop
  } = useEmployeeXmlParser()
  const { submit, isFetching } = useEmployeeDetailsForm()
  const { pathname } = useLocation()

  return (
    <Page>
      <PageHeader
        header='Employee Benefits Application' subheader={pathname.includes('view') ? null : pathname.includes('edit') ? 'Edit your employee information below...' : 'Upload your employee information below...'}/>
      <Container maxWidth='lg' style={{ paddingBottom: '40px' }}>
        <Container maxWidth='md'>
          <Box mt={2} mb={4}>
            <Box my={2}>
              <Typography>
                <Link to='/'>Dashboard</Link>{' > Employee Benefits'}
              </Typography>
            </Box>
          </Box>
          <Container maxWidth='sm'>
            <Box mt={4} mb={4} >
              <Grid container spacing={2} >
                <Grid item xs={12}>
                  <Typography variant='h3' align='center' >
                    You are responsible for ensuring that you have complied with all applicable privacy legislation
                    before uploading the personal information of eligible employees
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h4' align='center' >
                    Please download both the Application Template
                    and the Application Template Guide. The Application Template Guide contains
                    information on how to fill in the Application Template to ensure all data is collected properly by the system.
                  </Typography>
                </Grid>
                <Container maxWidth='xs'>
                  <Box mt={2}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Button variant='outlined' style={{ marginBottom: '10px' }} text='Download Application Template' onClick={() => triggerTemplateDownload('template')} />
                      </Grid>
                      <Grid item xs={6}>
                        <Button variant='outlined' text='Download Application Template Guide' onClick={() => triggerTemplateDownload('data_standards')} />
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </Grid>
            </Box>
          </Container>
          <Container maxWidth='sm'>
            <Box mt={2} mb={4}>
              <Box mb={4}>
                <Card style={{ borderWidth: 2 }}>
                  <CardContent>
                    <RenderFileDropzone
                      isFileUploaded={isFileUploaded}
                      isFileValid={isFileValid}
                      isLoading={isParsing}
                      uploadCallbackHandler={(file) => handleFileDrop(file)}
                      icon={UploadABBlue}
                    />
                  </CardContent>
                </Card>
              </Box>
              {
                isFileUploaded && !isFileValid
                  &&
                  <Box mb={4}>
                    <Card style={{ borderWidth: 2 }}>
                      <CardContent>
                        <Grid container padding={2} maxWidth='sm' justify='center' direction='column'>
                          <Typography variant='h6' style={{ paddingBottom: '10px' }}>Errors were found in the file uploaded.</Typography>
                          <Grid item xs={6}>
                            <SecondaryButton
                              fullWidth={false}
                              type='button'
                              text='Download Error Report'
                              onClick={triggerReportDownload}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Box>
              }
            </Box>
          </Container>
            <Container maxWidth="sm">
              <Button text='Upload' loading={isFetching} onClick={() => submit(fileData)} disabled={!isFileValid} />
            </Container>
        </Container>
      </Container>
    </Page >
  )
}


