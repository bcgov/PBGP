import React, { useState } from 'react'
import { Typography, Grid, Dialog, Box } from '@material-ui/core';

import { Button, Card, StyledDialogTitle, StyledDialogContent, Table } from 'components/generic'
import { FilesTableColumns } from 'constants/assessment-portal/tableColumns';
import { OrganizationContext } from "providers";
import { useAgreementFileUpload } from 'hooks/admin';
import { FileDropzone } from 'components/generic/FileDropzone';

export default function FilesReview() {
  const {
    organization: {
      organizationDetails,
    },
    agreementFiles: {
      isFetchingFiles,
      filesList,
    }
  } = React.useContext(OrganizationContext);

  const {
    handleFileUpload,
  } = useAgreementFileUpload()

  const [isOpen, setOpen] = useState(false)

  const ContentStyles = StyledDialogContent();
  const organizationId = organizationDetails.organizationId;

  return (
    <Card title={'Files'} style={{ textTransform: 'capitalize' }} color='#FEBA35'>
      <Grid container direction='row' alignItems='center' justify='flex-end'>
        <Box mb={4} mr={2}>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                color='#8bc34a'
                variant='contained'
                text='Upload File'
                onClick={() => setOpen(true)}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid container >
        <Grid item xs={12}>
          <Table
            data={filesList}
            isEditable={false}
            isLoading={isFetchingFiles}
            isAssessmentPortal={true}
            columns={FilesTableColumns}
            totalCount={filesList?.length}
            options={{
              doubleHorizontalScroll: true,
              pageSize: 5,
              pageSizeOptions: [5]
            }}
          />
        </Grid>
      </Grid>

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
                      'application/vnd.ms-excel', // .xls
                      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
                      'application/pdf', // .pdf
                      'text/plain', // .txt
                      'text/csv', // .csv
                      'application/msword', // .doc
                      'application/vnd.openxmlformats-officedocument.wordprocessingm', //.docx
                    ]}
                    acceptedFileString='.xls .xlsx .csv .doc .docx .txt .pdf'
                    minFileSize={1}
                    maxFileSize={5000000}
                    maxNumberOfFiles={1}
                    uploadCallbackHandler={(file) => {
                      handleFileUpload(organizationId, file)
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
    </Card>
  )
}