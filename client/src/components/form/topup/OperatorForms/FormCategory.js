import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { FieldArray, Field } from 'formik'
import { RenderRadioGroup, RenderTextField, RenderDateField } from 'components/fields'
import { Card } from 'components/generic'
import { RemoveButton, AddButton } from 'components/form/topup/OperatorForms/FormHelpers'

export function FormCategory({ isDisabled, Questions, inputs, name, initVal, values, infoMessage }) {
  return (
    <>
      {infoMessage && (
        <Typography variant='h4' style={{ paddingBottom: '20px', fontWeight: '600' }}>
          {infoMessage}
        </Typography>
      )}
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <Grid container spacing={2} className='facility-wrapper'>
            {values.map((obj, i) => (
                <div style={{pageBreakAfter: 'always',
                  pageBreakInside: 'avoid'}}>
              <Grid key={i} item xs={12}>
                <Card title={`Facility #${i + 1}`} isTitleSmall noPadding>
                  <Box p={1}>
                    <Grid container key={i} spacing={2} >
                      {inputs.map((input) => (
                        <React.Fragment key={input.name}>
                          <Grid item xs={6} sm={6}>
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
                                options={input.type === 'bool' ? Questions : null}
                              />
                            </Box>
                          </Grid>
                        </React.Fragment>
                      ))}
                      {!isDisabled && i > 0 && (
                        <Grid item xs={12}>
                          <Box mt={4} mb={1} display="flex" justifyContent="flex-end">
                            <RemoveButton arrayHelpers={arrayHelpers} i={i}/>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Card>
              </Grid>
              </div>
            ))}
            {!isDisabled && (
              <Grid item xs={12}>
                <AddButton arrayHelpers={arrayHelpers} initVal={initVal}/>
              </Grid>
            )}
          </Grid>
        )}
      />
    </>
  )
}
