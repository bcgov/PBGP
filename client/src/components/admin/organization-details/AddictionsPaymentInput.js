import React, { useState } from 'react'
import {Divider, Box, Grid, makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputFieldLabel, InputFieldError } from 'components/generic'
import { Button } from 'components/generic'
import { useHandleSubmitAddictions } from 'hooks/admin'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

// TODO: Add validation so the user can only submit numbers. Currently anything goes
export const AddictionsPaymentInput = ({ id, previousAmount }) => {
  const classes = useStyles()
  const [amount, setAmount] = useState(null)
  const { submitAddictionsAmount, isAddictionsAmountLoading } = useHandleSubmitAddictions()

  return (
    <Box px={3} my={4}>
      <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row-wrap', alignItems: 'flex-end' }}>
        <>
          <Grid item xs={10} sm={10} lg={9} md={9}>
            <InputFieldLabel label='Amount - CAN$ already received *' />
              <TextField
                fullWidth
                onChange={(e) => setAmount(e.target.value)}
                // value={amount}
                variant='outlined'
                name='operator_paid_amount'
                placeholder={previousAmount ? parseFloat(previousAmount).toFixed(2) : 'No Value Has Been Submitted'}
                InputProps={{
                  endAdornment: (
                    <>
                      <Divider className={classes.divider} orientation='vertical' />
                      <InputAdornment position='end' color='common.lighterGrey'>
                        <AttachMoneyIcon fontSize='small' />
                      </InputAdornment>
                  </>
                )
              }}
            />
            <InputFieldError />
          </Grid>
          <Grid item xs={4} sm={3} lg={3} md={3}>
            <Button
              variant='contained'
              text={previousAmount ? 'Update' : 'Submit'}
              onClick={() => submitAddictionsAmount(id, amount)}
              style={{ height: '48px' }}
              loading={isAddictionsAmountLoading}
            />
          </Grid>
        </>
      </Grid>
    </Box>
  )
}