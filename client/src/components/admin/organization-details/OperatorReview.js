import React, { useEffect, useState } from "react";
import { Typography, Switch, Grid, Box } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Card } from "components/generic";
import { Form } from "./Form";
import { AdminButton } from "./Admin-Button";
import { categories } from "constants/topup/operatorOptions";
import {
  useHandleLockUnlockForm,
  useHandleOperatorApprove,
  useDetermination,
} from "hooks/admin";
import { OrganizationContext } from "providers";

const mapCategoryData = (operatorDetails) => {
  // For each category, find the actual status of each of them
  return operatorDetails.data.category.flatMap((c) => {
    // Find property name of category
    const catProp = categories.find((cat) => cat.value === c)?.prop;
    const data = operatorDetails.data[catProp];

    return catProp === "home_care" ? [data] : data;
  });
};

const checkIfAllOperationsAreApprovedOrDenied = (data) => data.every((data) => data.status === "approved" || data.status === "denied");

export default function OperatorReview() {
  const {
    organization: {
      operatorDetails,
      formValues,
    },
  } = React.useContext(OrganizationContext);

  const { lock, unlock } = useHandleLockUnlockForm();
  const { isApproving, isDenying, approveOrDeny } = useHandleOperatorApprove();
  const {
    isSubmittingFinalDetermination,
    isResettingStatusToPending,
    submitFinalDetermination,
    resetFormStatusToPending,
  } = useDetermination();

  const [isLocked, setIsLocked] = useState(operatorDetails.isLocked);

  const operatorDetailsId = operatorDetails.id;
  const status = operatorDetails.status;
  const isAssignedToMe = formValues.assignedToMe;

  const categoryData = mapCategoryData(operatorDetails);

  const shouldShowFinishProcessingButton = checkIfAllOperationsAreApprovedOrDenied(categoryData) && isAssignedToMe && status === "pending";
  const shouldShowResetStatusButton = checkIfAllOperationsAreApprovedOrDenied(categoryData) && isAssignedToMe && status !== "pending";

  return (
    <Card
      title={"Operator Information"}
      subtitle={status}
      style={{ textTransform: "capitalize" }}
      color="#FEBA35"
    >
      <Box ml={4}>
        {operatorDetails && isLocked ? (
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
                unlock(operatorDetailsId);
                setIsLocked(!isLocked);
              } else {
                lock(operatorDetailsId);
                setIsLocked(!isLocked);
              }
            }}
          />
          <Typography>Lock</Typography>
        </Grid>
        <Box mt={2} mb={4}>
          {/** Global form action buttons */}
          {shouldShowFinishProcessingButton && (
            <AdminButton
              style={{ float: "right" }}
              height="50px"
              color="#8bc34a"
              text="Finish Processing"
              variant="outlined"
              onClick={() => submitFinalDetermination(operatorDetailsId, "operator")}
              icon={<CheckCircleOutlineIcon />}
              loading={isSubmittingFinalDetermination}
            />
          )}
          {shouldShowResetStatusButton && (
            <AdminButton
              style={{ float: "right" }}
              height="50px"
              color="#8bc34a"
              text="Reset Form Status"
              variant="outlined"
              onClick={() => resetFormStatusToPending(operatorDetailsId, "operator")}
              icon={<CheckCircleOutlineIcon />}
              loading={isResettingStatusToPending}
            />
          )}
        </Box>
      </Box>
      <Form
        disabled={true}
        onSubmit={() => {}}
        isDisabled={true}
        isFetching={false}
        initialValues={operatorDetails.data}
        details={operatorDetails}
        submitDetermination={approveOrDeny}
        isAssignedToMe={isAssignedToMe}
        isApproving={isApproving}
        isDenying={isDenying}
      />
    </Card>
  );
}
