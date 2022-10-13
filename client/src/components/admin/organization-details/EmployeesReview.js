import React, { useState, useRef, useEffect } from 'react';
import xlsx from 'xlsx';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Box, Grid, MenuItem, TextField, Typography, Switch } from '@material-ui/core';
import { FastField, Formik, Form as FormikForm } from 'formik';

import { Card, Button, InputFieldLabel, Table } from 'components/generic';
import { DenyOptions } from './DenyOptions'
import { OtherApplications } from './OtherApplications'
import { AdminButton } from './Admin-Button'
import { EmployeeTableColumns } from 'constants/arrays';
import { parseEmployeeDate } from 'constants/topup/schema';
import { utcToLocalString, getOptionalURLParams } from 'utils'
import { OrganizationContext } from "providers";
import { useHandleEmployeeApprove, useHandleLockUnlockForm, useDetermination, useManualSinCheck } from 'hooks/admin'
import { useModal } from 'hooks';
import { RenderTextField } from 'components/fields';


const parseEmployeeDates = (dateString) => {
  let parsedDate;
  if (!parseEmployeeDate(dateString)) {
    const dateObj = xlsx.SSF.parse_date_code(parseInt(dateString))

    if(dateObj) {
      parsedDate = `${dateObj.y}/${dateObj.m}/${dateObj.d}`
    } else {
      parsedDate = `Invalid Date: ${dateString}`
    }
  } else {
    parsedDate = dateString
  }
  return parsedDate
};

