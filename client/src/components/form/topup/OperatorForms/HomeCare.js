import React from 'react';
import Grid from '@material-ui/core/Grid'
import { Field } from 'formik'
import Box from '@material-ui/core/Box'
import { RenderTextField } from 'components/fields'
import Typography from '@material-ui/core/Typography'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { AdminButton } from 'components/admin/organization-details/Admin-Button'

export function HomeCare({ details, submitDetermination, isDisabled, isAssignedToMe, isApproving, isDenying }) {
  const { status: formStatus} = details || {};
  const approvalButtons = (status)=>{
    return (
      <Grid container direction='row' alignItems="center" justify="flex-end">
        <Box mb={2} mr={4} mt={2}>
          <Grid container spacing={2}>
            <Grid item>
              {formStatus === 'pending' || status === 'approved'? <AdminButton
                color='#8bc34a'
                disabled={status === 'approved'}
                text={status==='approved'?'Approved': 'Approve'}
                variant={status==='approved'?'contained': 'outlined'}
                onClick={()=>submitDetermination("home_care",0,details.id,true, details?.data?.home_care?.status)}
                icon={<CheckCircleOutlineIcon />}
                loading={isApproving.loading && isApproving.type === "home_care"}
              />:''}
            </Grid>
            <Grid item>
              {formStatus === 'pending' || status === 'denied'?<AdminButton
                color='#f50057'
                disabled={status === 'denied'}
                text={status==='denied'?'Denied': 'Deny'}
                variant={status==='denied'?'contained': 'outlined'}
                onClick={()=>submitDetermination("home_care",0,details.id,false, details?.data?.home_care?.status)}
                icon={<HighlightOffIcon />}
                loading={isDenying.loading && isDenying.type === "home_care"}
              />:''}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    )
  }
  const description = (
    <Grid item xs={12}>
      <Typography variant="h4" style={{ paddingBottom: '20px', fontWeight: '600' }}>
        **If you are contracted by AHS to provide home care services,
        funding will be provided to your organization directly by AHS and you do not need to apply for those hours.**
      </Typography>
      <Typography variant="h4">
        If you provide private in-home health and personal care services (i.e. non-contracted health home care), how many hours have you provided from:
      </Typography>
    </Grid>
  )

  return (
    <Box mb={4}>
      { details && <>
        {/* {details.data?.home_care?.status && approvalText(details.data?.home_care?.status)} */}
        {approvalButtons(details.data?.home_care?.status)}
      </> }
      <Grid container spacing={2}>
        {!details && description}
        <Grid item xs={6}>
          <Field
            name='home_care.mar_to_jun'
            label='Mar 15, 2020 - June 30, 2020*'
            placeholder="Required"
            component={RenderTextField}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            name='home_care.jul_to_sep'
            label='Jul 1, 2020 - Sept 30, 2020*'
            placeholder="Required"
            component={RenderTextField}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            name='home_care.oct_to_dec'
            label='Oct 1, 2020 - Dec 31, 2020*'
            placeholder="Required"
            component={RenderTextField}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            name='home_care.jan_to_jan'
            label='Jan 1, 2021 - Jan 31, 2021*'
            placeholder="Required"
            component={RenderTextField}
            disabled={isDisabled}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
