import React from "react";
import { Link,Redirect } from "react-router-dom";
import { Card, Page, PageHeader } from 'components/generic'
import {
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import PaymentBatchTable from "components/payment/PaymentBatchTable";
import { Route as Routes } from "constants/routes";
import { useCheckPaymentAuth } from "hooks/admin/payment/useCheckPaymentAuth";
import PaymentTable from "components/payment/PaymentTable";
import { useGetActivePaymentBatchMetadata } from "hooks/admin/payment/useGetActivePaymentBatchMetadata";
import { Route } from 'constants/routes'

export default function PaymentPage() {
  const { auth, loadingEnv } = useCheckPaymentAuth();
   const { completedData, tableData  } = useGetActivePaymentBatchMetadata();

  if (loadingEnv) {
    return (
      <Grid
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Grid>
    );
  }
  if (!auth) {
    return <Redirect to={Routes.AdminPortalOrganizationsLookup} />;
  }
  return (
    <Page>
      <PageHeader header='Payments' />
      <Container maxWidth='lg' style={{ paddingBottom: '40px' }} />

      <Container maxWidth='md'>
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant="body2">
              <Link to={Route.AdminPortalOrganizationsLookup}>Organization Lookup</Link>
            </Typography>
          </Grid>
          <Grid item mx={3}>
            <Typography variant="body2">{" > "} Payments</Typography>
          </Grid>

        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box my={4} mt={1}>
              <Card title='Grants' color='#FEBA35'>
                <PaymentTable />
              </Card>
            </Box>
          </Grid>


          <Grid item xs={12}>
            <Box my={4}>
              <PaymentBatchTable cardName="Active Payment Batch" data={tableData}/>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box my={4}>
              <PaymentBatchTable cardName='Previous Payment Batches' data={completedData} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
