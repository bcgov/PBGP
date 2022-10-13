import React from 'react'
import { Typography, Container, Grid, Box} from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import { useFormikContext } from 'formik'
import { Card } from 'components/generic'
import { HomeCare } from 'components/form/topup/OperatorForms/HomeCare'
import { ReviewFormCategories } from './ReviewFormCategories'
import { lsl, mental_health, addictions, hospice } from 'constants/topup/initialValues'
import { LSLInputs, MentalHealthInputs, AddictionsInputs, HospiceInputs } from 'constants/topup/OperatorInputs'
import { Questions } from 'constants/arrays'

function RenderOperatorForm(form, values, details, isDisabled, submitDetermination, isAssignedToMe, isApproving, isDenying) {
  return (
    <>
      {
        form.map(element => {
          switch (element) {
            case 'Lsl':
              return (
                <ReviewFormCategories
                  key={element}
                  element={element}
                  title="Licensed Supportive Living"
                  isDisabled={isDisabled}
                  name='lsl'
                  inputs={LSLInputs}
                  values={values.lsl}
                  initVal={lsl}
                  details={details}
                  infoMessage={LSLInputs.infoMessage}
                  submitDetermination={submitDetermination}
                  isAssignedToMe={isAssignedToMe}
                  isApproving={isApproving}
                  isDenying={isDenying}
                />
              )
            case 'Residential Community Hospice':
              return (
                <ReviewFormCategories
                  key={element}
                  element={element}
                  title='Residential Community Hospice (providers 24hr care)'
                  isDisabled={isDisabled}
                  inputs={HospiceInputs}
                  name='hospice'
                  details={details}
                  values={values.hospice}
                  initVal={hospice}
                  infoMessage='If you are contracted by AHS for community palliative and hospice beds funding will provided to your organization directly through AHS.'
                  submitDetermination={submitDetermination}
                  isAssignedToMe={isAssignedToMe}
                  isApproving={isApproving}
                  isDenying={isDenying}
                />
              )
            case 'Mental Health':
              return (                
                <ReviewFormCategories
                  key={element}
                  element={element}
                  title="Mental Health"
                  isDisabled={isDisabled}
                  details={details}
                  inputs={MentalHealthInputs}
                  values={values.mental_health}
                  initVal={mental_health}
                  name='mental_health'
                  Questions={Questions}
                  submitDetermination={submitDetermination}
                  isAssignedToMe={isAssignedToMe}
                  isApproving={isApproving}
                  isDenying={isDenying}
                />
              )
            case 'Addictions':
              return (
                <ReviewFormCategories
                  key={element}
                  element={element}
                  title="Addictions"
                  details={details}
                  isDisabled={isDisabled}
                  inputs={AddictionsInputs}
                  values={values.addictions}
                  initVal={addictions}
                  name='addictions'
                  Questions={Questions}
                  submitDetermination={submitDetermination}
                  isAssignedToMe={isAssignedToMe}
                  isApproving={isApproving}
                  isDenying={isDenying}
                />
              )
            case 'Home Care':
              return (
                <Box py={2} key={element}>
                  <Card>
                    <Typography variant='h5'>
                      Home Care
                      <Tooltip
                        title={
                          `If you are contracted by AHS to provide home care services,
                          funding will be provided to your organization directly by AHS and you do not need to apply for those hours.
                          If you provide private in-home health and personal care services (i.e. non-contracted health home care),
                          how many hours have you provided from:`
                        }
                      >
                        <InfoIcon />
                      </Tooltip>
                    </Typography>
                    <HomeCare
                      isDisabled={true}
                      details={details}
                      submitDetermination={submitDetermination}
                      isAssignedToMe={isAssignedToMe}
                      isApproving={isApproving}
                      isDenying={isDenying}
                    />
                  </Card>
                </Box>
              )
            default:
              return null
          }
        })
      }
    </>
  )
}
  
export const OperatorInfo = ({isAssignedToMe, isApproving, isDenying, isDisabled, details, submitDetermination }) => {
  const { values } = useFormikContext()
  return (
    <Container maxWidth='md' >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {RenderOperatorForm(values.category, values, details, isDisabled, submitDetermination, isAssignedToMe, isApproving, isDenying)}
          </Grid>
        </Grid>
    </Container>
  )
}


