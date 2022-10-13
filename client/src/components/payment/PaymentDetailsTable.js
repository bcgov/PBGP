import React, { useRef } from 'react'
import { Button, Table } from 'components/generic'
import {
	Grid,
} from '@material-ui/core'
import { usePaymentBatchLookup } from 'hooks/admin/payment/usePaymentBatchLookup'
import { PaymentTableColumns } from 'constants/assessment-portal'
import {useGetApplicationPayments} from 'hooks/admin/payment/useGetApplicationPayments'

export const PaymentDetailsTable = ({id}) => {
  const tableRef = useRef()
	const {
		tableData,
		edit,
		removeFromBatch,
		selectedRow,
		setSelectedRow,
		batchDetails,
    generatePaymentFiles
	} = usePaymentBatchLookup(id)
  const {activePaymentBatch} = useGetApplicationPayments();

  const clearSelection = () => {
		if (tableRef.current) {
			tableRef.current.onAllSelected(false)
		}
	}

return(
<>
<Grid container spacing={3} justify="flex-end">

		{edit   && (

			<Grid item xs={12} sm={4} md={3}>
			{ batchDetails?.status === 'open' &&  	<Button
					text='Remove Applications from Batch'
					disabled={!selectedRow?.length}
					onClick={() => {
						removeFromBatch()
					}}
				/> }
			</Grid>
		)}
		{!!selectedRow?.length &&
			<Grid item xs={12} sm={4} md={3}>
				{ batchDetails?.status === 'open' ? <Button text='Clear Selections' variant='outlined' onClick={clearSelection} />: null}
			</Grid>
		}

{batchDetails?.isActive && batchDetails?.status === 'open'  && !!tableData?.rows?.length && (
			<Grid item xs={12} sm={4} md={3}>
				<Button
					color='#8bc34a'
					variant='contained'
					text='Generate Payment Files'
					onClick={generatePaymentFiles}
				/>
			</Grid>
		)}
    <Grid item xs={12} sm={4} md={3}>{" "}</Grid>

		{tableData   && (
      <Grid item xs={12}>
			<Table
				columns={[...PaymentTableColumns, { title: '', field: 'viewOrg' }]}
				data={tableData.rows}
				totalCount={tableData.count || 0}
				options={{
					pageSize: 10,
					pageSizeOptions: [10],
					selection: edit && batchDetails?.status === 'open' ,
					rowStyle: (rowData) => ({
						backgroundColor: selectedRow
							?.map((element) => element?.tableData.id)
							.includes(rowData.tableData.id)
							? '#caecfc'
							: rowData?.tableData?.id % 2 !== 0
							? '#f7f7f7'
							: '#FFF',
					}),
				}}
				onSelectionChange={(rows) => {
					setSelectedRow(rows)
				}}
				tableRef={tableRef}
			/>
      </Grid>
		)}
    </Grid>
	</>
)
}
