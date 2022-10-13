import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import  CircularProgress  from '@material-ui/core/CircularProgress';
import { FastField, Field, Formik, Form  } from 'formik';
import { useHistory } from 'react-router-dom';
import { Page, SearchFilterPills, Table, Button, PageHeader } from 'components/generic';
import { RenderDateField, RenderTextField, RenderSelectField } from 'components/fields';
import { ReportFilterValidationSchema } from 'constants/report-validation';
import { LookupAssessmentTableColumns } from 'constants/assessment-portal/tableColumns';
import { HealthOptions, SubmissionStatusTypes, PaymentStatusTypes, PaymentDeterminationTypes, orderTypes, activeTaskTypes } from '../../constants';
import { parseUrlFilters, useAssessmentLookup, useListActiveAgents, validDateOrEmpty } from 'hooks/admin';
import { useCheckPaymentAuth} from '../../hooks/admin/payment/useCheckPaymentAuth'

export default () => {
  const history = useHistory();
  const {
    onChangePage,
    onSubmit,
    clearFilter,
    // onFilter,
    // onSort,
    // isFetching,
    zeroStates,
    selectedSearchFilters,
    tableData,
  } = useAssessmentLookup();

  const {
    // hasExecuted: hasFetchedAgents,
    initialAgent,
    options: agentOptions,
  } = useListActiveAgents();

  const {
    fromDate,
    toDate,
    submissionDate,
    submissionStatus,
    agent,
    healthType,
    orderBy,
    query,
    activeTask
  } = parseUrlFilters(history);

  const initialValues = {
    fromDate: validDateOrEmpty(fromDate),
    toDate: validDateOrEmpty(toDate),
    submissionDate: validDateOrEmpty(submissionDate),
    submissionStatus,
    agent: (initialAgent && initialAgent.name) || agent,
    healthType,
    orderBy,
    query,
    activeTask
  }
  const handlePillRemove = (field, setFieldValue) => {
    switch (field) {
      case "date":
        setFieldValue('fromDate', zeroStates['fromDate'] || '');
        setFieldValue('toDate', zeroStates['toDate'] || '');
        clearFilter('fromDate')
        clearFilter('toDate')
        break;
      default:
        setFieldValue(field, zeroStates[field] || '')
        clearFilter(field)
        break;
    }
  };
  
  const { auth, loadingEnv } = useCheckPaymentAuth()
    
    if (loadingEnv){
    return(
    <Grid style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: "center", alignItems: "center"}} >
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <Page maxWidth='lg'>
      <PageHeader maxWidth='lg' header='Organization Lookup' />

      {/** Filter fields */}
      <Box bgcolor="common.lighterGrey">
        <Container maxWidth='lg'>
          <Box pt={[3, 3]} pb={[3, 3]}>
            <Formik
              validationSchema={ReportFilterValidationSchema}
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              {({ values, ...helpers }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3} md={2} lg={2}>
                      <FastField
                        name="fromDate"
                        label="From Date"
                        component={RenderDateField}
                        placeholder="YYYY/MM/DD"
                        disableFuture={false}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} lg={2}>
                      <FastField
                        name="toDate"
                        label="To Date"
                        component={RenderDateField}
                        placeholder="YYYY/MM/DD"
                        disableFuture={false}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} lg={2}>
                      <FastField
                        name="submissionDate"
                        label="Submission Date"
                        component={RenderDateField}
                        placeholder="YYYY/MM/DD"
                        disableFuture={true}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} lg={2}>
                      <FastField
                        name="submissionStatus"
                        label="Submission Status"
                        component={RenderSelectField}
                        options={SubmissionStatusTypes}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} lg={2}>
                      <FastField
                        name="paymentStatus"
                        label="Payment Status"
                        component={RenderSelectField}
                        options={PaymentStatusTypes}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} lg={2}>
                      <FastField
                        name="paymentDeterminationStatus"
                        label="Payment Determination"
                        component={RenderSelectField}
                        options={PaymentDeterminationTypes}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} lg={2}>
                      <Field
                        name="agent"
                        label="Agent"
                        component={RenderSelectField}
                        options={agentOptions}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} lg={2}>
                      <FastField
                        name="healthType"
                        label="Health Setting Type"
                        component={RenderSelectField}
                        options={HealthOptions}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} lg={2}>
                      <Field
                        name="orderBy"
                        label="Order By"
                        component={RenderSelectField}
                        options={orderTypes}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} lg={2}>
                      <Field
                        name="activeTask"
                        label="Active Task"
                        component={RenderSelectField}
                        options={activeTaskTypes}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3} md={4} lg={4}>
                      <FastField
                        name="query"
                        placeholder="Search"
                        component={RenderTextField}
                        size="small"
                        label={(
                          <Box style={{ display: "flex", alignItems: "center" }}>
                            Search&nbsp;<Tooltip title="Name/Confirmation #"><InfoIcon fontSize="small" color="inherit" /></Tooltip>
                          </Box>
                        )}
                      />
                    </Grid>
                    <Grid item xs container alignItems="flex-end" justify="flex-end" spacing={2}>

                      {/** Search filter pills */}
                      <Grid item xs={12} sm={10} md={10}>
                        <SearchFilterPills
                          options={selectedSearchFilters}
                          onRemove={(field) => handlePillRemove(field, helpers.setFieldValue)}
                        />
                      </Grid>

                      {/** Search */}
                      <Grid item xs={2}>
                        <Button
                          text="Search"
                          type="submit"
                          color="primary"
                          size="medium"
                          endIcon={<SearchIcon />}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Box>

      {/** Table */}
      {tableData?.rows?.length > 0 && (
        <Box pt={4} pb={6}>
          <Container maxWidth='lg'>
            <Table
              columns={LookupAssessmentTableColumns}
              onChangePage={onChangePage}
              data={tableData.rows}
              currentPage={tableData.currentPage}
              totalCount={tableData.totalRows}
              options={{
                pageSize: 20,
                pageSizeOptions: [20]
              }}
           />
          </Container>
        </Box>
      )}
    </Page>
  )
}
