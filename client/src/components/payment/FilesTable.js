import React from 'react'
import { Button, Table } from 'components/generic'
import {	Box,	Grid } from '@material-ui/core'
import usePaymentFiles from 'hooks/admin/payment/usePaymentFiles'
import { useGetPaymentFiles} from 'hooks/admin/payment/useGetPaymentFiles'
import { PaymentBatchFileColumns } from 'constants/assessment-portal/tableColumns'
import { usePaymentBatchLookup } from 'hooks/admin/payment/usePaymentBatchLookup'

export const FilesTable = ({ id }) => {
	
  const { submitPaymentFiles } = usePaymentFiles(id)
	const {paymentFilesTableData} =  useGetPaymentFiles(id)
  const { batchDetails } = usePaymentBatchLookup(id)

	return (
		<>
			{paymentFilesTableData && ( batchDetails?.status === 'ready' && batchDetails?.isActive) &&  (
				<Grid container justify='flex-end'>
					<Grid item xs={4}>
						<Box my={2}>
							<Button
								variant='contained'
								text='Submit Payment Files'
								fullWidth='false'
								onClick={() => {
                  submitPaymentFiles(paymentFilesTableData.rows)
                  }}
							/>
						</Box>
					</Grid>
				</Grid>
			)}
			<Table
				data={paymentFilesTableData.rows}
				columns={PaymentBatchFileColumns}
				options={{
					pageSize: 6,
					pageSizeOptions: [6],
				}}
				totalCount={paymentFilesTableData.rows?.length || 0}
			/>
		</>
	)
}
