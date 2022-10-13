import React, { Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Form as FormikForm, FastField } from "formik";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Grid,
  Hidden,
  Container,
} from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Alert from '@material-ui/lab/Alert'
import OrganizationReview from "components/admin/organization-details/OrganizationReview";
import PaymentDetails from "components/admin/organization-details/PaymentDetails";
import OperatorReview from "components/admin/organization-details/OperatorReview";
import EmployeesReview from "components/admin/organization-details/EmployeesReview";
import FilesReview from "components/admin/organization-details/FilesReview";
import { TasksList } from "components/admin/organization-details/TasksList";
import { Page, Button, ScrollContainer, Menu } from "components/generic";
import { RenderSelectField, RenderTextField } from "components/fields";
import {
  FormCardSkeleton,
  SidebarSkeleton,
  PaymentDetailsSkeleton,
} from "components/skeletons";
import {
  AssessmentPortalDeterminationSchema,
  OrganizationDeterminationStatuses,
  notesRequiredForStatus,
} from "../../constants";
import { utcToLocalString } from "utils";
import { OrganizationProvider, OrganizationContext } from "providers";
import { useDetermination } from "hooks/admin";

function OrganizationDetails() {
  const history = useHistory();
  const { id } = useParams();

  const {
    organization: {
      isSkeletonLoading,
      organizationDetails,
      operatorDetails,
      employeeDetails,
      formValues,
    },
    agreementTasks: { isFetchingTasks, taskData },
    agreementFiles: { isFetchingFiles, filesList },
  } = React.useContext(OrganizationContext);

  const {
    assign,
    unassign,
    submitComment,
    submitAction,
    isSubmittingAssignee,
    isSubmittingComment,
  } = useDetermination();

  const [isMobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

  const operatorTasks = React.useMemo(
    () =>
      taskData && operatorDetails
        ? taskData.filter((task) => task.formId === operatorDetails.id)
        : [],
    [taskData, operatorDetails]
  );
  const employeeTasks = React.useMemo(
    () =>
      taskData && employeeDetails
        ? taskData.filter((task) => task.formId === employeeDetails.id)
        : [],
    [taskData, employeeDetails]
  );

  const renderSidebar = () => (
    <Box
      p={4}
      height="100%"
      bgcolor="common.white"
      boxShadow="-15px 0px 20px -15px rgba(0, 0, 0, 0.2)"
      borderColor="divider"
      borderTop={1}
      overflow="auto"
    >
      {isSkeletonLoading ? (
        <SidebarSkeleton />
      ) : (
        <>
          <Formik
            enableReinitialize
            onSubmit={(values, actions) =>
              submitComment(id, values, actions.resetForm)
            }
            validationSchema={AssessmentPortalDeterminationSchema}
            initialValues={{ status: "", note: "" }}
          >
            {({ values }) => (
              <FormikForm>
                <Grid container spacing={2}>
                  {/** Title + (Actions) */}
                  <Grid item xs={12}>
                    <Box
                      mb={1}
                      component={Grid}
                      container
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item>
                        <Typography variant="subtitle1" color="textSecondary">
                          {formValues?.assignedToMe
                            ? "Update Submission"
                            : "Submission Details"}
                        </Typography>
                      </Grid>
                      {formValues?.agent && (
                        <Grid item data-id="householdAction">
                          <Box mt={1}>
                            <Menu
                              label="Actions"
                              size="small"
                              color="primary"
                              variant="contained"
                              options={[
                                {
                                  label: "Unassign Record",
                                  onClick: () =>
                                    unassign(id, null, formValues?.agent),
                                },
                              ]}
                            />
                          </Box>
                        </Grid>
                      )}
                    </Box>
                    <Divider />
                  </Grid>

                  {/** Assigned Agent */}
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Assigned Agent
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <AccountCircleOutlinedIcon />
                      &nbsp;{formValues?.agent || "Unassigned"}
                    </Box>
                  </Grid>

                  {/** Status + Notes */}
                  {!formValues?.assignedToMe ? (
                    <Fragment>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          gutterBottom
                        >
                          Type
                        </Typography>
                        {formValues?.activities[0]?.status || "None"}
                      </Grid>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          gutterBottom
                        >
                          Type
                        </Typography>
                        <FastField
                          name="status"
                          placeholder="Select Type..."
                          component={RenderSelectField}
                          options={OrganizationDeterminationStatuses}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          gutterBottom
                        >
                          Notes{" "}
                          {notesRequiredForStatus(values.status) ? "*" : ""}
                        </Typography>
                        <FastField
                          name="note"
                          component={RenderTextField}
                          placeholder="Add notes to document your interaction..."
                          variant="outlined"
                          multiline
                          rows={7}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          text="Submit"
                          data-id="note-submit"
                          loading={isSubmittingComment}
                        />
                      </Grid>
                    </Fragment>
                  )}

                  {/** (Assign To Me) */}
                  {!formValues?.agent && (
                    <Grid item xs={12}>
                      <Button
                        text="Assign To Me"
                        onClick={() => assign(id)}
                        loading={isSubmittingAssignee}
                      />
                    </Grid>
                  )}

                  {/** Previous Notes */}
                  <Box mt={1.5} component={Grid} item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Previous Notes
                    </Typography>
                    <Divider />
                    {formValues?.activities.length === 0 ? (
                      <Box
                        py={1.5}
                        component={Typography}
                        variant="body2"
                        color="common.darkGrey"
                      >
                        There are no notes on this record
                      </Box>
                    ) : (
                      formValues?.activities.map(
                        (
                          { date, agentName, status, type, note },
                          index,
                          array
                        ) => {
                          const isLastChild = index === array.length - 1;
                          const formattedDate = utcToLocalString(
                            date,
                            "DD MMM YYYY, hh:mm A"
                          );
                          return (
                            <Fragment key={index}>
                              <Box pt={2} pb={3}>
                                <Grid
                                  container
                                  alignItems="center"
                                  justify="space-between"
                                  spacing={1}
                                >
                                  <Grid item>
                                    <Box
                                      fontSize="14px"
                                      lineHeight="20px"
                                      letterSpacing="-0.25px"
                                    >
                                      {formattedDate}
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box
                                      fontSize="14px"
                                      lineHeight="20px"
                                      letterSpacing="-0.25px"
                                      display="flex"
                                      alignItems="center"
                                    >
                                      <AccountCircleOutlinedIcon fontSize="small" />
                                      &nbsp;{agentName}
                                    </Box>
                                  </Grid>
                                </Grid>
                                <Box
                                  pt={2.5}
                                  fontSize="16px"
                                  fontWeight="bold"
                                  lineHeight="19px"
                                  letterSpacing="0"
                                  color="secondary.main"
                                >
                                  {type}: {status}
                                </Box>
                                <Box pt={1.25}>
                                  <Typography variant="body2">
                                    {note}
                                  </Typography>
                                </Box>
                              </Box>
                              {!isLastChild && <Divider />}
                            </Fragment>
                          );
                        }
                      )
                    )}
                  </Box>
                </Grid>
              </FormikForm>
            )}
          </Formik>
          <Box mt={2}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Tasks
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                {operatorDetails?.status === "approved" && (
                  <TasksList
                    submissionType={"Operator Submission"}
                    submitAction={submitAction}
                    tasks={operatorTasks}
                    filesProps={{ filesList, isFetchingFiles }}
                  />
                )}
                {employeeDetails?.status === "approved" && (
                  <TasksList
                    submitAction={submitAction}
                    submissionType={"Employee Submission"}
                    tasks={employeeTasks}
                    filesProps={{ filesList, isFetchingFiles }}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <Page hideFooter>
      <Box component={Grid} height="calc(100vh - 44px)" container>
        {/** Form */}
        <Box component={Grid} item xs={12} sm={9} height="100%">
          <ScrollContainer
            headerContent={
              <>
              <Box
                py={3}
                pl={3}
                pr={4.75}
                bgcolor="secondary.main"
                color="common.white"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Container maxWidth="md" disableGutters>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h4">Organization Details</Typography>

                    <Grid item>
                      <Button
                        style={{
                          width: 125,
                          color: "white",
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        }}
                        text="Back"
                        variant="outlined"
                        size="small"
                        color="inherit"
                        fullWidth={false}
                        onClick={() => history.goBack()}
                      />
                    </Grid>
                  </Box>
                </Container>

              </Box>
              <Box
                 py={1}
                 pl={1}
                 pr={1.75}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
              <>
              <Grid item>
              { employeeDetails && (employeeDetails.latePaymentFlag &&  employeeDetails.paymentStatus === 'Paid' && !employeeDetails.employeesPaidDetermination)  ?  <Alert severity="warning" style={{ backgroundColor:"yellow", marginBottom: '30px' }}>
                      <Typography variant='h4' >Late Confirmation Alert</Typography>
                    </Alert> : null
                        }
                </Grid>
               </>
              </Box>

            </>
           }
            bodyContent={
              <Box p={3}>
                <Container maxWidth="md" disableGutters>
                  <Grid container spacing={3}>
                    {/** Organization Information */}
                    <Grid item xs={12}>
                      {isSkeletonLoading ? (
                        <FormCardSkeleton />
                      ) : (
                        organizationDetails && formValues && <OrganizationReview />
                      )}
                    </Grid>

                    {/** Employee Benefit Payment / Operator Benefit Payment */}
                    <Grid item xs={12}>
                      {isSkeletonLoading ? (
                        <PaymentDetailsSkeleton />
                      ) : (
                        <PaymentDetails />
                      )}
                    </Grid>

                    {/** Operator Information */}
                    <Grid item xs={12}>
                      {isSkeletonLoading ? (
                        <FormCardSkeleton />
                      ) : (
                        operatorDetails && formValues && <OperatorReview />
                      )}
                    </Grid>

                    {/** Employees */}
                    <Grid item xs={12}>
                      {isSkeletonLoading ? (
                        <FormCardSkeleton />
                      ) : (
                        employeeDetails && formValues && <EmployeesReview />
                      )}
                    </Grid>

                    {/** Files */}
                    <Grid item xs={12}>
                      {isSkeletonLoading ? (
                        <FormCardSkeleton />
                      ) : (
                        organizationDetails && filesList && <FilesReview />
                      )}
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            }
          />
        </Box>

        {/** Sidebar - Desktop */}
        <Hidden xsDown>
          <Box component={Grid} item xs={12} sm={3} height="100%">
            {renderSidebar()}
          </Box>
        </Hidden>

        {/** Sidebar - Mobile */}
        <Hidden smUp>
          <Drawer
            anchor="right"
            open={isMobileDrawerOpen}
            onClose={() => setMobileDrawerOpen(false)}
          >
            {renderSidebar()}
          </Drawer>
        </Hidden>
      </Box>
    </Page>
  );
}

export default () => (
  <OrganizationProvider>
    <OrganizationDetails />
  </OrganizationProvider>
);
