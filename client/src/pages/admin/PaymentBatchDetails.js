import React, { useState, useRef } from 'react'
import { Button, Card, Page, PageHeader, Table } from 'components/generic'
import { Link, useParams } from 'react-router-dom'
import { Box, Typography, Container, Grid } from '@material-ui/core'
import { useCheckPaymentAuth } from 'hooks/admin/payment/useCheckPaymentAuth'
import PaymentUpload from 'components/payment/PaymentUpload'
import { FilesTable } from 'components/payment/FilesTable'
import { PaymentDetailsTable } from 'components/payment/PaymentDetailsTable'
import { usePaymentBatchLookup } from 'hooks/admin/payment/usePaymentBatchLookup'
import {useGetApplicationPayments} from 'hooks/admin/payment/useGetApplicationPayments'
import { Route } from 'constants/routes'
import { PaymentBatchStatus } from 'constants/payment/paymentBatchStatus';
import { PaymentUploadFilesTable } from 'components/payment/PaymentUploadFilesTable'
import { usePaymentUploadPage } from 'hooks'

function PaymentBatchDetails() {
	const { id } = useParams()
	const { auth } = useCheckPaymentAuth()
  const {activePaymentBatch} = useGetApplicationPayments(id);
	const { onCancelPaymentBatch, batchDetails, paymentFilesFlag, refreshData } = usePaymentBatchLookup(id)
  const { uploadedFiles } = usePaymentUploadPage()
  return (
    <Page>
      <PageHeader header='Payments' maxWidth='md' disableGutters />
      <Container maxWidth='md' disableGutters>
        <Container maxWidth='md'>
          <Box mt={2} mb={4}>
            <Box my={2}>
              <Typography>
                <Link to={Route.AdminPortalPaymentPage}>Back</Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Container>
			<Container maxWidth='md'>      
				<Grid container justify='flex-end'>
					<Grid item xs={12} sm={4}>
						{(batchDetails?.status === 'open' || batchDetails?.status === 'ready')&& (<Button
							text='Cancel Payment Batch'
							fullWidth='false'
							onClick={onCancelPaymentBatch}
						/>)}      
					</Grid>
          <Grid item xs={12}>
            <Box my={2}>
              <Card title={`Payment Batch ${id}`} color='#FEBA35' subtitle={PaymentBatchStatus[batchDetails?.status]}>
                <Box mb={3} mt={1}>
                  <PaymentDetailsTable id={id} />
                </Box>
              </Card>
            </Box>
          </Grid>          
          <Grid item xs={12}>
            {/* Comment out part belongs to some other tickets ? */}
            <Box my={2}>
              <Card title='Payment Batch Files' color='#FEBA35'>
                <Box mb={3} mt={1}>
                  <FilesTable paymentBatch={batchDetails} id={id} />
                </Box>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box my={2}>
              <Card title='Upload Performed Payment Record' color='#FEBA35'>
                <Box mb={3} mt={1}>
                  <PaymentUpload auth={auth} />
                </Box>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box my={2}>
              <Card title='Previously Uploaded Performed Payment Records' color='#FEBA35'>
                <Box mb={3} mt={1}>
                  <PaymentUploadFilesTable />
                </Box>
              </Card>
            </Box>
          </Grid>        
        </Grid>
      </Container>
    </Page>
  )
}

export default PaymentBatchDetails