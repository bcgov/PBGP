import React, {useEffect, useState} from 'react'
import { AxiosPrivate } from 'utils'
import { useToast, useModal } from 'hooks'
import {
  Box,
  Typography,
  Grid,
  Checkbox
} from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'
import { Banner } from 'components/payment/UploadBanner'
import { useHistory } from 'react-router'

export default function usePaymentsFiles(id) {
  const history = useHistory()
  const { openToast } = useToast()
  const { openModal, closeModal } = useModal()
  const [loading, setLoading] = useState(undefined)

  const onHandleSubmit = async () => {
    try {
      const { data } = await AxiosPrivate.post(`/api/v2/assessment-portal/payment/payment-file/send-sftp/${id}`)
      data &&
      history.go(0)
        openToast({
          status: 'success',
          message: <Banner/>
        })
    } catch (e) {
      openToast({
        status: 'error',
        message: 'Failed to submit payment forms',
      })
    } finally {
      closeModal()
    }
  }

  const [checked, setChecked] = useState(null)
  const handleChange = (e) => {
    setChecked(!checked)
    closeModal()
    openModal({
        title: 'Confirm Selection',
        description: "Submit Files?",
        negativeActionText: 'Cancel',
        positiveActionText: 'Yes, Continue',
        negativeActionOnClick: () => closeModal(),
        positiveActionOnClick: () => onHandleSubmit(),
        disableOnClick:true,
    })

  }

  return {
    submitPaymentFiles: () =>
      openModal({
        title: 'Confirm Selection',
        description: (
          <>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='space-between'
            >
              <Grid item xs={12}>
                <Box
                  style={{ backgroundColor: 'rgba(255,0,0, .3)' }}
                  px={2}
                  py={2}
                  mx={2}
                  textAlign='left'
                >
                  <Grid container direction='row' justify='space-between'>
                    <Grid item xs={11}>
                      <Typography variant='body2'>
                      <span style = {{fontWeight: "bold"}}>Warning: You are about to submit this payment file to 1GX{" "}</span>
                        Please confirm that your wish to proceed with this action. Once you click 'Continue', this action cannot be undone.
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <ErrorIcon style={{ color: 'rgb(255,0,0)' }} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Checkbox onChange={handleChange}/>
                  <Typography variant='body2' align="left">
                    I have read the message above
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        ),
      }),
    loading,
  }
}



