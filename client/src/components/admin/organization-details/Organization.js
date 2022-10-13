import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { Form } from 'components/form/topup/OrganizationInfo'
import { useOrganizationDetailsLookup } from 'hooks'
import { Card } from 'components/generic'

function ConfirmationNumber({ number }) {
  return (
    <Box py={2} px={4}>
      <Typography>
        <b>Confirmation Number:</b> {number}
      </Typography>
    </Box>
  )
}

export default function CompanyTopUp({ subId }) {
  const { id } = useParams()
  const { details, isFetching } = useOrganizationDetailsLookup(subId, id)
  
  
  return (
    <>
    <Card title={"Organization Info"} subtitle={"Pending"} color= '#FEBA35'>
      {details?.confirmationNumber ? <ConfirmationNumber number={details.confirmationNumber} /> : null}
      
      <Form
        details={details?.data}
        onSubmit={() => { }}
        isFetching={isFetching}
        isEditing={false}
        initialValues={{
          ...details?.data
        }}
        disabled={disabled}
      />
      <Box my={2} mx={4}>
        {details && <img src={cheque} style={{ width: 300 }} />}
      </Box>
      </Card>
    </>
  )
}