export default function EmployeesReview() {
  const { id: organizationId } = useParams()
  const history = useHistory();
  const {employee} = getOptionalURLParams(history);
  const loc = useLocation();
  const {
    organization: {
      employeeDetails,
      formValues,
    },
  } = React.useContext(OrganizationContext);
  const {openModal, closeModal} = useModal()
  const tableRef = useRef(null);
  const { lock, unlock } = useHandleLockUnlockForm()
  const { isRunningSinCheck, handleDuplicateSinCheck } = useManualSinCheck()
  const {
    isSubmittingFinalDetermination,
    isResettingStatusToPending,
    submitFinalDetermination,
    resetFormStatusToPending,
  } = useDetermination();
  const {
    isApproving,
    isDenying,
    approve,
    deny,
  } = useHandleEmployeeApprove();

  const [currentFilter, setCurrentFilter] = useState('all')
  const [isLocked, setIsLocked] =  useState(employeeDetails.isLocked)

  const employeeDetailsId = employeeDetails.id
  const status = employeeDetails.status || "pending";
  const isAssignedToMe = formValues.assignedToMe;
  
  const checkIfAllEmployeesAreApprovedOrDenied = (employeeDetails) =>
    employeeDetails.data.employees.every(item => item.status === 'approved' || item.status === 'denied')
  
  const shouldShowFinishProcessingButton = checkIfAllEmployeesAreApprovedOrDenied(employeeDetails) && isAssignedToMe && status === "pending";

  const shouldShowResetStatusButton = checkIfAllEmployeesAreApprovedOrDenied(employeeDetails) && isAssignedToMe && status !== "pending";

  if(employee) {
    const indexId = parseInt(employee);
    const focusedEmployee = employeeDetails?.data.employees?.find(e => e.indexId === indexId);

    if(focusedEmployee) {
      focusedEmployee.higlighted = true;
    }
  }

  const getEmployeesData = () => {
    return employeeDetails.data.employees.map((employee) => ({
      ...employee,
      date_of_birth: parseEmployeeDates(employee.date_of_birth),
      start_date: parseEmployeeDates(employee.start_date),
      additionalDetails: (
        <Box style={{display: "flex", flexDirection:"column", alignItems: "flex-start"}}>
          {
            employee.isValidSIN === false
              ? <span>Invalid SIN</span>
              : null
          }
          {
            employee.isAlreadyPaid
              ? <span><OtherApplications data={employee.otherApplications}/></span>
              : null
          }
        </Box>
      ),
      approve: (
        <>
        {(employee.status === 'approved' || status === 'pending')?
          <AdminButton
            size="small"
            color='#8bc34a'
            disabled={!isAssignedToMe || employee.status === 'approved' || status !== 'pending'}
            text={employee.status === 'approved' ? 'Approved' : 'Approve'}
            variant={employee.status === 'approved' ? 'contained' : 'outlined'}
            onClick={() => {
              approve(employeeDetailsId, employee.indexId)
            }}
            icon={<CheckCircleOutlineIcon />}
            loading={isApproving.loading && isApproving.indexId === employee.indexId}
          /> : ''}
        </>
      ),
      deny: (
        <>
          {((employee.status === 'denied' || status === 'pending') &&
            <DenyOptions
              employeeId={employee.indexId}
              deny={deny}
              reason={employee.statusReason}
              disabled={!isAssignedToMe || employee.status === 'denied' || status !== 'pending'}
              text={employee.status === 'denied' ? 'Denied' : 'Deny'}
              variant={employee.status === 'denied' ? 'contained' : 'outlined'}
              color='#f50057'
              id={employeeDetailsId}
              icon={<HighlightOffIcon />}
              loading={isDenying.loading && isDenying.indexId === employee.indexId}
            />
          )}
        </>

      ),
    }));
  };

  const getTableData = () => {
    switch (currentFilter) {
      case 'all':
        return [...getEmployeesData()];
      case 'approved':
        return [...getEmployeesData().filter(employee => employee.status === 'approved')];
      case 'denied':
        return [...getEmployeesData().filter(employee => employee.status === 'denied')];
      case 'pending':
        return [...getEmployeesData().filter(employee => employee.status === 'pending' || !employee.status)];
      default:
        return [...getEmployeesData()];
    }
  }
  
  const displayTime = employeeDetails.lastCheckDuplicateSinDate && utcToLocalString(employeeDetails.lastCheckDuplicateSinDate,'YYYY/MM/DD hh:mm A');
  const filteredEmployees = getTableData();
  const duplicateEmployees = getEmployeesData().filter(employee => !!employee.isAlreadyPaid);

  useEffect(() =>{
    if(employee) {
      tableRef.current.scrollIntoView();
    }
  },[])

  return (
    <Grid item xs={12}>
      <Card
        title="Employees"
        subtitle={status}
        style={{ textTransform: "capitalize" }}
        color="#FEBA35"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7} md={8}>
            {
              employeeDetails && isLocked
                ? <Box mt={1} mb={2}>
                  <Typography component={'span'} variant={'h4'}>Submission Locked</Typography>
                </Box>
                : <Box mt={1} mb={2}>
                  <Typography component={'span'} variant={'h4'}>Submission Unlocked</Typography>
                </Box>
            }
            <Grid container direction="row">
              <Typography>Unlock</Typography>
              <Switch name='checkLocked' checked={isLocked} disabled={!isAssignedToMe} onClick={() => {
                if (isLocked) {
                  unlock(employeeDetailsId)
                  setIsLocked(!isLocked)
                } else {
                  lock(employeeDetailsId)
                  setIsLocked(!isLocked)
                }
              }} />
              <Typography>Lock</Typography>
            </Grid>
            <Box mt={2}>
              {/** Global form action buttons */}
              {shouldShowFinishProcessingButton && (
                <AdminButton
                  color='#8bc34a'
                  text='Finish Processing'
                  variant={'outlined'}
                  onClick={() => submitFinalDetermination(employeeDetailsId, "employees")}
                  icon={<CheckCircleOutlineIcon />}
                  loading={isSubmittingFinalDetermination}
                />
              )}
              {shouldShowResetStatusButton && (
                <AdminButton
                  color='#8bc34a'
                  text='Reset Form Status'
                  variant={'outlined'}
                  onClick={() => {
                    resetFormStatusToPending(employeeDetailsId, "employees");
                  }}
                  icon={<CheckCircleOutlineIcon />}
                  loading={isResettingStatusToPending}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={8} sm={5} md={4}>
            <Box mt={1} mb={2}>
            <InputFieldLabel label={'Filter by approval status'} />
              <TextField
                select
                fullWidth
                variant='outlined'
                value={currentFilter}
                onChange={(event) => setCurrentFilter(event.target.value)}
              >
                <MenuItem value={'approved'}>Approved</MenuItem>
                <MenuItem value={'denied'}>Denied</MenuItem>
                <MenuItem value={'pending'}>Pending</MenuItem>
                <MenuItem value={'all'}>All</MenuItem>
              </TextField>
            </Box>
            <Box mt={1} mb={2}>
              <Button
                loading={isRunningSinCheck}
                variant="contained"
                text="Run Duplicate SIN Check"
                onClick={()=> handleDuplicateSinCheck(organizationId)}
              />
            </Box>
            <Box mt={1} mb={2}>
              <Typography variant="button">Time and Date Last Verified:
                <Typography variant="body2">
                  {employeeDetails.lastCheckDuplicateSinDate ? displayTime : "Not Yet Verified"}
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/** Employees table */}
        <Box mt={1} mb={2}>
          <Grid container item spacing={2} justify='flex-end'>
            <Grid item xs={6} md={4}>
              <Button
                variant="outlined"
                text={duplicateEmployees?.length > 0 ? "View Duplicates" : "No Duplicates"}
                disabled={duplicateEmployees?.length === 0}
                onClick={() => 
                  openModal({
                    title: 'Duplicate Employees',
                    description: 
                      <Table
                        isEditable={false}
                        isAssessmentPortal={true}
                        columns={
                          [
                            ...EmployeeTableColumns,
                            { title: '', field: 'approve' },
                            { title: '', field: 'deny' },
                            { title: '', field: 'additionalDetails' },
                          ]
                        }
                        data={duplicateEmployees}
                        totalCount={duplicateEmployees.length}
                        options={{
                          doubleHorizontalScroll: true,
                          pageSize: 10,
                          pageSizeOptions: [10, 20, 50]
                        }}
                      />,
                    size: 'lg',
                    disableBackdropClick: true,
                    negativeActionText: 'Close',
                    negativeActionOnClick: () => closeModal(),
                  })
                }
              />
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2} >
          <Grid item xs={12} >
            <Box m={2}>
              {
                employeeDetails.employeesPaidDetermination 
                  ? 
                    employeeDetails.employeesPaidDetermination === 'all_paid'
                      ?
                      <Box
                        style={{
                          backgroundColor: '#f8f8f8',
                          borderRadius: "5px",
                          padding: "2rem",
                        }}
                        mb={2}
                      >
                        <Grid container spacing={2} justify='space-between'>
                          <Grid item>
                            <Typography variant="h3" style={{ display: 'flex', color: '#0A70C4' }} >
                              Employee Payment Determination Submitted
                            </Typography>
                          </Grid>
                          <Grid item >
                            <Typography variant ='h3' style={{ display: 'flex', color: '#8bc34a' }}>
                              <CheckCircleOutlineIcon/>
                              &nbsp;
                              All Eligible Employees Paid
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant='body1' style={{ fontWeight: '500' }}>
                              The organization has submitted the Confirmation(s) of Grant Recipient, and indicated that they have paid all eligible employees.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      : 
                      <Box
                        style={{
                          backgroundColor: '#f8f8f8',
                          borderRadius: '5px',
                          padding: '2rem',
                        }}
                        mb={2}
                      >
                        <Grid container spacing={2} justify='space-between'>
                          <Grid item>
                            <Typography variant="h3" style={{ display: 'flex', color: '#0A70C4' }} >
                              Employee Payment Determination Submitted
                            </Typography>
                          </Grid>
                          <Grid item >
                            <Typography variant ='h3' style={{ display: 'flex', color: '#f50057' }}>
                              <ReportProblemOutlinedIcon/>
                              &nbsp;
                              Action Required
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant='body1' style={{ fontWeight: '500' }}>
                              The organization has submitted the Confirmation(s) of Grant Recipient, and indicated that they have not paid one or more eligible employees.
                            </Typography>
                          </Grid>
                        </Grid>
                        
                        <Formik initialValues={employeeDetails}>
                          <FormikForm>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <FastField
                                  disabled={true}
                                  name="employeesReceivedPayment"
                                  label="Number of Eligible employees that have received the payment"
                                  type="number"
                                  component={RenderTextField}
                                /> 
                              </Grid>
                              <Grid item xs={6}>
                                <FastField
                                  disabled={true}
                                  name="employeesNotReceivedPayment"
                                  label="Number of Eligible employees that have not received payment"
                                  type="number"
                                  component={RenderTextField}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FastField
                                  disabled={true}
                                  name="employeesNotReceivedPaymentReason"
                                  label="Employees did not receive payment due to"
                                  component={RenderTextField}
                                />
                              </Grid>
                            </Grid>
                          </FormikForm>
                        </Formik>
                      </Box>
                  :
                    null
              }
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} justify='center' ref={tableRef}>
          <Table
            focused={employee}
            isEditable={false}
            isAssessmentPortal={true}
            columns={
              [
                ...EmployeeTableColumns,
                { title: '', field: 'approve' },
                { title: '', field: 'deny' },
                { title: '', field: 'additionalDetails' },
              ]
            }
            data={filteredEmployees}
            totalCount={filteredEmployees.length}
            options={{
              doubleHorizontalScroll: true,
              pageSize: 10,
              pageSizeOptions: [10, 20, 50]
            }}
          />
        </Grid>
      </Card>
    </Grid>
  )
}