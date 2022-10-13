import React from 'react'
import { Table } from 'components/generic'
import { UploadPaymentFilesColumns } from 'constants/assessment-portal'
import { usePaymentUploadPage } from 'hooks'


export const PaymentUploadFilesTable = () => {

const {
  tableData, 
  onChangePage,
  onSelectionChange
  }=usePaymentUploadPage()

	return (
		<>
    <Table
        columns={UploadPaymentFilesColumns}
        onChangePage={onChangePage}
        onSelectionChange={onSelectionChange}
        data={tableData.rows}
        currentPage={tableData.currentPage}
        totalCount={tableData.totalRows}
        options={{
          pageSize: 10,
          pageSizeOptions: [10],
          sorting: true,
        }}        
      />			
		</>
	)
}
