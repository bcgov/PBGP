import React from 'react'
import { Container, Box, Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { FastField, useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { RenderTextField, RenderDateField, RenderSelectField, RenderCheckUpload } from 'components/fields'
import {OrgInfo, MailingInfo, Rep, BankingInfo, Contact } from 'constants/topup/OrgInfo'
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

export const OrganizationInfo = ({ hidden, isDisabled}) => {
  const { values, errors} = useFormikContext()
  const { t } = useTranslation()
  const handleInputMapping=(i,index)=>{
    switch (i.name){
      case "health_setting":
        // Only show on edit and create pages
        if(!isDisabled){
          return (
            <Grid item xs={12} md={6} key={index}>
          {
            <Typography variant="subtitle2" style={{ display: "flex", alignItems: "center" }}>
              {i.label+"*"}&nbsp;<Tooltip title="If multiple company types apply, please select the one that represents the greatest proportion of your company’s business"><InfoIcon fontSize="small" color="inherit" /></Tooltip>
            </Typography>
          }
          <FastField
            name={i.name}
            placeholder={i.required ? 'Required' : ''}
            component={RenderSelectField}
            options={ i.options }
            disabled={isDisabled}
          />
        </Grid>
        )
      }
      default:
      return (<Grid item xs={12} md={6} key={index}>

        <FastField
          name={i.name}
          label={i.required ? `${i.label}*` : i.label}
          placeholder={i.required ? 'Required' : ''}
          component={
            i.type === 'date'
              ? RenderDateField
              : i.type === 'select'
                ? RenderSelectField :
                i.type === 'file'
                  ? RenderCheckUpload
                  : RenderTextField
          }
          options={i.type === 'select' ? i.options : null}
          disabled={isDisabled}
        />
      </Grid>)
    }

  }

  return (
    <Container maxWidth='md'>
        <Grid container spacing={2}>
          {
            [OrgInfo, MailingInfo, Rep, Contact, BankingInfo].map((section, index) => (
              <React.Fragment key={section.title}>
                {!index ? null : <Grid item xs={12}>
                  <Box py={2}>
                    <Typography variant='h5'>{section.title}</Typography>
                    <hr />
                  </Box>
                </Grid>}
                {
                  section.inputs.map(handleInputMapping)
                }
              </React.Fragment>
            ))
          }
        </Grid>
    </Container>
  )
}



