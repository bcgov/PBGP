import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { CardReverse } from "components/generic";
import { numberFormat } from "utils/numberFormat";
import { OrganizationContext } from "providers";

export default function PaymentDetails() {
  const {
    organization: {
      operatorDetails,
      employeeDetails
    },
  } = React.useContext(OrganizationContext);
  const employeePaymentDetails = {
    total:
      employeeDetails && employeeDetails.totalPaymentAmount
        ? employeeDetails.totalPaymentAmount
        : 0,
    title: "Employee",
    paymentStatus:
      employeeDetails && employeeDetails.paymentStatus
        ? employeeDetails.paymentStatus
        : "Not Paid",
  };

  const operatorPaymentDetails = {
    total:
      operatorDetails && operatorDetails.totalPaymentAmount
        ? operatorDetails.totalPaymentAmount
        : 0,
    title: "Operator",
    paymentStatus:
      operatorDetails && operatorDetails.paymentStatus
        ? operatorDetails.paymentStatus
        : "Not Paid",
  };

  const details = [employeePaymentDetails, operatorPaymentDetails];
  return (
    <Grid container spacing={2}>
      {details &&
        details.map((item, index) => (
          <Grid item xs={12} md={6} key={`${item.title}-${index}`}>
            <CardReverse
              title={item.title + " Benefit Payment"}
              sideText={item.paymentStatus}
              color="#FEBA35"
              style={{ textTransform: "capitalize", paddingBottom: "16px" }}
            >
              <Box
                mx={4}
                my={4}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="button" style={{ color: "#777" }}>
                  Total Amount Calculated
                  <br />
                  <TotalAmount
                    item={item}
                  />
                </Typography>
              </Box>
            </CardReverse>
          </Grid>
        ))}
    </Grid>
  );
}

function TotalAmount({ item }) {
  let total = numberFormat(item.total);
  let value = total.split(".");
  return (
    <Box style={{ display: "flex", marginTop: "10px" }}>
      <span style={{ margin: "10px 20px 0 0", color: "#bbb" }}>$</span>
      <Typography variant="h2" style={{ color: "#555" }}>
        {value[0] ? value[0] : "0"}.
        <span style={{ color: "#bbb" }}>{value[1] ? value[1] : "00"}</span>
      </Typography>
    </Box>
  );
}
