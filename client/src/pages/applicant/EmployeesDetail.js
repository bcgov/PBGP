import React, { useEffect, useState } from 'react'
import { Link, useLocation, useHistory, useParams } from 'react-router-dom'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import xlsx from 'xlsx';
import { Table } from 'components/generic/Table';
import { Button, Page, PageHeader } from 'components/generic'
import { useEmployeesDetail } from 'hooks/topup'
import { EmployeeTableColumns } from 'constants/arrays'
import { Route as Routes } from 'constants/routes'
import { useUpdateEmployeesDetail } from 'hooks/topup/employeeDetails'
import { parseEmployeeDate } from 'constants/topup/schema';
import ModifyEmployeeDetail from '../../components/form/topup/EmployeeForms/EmployeeModifyDialog'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { ApplicationStatus } from 'components/topup/DashboardComponents'
// TODO: Considering these are used in both topup and admin pages, we can / should
// move these to the generic components folder.
import { AdminButton } from 'components/admin/organization-details/Admin-Button'
import { DenyOptions } from 'components/admin/organization-details/DenyOptions'
import moment from 'moment';

export default function EmployeesDetailTopUp() {
  const [filteredEmployees, setFilteredEmployees] = useState()
  const { formValues, getEmployeesDetail, isFetching, getComments, commentData } = useEmployeesDetail()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [currentRowContext, setCurrentRowContext] = useState()
  const { id } = useParams()
  const { updateForm, isFetching: updateFormFetching } = useUpdateEmployeesDetail()
  const [employeeInfo, setEmployeeInfo] = useState([])
  const { pathname } = useLocation()
  const history = useHistory()
  const isEditable = pathname.includes('edit');
  const showComments = pathname.includes('view') || id
  const [employeeCount, setEmployeeCount]=useState(null)
  const [approvedCount, setApprovedCount]=useState(null)
  const [deniedCount, setDeniedCount]=useState(null)

  useEffect(() => {
    id && getEmployeesDetail(id)
    id && getComments()
    const beforeunload = (event) => {
      event.preventDefault();

      event.returnValue = 'alert';
    }

    window.scrollTo(0, 0);
    !pathname.includes('view') && window.addEventListener('beforeunload', beforeunload);
    return () => window.removeEventListener('beforeunload', beforeunload);
  }, [id, pathname])

  useEffect(() => {
    if (formValues && formValues.data) {
      if (formValues && formValues.status === "approved")
      {setEmployeeCount(formValues.data.employees.length)
      setApprovedCount(formValues.data.employees.map(emp => emp).filter(emp => emp.status === "approved" ).length)
      setDeniedCount(formValues.data.employees.map(emp => emp).filter(emp => emp.status === "denied" ).length)}
      const employeesArray = formValues.data.employees.map((employee) => ({
        ...employee,
        date_of_birth: parseEmployeeDates(employee.date_of_birth),
        start_date: parseEmployeeDates(employee.start_date),
        status: (
          formValues && formValues.status === "approved" &&
          employee.status === 'approved'
          ? <AdminButton
              size="small"
              color='#8bc34a'
              text="Approved"
              variant='contained'
              disabled
              onClick={() => { }}
              icon={<CheckCircleOutlineIcon />}
            />
          : formValues && formValues.status === "approved" &&
            employee.status === 'denied' ?
            <DenyOptions
              employeeId={employee.indexId}
              reason={employee.statusReason}
              variant='contained'
              disabled
              text='Denied'
              color='#f50057'
              icon={<HighlightOffIcon />}
            />
          : null
        )
      }))
      setFilteredEmployees(employeesArray)
    }
  }, [formValues])

  useEffect(() =>{
    // Wait until data is loaded

    if (!isFetching && isFetching !== undefined && pathname.includes('download')) {
      const workbook = xlsx.utils.book_new()
      let exportData = formValues.data.employees
      // Remove object keys that should not be exported
      const sanitizedData = exportData.map(element => ({
          'First Name': element.first_name,
          'Middle Name': element.middle_name,
          'Last Name': element.last_name,
          'Date Of Birth': element.date_of_birth,
          'Start Date': element.start_date,
          'Position': element.position,
          'Paid Hours': element.paid_hours,
          'Status': element.status,
          'Status Reason': element.statusReason
        }
      ))
      exportData.map(element => {
        delete element.sin
        delete element.tableData
        delete element.indexId
        delete element.isValidSIN
      })

      const sheet = xlsx.utils.json_to_sheet(sanitizedData)

      xlsx.utils.book_append_sheet(workbook, sheet, 'Submitted Employees')
      xlsx.writeFile(workbook, `Critical-Worker-Benefit-Submission-${moment().format('YYYY-MM-DD')}.xlsx`)
    }
  }, [isFetching])

  useEffect(() => {
    if (!updateFormFetching && updateFormFetching !== undefined) {
      getEmployeesDetail(id)
    }
  }, [updateFormFetching])

  const parseEmployeeDates = (dateString) => {
    let parsedDate;
    if (!parseEmployeeDate(dateString)) {
      const dateObj = xlsx.SSF.parse_date_code(parseInt(dateString))
      parsedDate = `${dateObj.y}/${dateObj.m}/${dateObj.d}`
    } else {
      parsedDate = dateString
    }
    return parsedDate
  }

  const editTableData = (modifiedRow) => {
    if (modifiedRow.action === 'edit') {
      let employeeArrayCopy = filteredEmployees
      let replaceIndex
      employeeArrayCopy.map((element, index) => {
        if (element.tableData.id === modifiedRow.employee.tableData.id) {
          replaceIndex = index
        }
      })
      employeeArrayCopy[replaceIndex] = modifiedRow.employee
      setFilteredEmployees(employeeArrayCopy)
    } else if (modifiedRow.action === 'delete') {
      setFilteredEmployees(filteredEmployees.filter(element => element.tableData.id !== modifiedRow.employee.tableData.id))
    } else {
      let employeeArrayCopy = filteredEmployees
      employeeArrayCopy.push(modifiedRow.employee)
      setFilteredEmployees(employeeArrayCopy)
    }
  }

  const updateActionsArray = (modifiedRow) => {
    if (modifiedRow.action !== 'add') {
      let replacementActionsArray = employeeInfo.filter(element => element.employeeIndex !== modifiedRow.employeeIndex)
      replacementActionsArray.push(modifiedRow)
      setEmployeeInfo(replacementActionsArray)
    } else {
      employeeInfo.push(modifiedRow)
    }
  }



  return (
    <Page showComments={showComments} commentData={commentData} hideFooter>
      <PageHeader
        header='Employee Benefits Application' subheader={pathname.includes('view') ? null : pathname.includes('edit') ? 'Edit your employee information below...' : 'Upload your employee information below...'}/>
      <Container maxWidth="md">
        <Box flex='true' component={Grid} height='calc(100vh - 44px)' container mb={8}>
          <Box component={Grid} item xs={12} sm={12} height='100%'>
            <Box mt={2} mb={3} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: '1 1 auto' }}>
              {pathname.includes('view') ?
                <Typography>
                  <Link to={Routes.Root}>Dashboard</Link>{` > Employee Benefit Funding Application`}
                </Typography>
                :
                <Typography>
                  <Link
                    to={"#"}
                    onClick={() => {if (window.confirm('Are you sure want to navigate away? Any unsaved changes will be lost')) history.push(`${Routes.Root}`)}}
                  >
                    Dashboard
                  </Link>
                  {` > Employee Benefit Funding Application`}
                </Typography>

              }
              { formValues && <ApplicationStatus applicationStatus={formValues.operatorStatus}/>}
            </Box>
            <Grid container justify='space-between' spacing={2}>
              <Grid item xs={12} sm={7} md={7}>
                {employeeCount &&
                  <Box mb={2} pl={4}>
                    <Typography variant="body2"><b>Total Employees: </b>{employeeCount}</Typography>
                    <Typography variant="body2"><b>Total Approved: </b>{approvedCount}</Typography>
                    <Typography variant="body2"><b>Total Denied: </b>{deniedCount}</Typography>
                  </Box>
                }
              </Grid>
              <Grid container justify="flex-end" xs={12} sm={5} md={5} >
                {isEditable && (
                  <Box my={4} mr={4}>
                    <Button fullWidth={false} text='Add New Employee' onClick={() => setDialogOpen('add')} />
                  </Box>
                )}
              </Grid>
            </Grid>
            <Table
              isEditable={isEditable}
              isLoading={isFetching}
              columns={[
                { title: 'SIN', field: 'sin' },
                ...EmployeeTableColumns,
                { title: '', field: 'status' },
              ]
              }
              data={filteredEmployees}
              totalCount={filteredEmployees?.length}
              options={{
                doubleHorizontalScroll: true,
                pageSize: 10,
                pageSizeOptions: [10, 20, 50],
              }}
              editHandler={(rowData) => {
                setDialogOpen('edit')
                setCurrentRowContext(rowData)
              }}
              deleteHandler={(rowData) => {
                setDialogOpen('delete')
                setCurrentRowContext(rowData)
              }}
            />

            <ModifyEmployeeDetail
              isDialogOpen={isDialogOpen}
              currentRowContext={currentRowContext}
              setDialogOpen={setDialogOpen}
              modifyTableData={editTableData}
              setEmployeeInfo={setEmployeeInfo}
              employeeInfo={employeeInfo}
              updateActions={updateActionsArray}
            />
            {isEditable && (
              <Box my={4} pb={6}>
                <Button
                  text='Update Employee Information'
                  type='submit'
                  loading={updateFormFetching}
                  onClick={() => updateForm(employeeInfo)}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Page>
  )
 }
