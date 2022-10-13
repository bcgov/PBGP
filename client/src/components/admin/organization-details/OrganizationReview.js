import React, { useState } from "react";
import { Switch, Box, Grid, Typography, Divider } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Form } from "components/form/topup/OrganizationInfo";
import { Card } from "components/generic";
import { AddictionsPaymentInput } from "./AddictionsPaymentInput";
import { AdminButton } from "./Admin-Button";
import {
  useHandleLockUnlockForm,
  useHandleOrganizationApprove,
} from "hooks/admin";
import { OrganizationContext } from "providers";

export default function OrganizationReview() {
  const {
    organization: {
      organizationDetails,
      operatorDetails,
      formValues,
    },
  } = React.useContext(OrganizationContext);

  const { lock, unlock } = useHandleLockUnlockForm();
  const {
    approve,
    deny,
    information,
    isApproveLoading,
    isDenyLoading,
    isRequestInfoLoading,
  } = useHandleOrganizationApprove();

  const [isLocked, setIsLocked] = useState(organizationDetails.isLocked);

  const id = organizationDetails.id;
  const status = organizationDetails.status;
  const organizationId = formValues.id;
  const isAssignedToMe = formValues.assignedToMe;
  const acceptedTerms = formValues.termsAccepted;
  const alreadyPaidAmount = formValues.addictionsAlreadyPaid ? formValues.addictionsAlreadyPaid : null;
  const showAddictions =
    operatorDetails &&
    operatorDetails.data.addictions &&
    operatorDetails.data.addictions.find(
      (facility) => {
        return (
          facility.name !== "" &&
          facility.status === "approved"
        );
      }
    );

  return (
    <Card
      title={"Organization Information"}
      subtitle={status ? status : "Pending"}
      color="#FEBA35"
      style={{ textTransform: "capitalize" }}
    >
      {!acceptedTerms && (
        <Box
          style={{
            background: "#ff8a85",
            borderRadius: "5px",
            padding: "5px",
          }}
          mb={2}
        >
          <Typography variant="h4">Operator has not re-accepted the declaration</Typography>
          
        </Box>
      )}
      <Grid container spacing={2} justify="space-between">
        <Grid item xs={12} sm={12}>
          <Box ml={4}>
            {organizationDetails.confirmationNumber && (
              <Box pb={2} mr={12}>
                <Typography>
                  <b>Confirmation Number:</b> {organizationDetails.confirmationNumber}
                </Typography>
              </Box>
            )}
            {organizationDetails && isLocked ? (
              <Box mt={1} mb={2}>
                <Typography component={"span"} variant={"h4"}>
                  Submission Locked
                </Typography>
              </Box>
            ) : (
              <Box mt={1} mb={2}>
                <Typography component={"span"} variant={"h4"}>
                  Submission Unlocked
                </Typography>
              </Box>
            )}
            <Grid container direction="row">
              <Typography>Unlock</Typography>
              <Switch
                name="checkLocked"
                checked={isLocked}
                disabled={!isAssignedToMe}
                onClick={() => {
                  if (isLocked) {
                    unlock(id);
                    setIsLocked(!isLocked);
                  } else {
                    lock(id);
                    setIsLocked(!isLocked);
                  }
                }}
              />
              <Typography>Lock</Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          {isAssignedToMe && (
            <Grid container direction="row" justify="flex-end">
              <Box mx={1} my={2}>
                <AdminButton
                  color={"#8bc34a"}
                  onClick={() => approve(id)}
                  icon={<CheckCircleOutlineIcon />}
                  loading={isApproveLoading}
                  disabled={status === "validated"}
                  text={status === "validated" ? "Validated" : "Validate"}
                  variant={status === "validated" ? "contained" : "outlined"}
                />
              </Box>
              <Box mx={1} my={2}>
                <AdminButton
                  color={"#f50057"}
                  onClick={() => deny(id)}
                  icon={<HighlightOffIcon />}
                  loading={isDenyLoading}
                  disabled={status === "denied"}
                  text={status === "denied" ? "Denied" : "Deny"}
                  variant={status === "denied" ? "contained" : "outlined"}
                />
              </Box>
              <Box mx={1} my={2}>
                <AdminButton
                  color={"#0A70C4"}
                  onClick={() => information(id)}
                  icon={<ErrorOutlineIcon />}
                  loading={isRequestInfoLoading}
                  disabled={status === "needs information"}
                  text={
                    status === "needs information"
                      ? "Needs Information"
                      : "Needs Information"
                  }
                  variant={
                    status === "needs information" ? "contained" : "outlined"
                  }
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Box mt={2} mb={3.5}>
        <Divider />
      </Box>

      <Form
        onSubmit={() => {}}
        isFetching={false}
        initialValues={organizationDetails.data}
        disabledInputs={true}
        details={organizationDetails}
        isEditing={false}
      />

      <Box px={3} my={4}>
        {organizationDetails && (
          <img
            src={organizationDetails.data.void_cheque}
            style={{ width: 300 }}
            alt="void-cheque"
          />
        )}
      </Box>
      {showAddictions && (
        <AddictionsPaymentInput
          id={organizationId}
          previousAmount={alreadyPaidAmount}
        />
      )}
    </Card>
  );
}
