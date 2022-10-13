import React, { useState } from "react";
import { Card, Page, PageHeader } from "components/generic";
import {
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Route } from "constants/routes";
import SelectReportType from "components/Reports/SelectReportType";
import { ReportDetails } from "constants/Reports";
import useReport from "hooks/admin/report/useReport";
import { ReportOptions } from "../../constants";

function Reports() {
  const [report, setReport] = useState();
  const { getReport, loading } = useReport();
  return (
    <Page>
      <PageHeader header="Reports" maxWidth="md" disableGutters />

      <Container maxWidth="lg" style={{ paddingBottom: "20px" }} />

      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant="body2">
              <Link to={Route.AdminPortalOrganizationsLookup}>
                Organization Lookup
              </Link>
            </Typography>
          </Grid>
          <Grid item mx={3}>
            <Typography variant="body2">{" > "} Reports</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={12}>
            <Box my={2} mb={4}>
              <SelectReportType
                loading={loading}
                setReport={setReport}
                onSubmit={getReport}
              />
            </Box>
          </Grid>
        </Grid>
        {report && (
          <Grid container>
            <Grid item xs={12}>
              <Card title={ReportDetails[report]?.name} isTitleSmall={true}>
                <Typography>{ReportDetails[report]?.description}</Typography>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}

export default Reports;
