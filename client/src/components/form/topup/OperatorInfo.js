import React, { useState, useRef, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { useFormikContext, Field } from 'formik'
import { useTranslation } from 'react-i18next'
import { Card } from 'components/generic'
import { FormCategory } from 'components/form/topup/OperatorForms/FormCategory'
import { HomeCare } from 'components/form/topup/OperatorForms/HomeCare'
import { RenderMultiSelect } from 'components/fields/RenderMultiSelect'
import { categories } from 'constants/topup/operatorOptions'
import { operatorInfo, lsl, mental_health, addictions, hospice } from 'constants/topup/initialValues'
import { LSLInputs, MentalHealthInputs, AddictionsInputs, HospiceInputs } from 'constants/topup/OperatorInputs'
import { Questions } from 'constants/arrays'
import { useAutoSave } from 'hooks/topup'

function RenderOperatorForm(form, values, isDisabled) {
  return (
    <>
      {
        form.map(element => {
          switch (element) {
            case 'Lsl':
              return (
                <Box key={element} my={2.5}>
                  <Box >
                    <Typography variant='h5'>Licensed Supportive Living</Typography>
                    <hr />
                  </Box>
                  <FormCategory
                    isDisabled={isDisabled}
                    name='lsl'
                    inputs={LSLInputs}
                    values={values.lsl}
                    initVal={lsl}
                    infoMessage={LSLInputs.infoMessage}
                  />
                </Box>
              )
            case 'Residential Community Hospice':
              return (
                <Box key={element} my={2.5}>
                  <Box >
                    <Typography variant='h5'>{'Residential Community Hospice (providers 24hr care)'}</Typography>
                    <hr />
                  </Box>
                  <FormCategory
                    isDisabled={isDisabled}
                    inputs={HospiceInputs}
                    name='hospice'
                    values={values.hospice}
                    initVal={hospice}
                    infoMessage='If you are contracted by AHS for community palliative and hospice beds funding will provided to your organization directly through AHS.'
                  />
                </Box>
              )
            case 'Mental Health':
              return (
                <Box key={element} my={2.5}>
                  <Box >
                    <Typography variant='h5'>Mental Health</Typography>
                    <hr />
                  </Box>
                  <FormCategory
                    isDisabled={isDisabled}
                    inputs={MentalHealthInputs}
                    values={values.mental_health}
                    initVal={mental_health}
                    name='mental_health'
                    Questions={Questions}
                  />
                </Box>
              )
            case 'Addictions':
              return (
                <Box key={element} my={2.5}>
                  <Box >
                    <Typography variant='h5'>Addictions</Typography>
                    <hr />
                  </Box>
                  <FormCategory
                    isDisabled={isDisabled}
                    inputs={AddictionsInputs}
                    values={values.addictions}
                    initVal={addictions}
                    name='addictions'
                    Questions={Questions}
                  />
                </Box>
              )
            case 'Home Care':
              return (
                <Box key={element} my={2.5} style={{breakAfter: 'always',
                breakInside: 'avoid'}}>
                  <Box >
                    <Typography variant='h5'>Home Care</Typography>
                    <hr />
                  </Box>
                  <HomeCare isDisabled={isDisabled} />
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

export const OperatorInfo = ({ isDisabled, id, disableAutosave}) => {
  const { t } = useTranslation()
  const { setFieldTouched, values, setFieldValue } = useFormikContext()
  const { autoSave } = useAutoSave()
  
  const useInterval = (callback, delay) => {
    const savedCallback = useRef()
  
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let interval = setInterval(tick, delay)
          return () => clearInterval(interval)
      }
    }, [delay])
  }

  useInterval(() => {
    if (isDisabled || disableAutosave){
      return
    } else {
       autoSave({ ...values })
  }}, 30000)

  const handleCategoryChange = (event) => {
    const changeValue = event.target.value
    setFieldValue('category', changeValue)
    if (!changeValue.includes('Lsl')) setFieldValue('lsl', operatorInfo.lsl)
    if (!changeValue.includes('Home Care')) setFieldValue('home_care', operatorInfo.home_care)
    if (!changeValue.includes('Mental Health')) setFieldValue('mental_health', operatorInfo.mental_health)
    if (!changeValue.includes('Addictions')) setFieldValue('addictions', operatorInfo.addictions)
    if (!changeValue.includes('Residential Community Hospice')) setFieldValue('hospice', operatorInfo.hospice)

    //Have to do these separately after setFieldValue otherwise validation collision occurs
    if (!changeValue.includes('Lsl')) setFieldTouched('lsl', false, false)
    if (!changeValue.includes('Home Care')) setFieldTouched('home_care', false, false)
    if (!changeValue.includes('Mental Health')) setFieldTouched('mental_health', false, false)
    if (!changeValue.includes('Addictions')) setFieldTouched('addictions', false, false)
    if (!changeValue.includes('Residential Community Hospice')) setFieldTouched('hospice', false, false)
  }

  return (
    <Container maxWidth='md'>
      <Grid container spacing={2} id="form-inner-wrapper">
        <Grid item xs={12} id='select-field'>
          <Box mt={1.5} >
            <Field
              component={RenderMultiSelect}
              name='category'
              label='Select one or more categories (You may select multiple categories to submit at once)'
              options={categories}
              onChange={handleCategoryChange}
              disabled={isDisabled}
            />
          </Box>
        </Grid>
        <Grid item xs={12} id='pre-dynamic' style={{pageBreakBefore: 'always'}}>
          {RenderOperatorForm(values.category, values, isDisabled)}
        </Grid>
      </Grid>
    </Container>
  )
}


