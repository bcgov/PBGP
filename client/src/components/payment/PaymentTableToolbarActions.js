import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button } from "components/generic";

export const PaymentTableToolbarActions = ({
  activePaymentBatch,
  onCreateBatch,
  onUpdateBatch,
  onCancel,
  selections
}) => {
  return (
    <Box mb={2}>
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant='h4'>
            Selected: {selections.length}
          </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Button
            style={{ minHeight: 40, height: 40 }}
            onClick={activePaymentBatch ? onUpdateBatch : onCreateBatch}
            text={
              activePaymentBatch
                ? "Add Selections To Payment Batch"
                : "Generate New Payment Batch"
            }
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <Button
            style={{ minHeight: 40, height: 40 }}
            onClick={onCancel}
            text="Clear Selections"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
