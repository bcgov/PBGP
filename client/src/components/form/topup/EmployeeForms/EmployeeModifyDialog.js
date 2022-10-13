import React from 'react'
import { Container, Grid, Typography, Dialog, withStyles, DialogContent} from '@material-ui/core'
import { Button, StyledDialogActions, StyledDialogTitle } from 'components/generic'
import { RenderSelectField, RenderDateField, RenderTextField } from 'components/fields'
import { FastField, Form, Formik } from 'formik'
import { EmployeeXmlHeaderKeys, EmployerXlsValidation } from 'constants/topup/schema'
import {EmployeePosition} from 'constants/arrays'
export const StyledDialogContent = textAlign => withStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    textAlign: textAlign || 'center',
  },
}))(DialogContent);

const ContentStyles = StyledDialogContent(true);

export default ({ isDialogOpen, setDialogOpen, modifyTableData, updateActions, currentRowContext, employeeInfo }) => {

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      {
        isDialogOpen === 'edit' || isDialogOpen === 'add'
          ?
          <Formik
            initialValues={isDialogOpen === 'edit' ? currentRowContext : EmployeeXmlHeaderKeys}
            validationSchema={EmployerXlsValidation}
            onSubmit={async (values) => {
              if (isDialogOpen === 'edit') {
                let employees = values
                await updateActions({ employeeIndex: employees.indexId, action: 'edit', employee: { ...employees } })
                modifyTableData({ employeeIndex: employees.indexId, action: 'edit', employee: { ...employees } })
                setDialogOpen(false)
              } else {
                let employees = values
                updateActions({ employeeIndex: employees.indexId, action: 'add', employee: { ...employees } })
                modifyTableData({ employeeIndex: employees.indexId, action: 'add', employee: { ...employees } })
                setDialogOpen(false)
              }
              
            }}
          >{({ touched }) =>
            <Form>
              <StyledDialogTitle component="div">
                <Typography component="div" variant="h4">{`${isDialogOpen === 'edit' ? 'Edit' : 'Add'} Employee Information`}</Typography>
              </StyledDialogTitle>
              <ContentStyles> 
                <Container maxWidth="sm">
                  <Typography variant="h4">
                    Errors:
                    </Typography>
                  <Typography variant="body1">
                    {
                      currentRowContext?.errorMessage?.split('.').map(string => (
                        <div>{string} <br /></div>
                      ))
                    }
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <FastField
                        name="sin"
                        label="Sin*"
                        component={RenderTextField}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <FastField
                        name="first_name"
                        label="First Name*"
                        component={RenderTextField}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <FastField
                        name="middle_name"
                        label="Middle Name"
                        component={RenderTextField}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <FastField
                        name="last_name"
                        label="Last Name"
                        component={RenderTextField}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <FastField
                        name="date_of_birth"
                        label="Date Of Birth*"
                        component={RenderDateField}
                        disableFuture={true}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <FastField
                        name="start_date"
                        label="Start Date*"
                        component={RenderDateField}
                        disableFuture={true}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <FastField
                        name="paid_hours"
                        label="Paid Hours*"
                        component={RenderTextField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FastField
                        name="position"
                        label="Position*"
                        component={RenderSelectField}
                        options={EmployeePosition}
                      />
                  </Grid>
                  </Grid>

                </Container>
              </ContentStyles>
              <StyledDialogActions>
                <Button
                  style={{ minWidth: 150 }}
                  text="Save to Draft"
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="small"
                  fullWidth={false}
                />
                <Button
                  style={{ minWidth: 150 }}
                  text='Cancel'
                  onClick={() => setDialogOpen(false)}
                  color="primary"
                  variant="outlined"
                  size="small"
                  fullWidth={false}
                />
              </StyledDialogActions>
            </Form>}
          </Formik>
          :
          <>
            <StyledDialogTitle component="div">
              <Typography component="div" variant="h4">Delete Employee Information</Typography>
            </StyledDialogTitle>
            <ContentStyles>
              <Container justify="center" align="center">
                <Typography variant='body1' >
                  Are you sure you would like to delete this row?
                </Typography>
              </Container>
              
            </ContentStyles>
            <StyledDialogActions>
              <Button
                style={{ minWidth: 150 }}
                text="Delete"
                variant="contained"
                onClick={() => {
                  updateActions({ employeeIndex: currentRowContext.indexId, action: 'delete', employee: { ...currentRowContext } })
                  modifyTableData({ employeeIndex: currentRowContext.indexId, action: 'delete', employee: { ...currentRowContext } })
                  setDialogOpen(false)
                }}
                color="primary"
                size="small"
                fullWidth={false}
              />
              <Button
                style={{ minWidth: 150 }}
                text='Cancel'
                onClick={() => setDialogOpen(false)}
                color="primary"
                variant="outlined"
                size="small"
                fullWidth={false}
              />
            </StyledDialogActions>
          </>
      }
    </Dialog>
  )
}