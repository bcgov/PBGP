import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { FieldArray, Field } from 'formik'
import { RenderRadioGroup, RenderTextField, RenderDateField } from 'components/fields'
import { AdminButton } from './Admin-Button'

export function ReviewFormCategories({ title, details, element, isDisabled, Questions, inputs, name, values, info, submitDetermination, isAssignedToMe, isApproving, isDenying }) {
  let {status}=details
  return (
    <Box my={2}>
      <Card key={element}>
        <Box p={4}>
          <Typography variant='h5'>{title}</Typography>
          <Grid container spacing={2} >
            <Typography variant='h5' style={{ paddingBottom: '20px', fontWeight: '600' }}>
              {info}
            </Typography>
            <FieldArray
              name={name}
              render={() => (
                <>
                  {
                    values.map((obj, i) => {
                      let isFlagged = obj.payment_amount && obj.payment_amount < 0;
                      return (
                        <React.Fragment key={i}>
                          <Box my={2} style={{ border: isFlagged ? '3px solid rgba(200, 0, 0, 1)' : null }}>
                            <Divider />
                            <Grid container direction='row' alignItems="center" justify="flex-end">
                              {isFlagged ?
                                <Box my={2} mr={2} spacing={2}>
                                  <Typography variant={"subtitle1"}>This facility has a negative payout of: $ {obj.payment_amount.toFixed(2)}</Typography>
                                </Box>
                                : null}
                              <>
                                <Box my={2} mr={2}>
                                  {
                                    status === 'pending' && isAssignedToMe || obj.status === 'approved'
                                      ? <AdminButton
                                        color='#8bc34a'
                                        disabled={obj.status === 'approved'}
                                        text={obj.status === 'approved' ? 'Approved' : 'Approve'}
                                        variant={status === 'approved' ? 'contained' : obj.status === 'approved' ? 'contained' : 'outlined'}
                                        onClick={() => submitDetermination(name, i, details.id, true, obj.status)}
                                        icon={<CheckCircleOutlineIcon />}
                                        loading={isApproving.loading && isApproving.type === name && isApproving.index === i}
                                      />
                                      : ''
                                  }
                                </Box>
                                <Box my={2} mr={4}>
                                  {
                                    status === 'pending' && isAssignedToMe || obj.status === 'denied'
                                      ? <AdminButton
                                        color='#f50057'
                                        disabled={obj.status === 'denied'}
                                        text={obj.status === 'denied' ? 'Denied' : 'Deny'}
                                        variant={status === 'denied' ? 'contained' : obj.status === 'denied' ? 'contained' : 'outlined'}
                                        onClick={() => submitDetermination(name, i, details.id, false, obj.status)}
                                        icon={<HighlightOffIcon />}
                                        loading={isDenying.loading && isDenying.type === name && isDenying.index === i}
                                      />
                                      : ''
                                  }
                                </Box>
                              </>
                            </Grid>
                            <Grid container padding={2} justify='center' direction='column'>
                              <Grid container gap={2} key={i} spacing={2}>
                                {inputs.map((input) => (
                                  <React.Fragment key={`${name}[${i}].${input.name}`}>
                                    <Grid item xs={12} sm={6}>
                                      <Box p={1}>
                                        <Field
                                          key={i}
                                          disabled={isDisabled}
                                          name={`${name}[${i}].${input.name}`}
                                          label={input.required ? `${input.label}*` : input.label}
                                          placeholder={input.required ? 'Required' : ''}
                                          component={
                                            input.type === 'date'
                                              ? RenderDateField
                                              : input.type === 'bool'
                                                ? RenderRadioGroup
                                                : RenderTextField
                                          }
                                          info={input.info ? input.info : null}
                                          options={input.type === 'bool' ? Questions : []}
                                        />
                                      </Box>
                                    </Grid>
                                  </React.Fragment>
                                ))}
                              </Grid>
                            </Grid>
                          </Box>
                        </React.Fragment>
                      )
                    })
                  }
                </>
              )}
            />
          </Grid>
        </Box>
      </Card>
    </Box>
  )
}
