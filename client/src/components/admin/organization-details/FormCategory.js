import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/Card'
import { FieldArray, Field } from 'formik'
import { RenderRadioGroup, RenderTextField, RenderDateField } from 'components/fields'

export function FormCategory({ isDisabled, Questions, inputs, name, initVal, values, info }) {
  return (
    <Grid container spacing={2} >
      <Typography variant='h5' style={{ paddingBottom: '20px', fontWeight: '600' }}>
        {info}
      </Typography>
      <FieldArray
        name={name}
        render={() => (
          <>
            {
              values.map((obj, i) => (
                <Box mb={4} style={{ border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: '10px' }} >
                  <Card>
                    <CardContent>
                      <Grid container padding={2} maxWidth='sm' justify='center' direction='column'>
                        <Grid container gap={2} key={i} spacing={2}>
                          {inputs.map((input) => (
                            <>
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
                                    options={input.type === 'bool' && Questions}
                                  />
                                </Box>
                              </Grid>
                            </>
                          ))}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              ))
            }
          </>
        )}
      />
    </Grid>
  )
}
