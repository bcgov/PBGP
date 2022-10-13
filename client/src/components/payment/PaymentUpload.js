import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { CardContent, Box, Container, Grid, Typography, Dialog, withStyles, DialogContent } from '@material-ui/core'
import { Card, SecondaryButton, Button, Page, PageHeader, Table, StyledDialogActions, StyledDialogTitle } from 'components/generic'
import { usePaymentUploadPage, usePaymentXmlParser } from 'hooks'
import { RenderFileDropzone } from 'components/fields/RenderFileDropzone'
import UploadABBlue from 'assets/images/upload-ABBlue.png'

export const StyledDialogContent = textAlign => withStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    textAlign: textAlign || 'center',
  },
}))(DialogContent);

export default function PaymentUpload({ auth }) {
  const {
    fileData,
    rawData,
    isFileUploaded,
    isFileValid,
    isParsing,
    triggerReportDownload,
    triggerTemplateDownload,
    handleFileDrop
  } = usePaymentXmlParser()
  const { buttonDisabled, submit, isFetching } = usePaymentUploadPage()
  const uploadData = { fileData, rawData }
  return (

    <Box my={4}>

      <Container maxWidth='sm'>
        <Box mt={2} mb={4}>
          <Box mb={4}>
            <Card style={{ borderWidth: 2 }}>
              <CardContent>
                <RenderFileDropzone
                  isFileUploaded={isFileUploaded}
                  isFileValid={isFileValid}
                  isLoading={isParsing}
                  uploadCallbackHandler={(file) => {
                    handleFileDrop(file)
                  }}
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
        <Button text={!auth ? 'Unauthorized' : buttonDisabled ? 'Upload Success' : 'Upload'} loading={isFetching} onClick={() => {
          submit(uploadData)
        }} disabled={!auth || !isFileValid || buttonDisabled} />
      </Container>
    </Box>
  )
}


