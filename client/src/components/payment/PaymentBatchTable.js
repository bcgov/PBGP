import React from 'react'
import { Card, Table } from 'components/generic'
import { paymentBatchTableColumns } from 'constants/arrays'


export default ({ data, isLoading, cardName}) => (
    <Card title={cardName} color="#FEBA35">
      <Table
        data={data?.rows}
        isEditable={false}
        isLoading={isLoading} // TODO: replace with isLoading
        isAssessmentPortal={true}
        columns={paymentBatchTableColumns}
        totalCount={data?.rows?.length || 0}
        options={{
          doubleHorizontalScroll: true,
          pageSize: 5,
          pageSizeOptions: [5]
        }}
      />
    </Card>
  )
