import { ReportOptions } from "../../constants";
import { Field, Formik, Form } from "formik";
import React from "react";
import { Box, Grid } from "@material-ui/core";
import { RenderDateField, RenderSelectField } from "components/fields";
import { Button } from "components/generic";
import { PaymentReportValidationSchema } from "constants/report-validation";

const createInitialValues = () => {
  return {
    report: "",
    fromDate: "",
    toDate: "",
  };
};

function SelectReportType({ loading, setReport, onSubmit }) {
  const handleSubmit = (e, setFieldValue) => {
    if (e.target.value) {
      setReport(e.target.value);
    } 
    if(e.target.value === "SIMEN_WEEKLY_REPORT"){
      setFieldValue("fromDate", "");
      setFieldValue("toDate", "");
    }
  };

  return (
    <Formik
      initialValues={createInitialValues()}
      onSubmit={onSubmit}
      validationSchema={PaymentReportValidationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
    >
      {({values, setFieldValue}) => (
        <Form>
          <Grid container alignItems="flex-start">
            <Grid item xs={4}>
              <Box mr={1}>
                <Field
                  name="report"
                  label="Select Report Type *"
                  component={RenderSelectField}
                  options={ReportOptions}
                  onClick={(e) => {
                    handleSubmit(e, setFieldValue);
                  }}
                  size="small"
                  style={{ outline: "red" }}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box mx={1}>
                <Field
                  name="fromDate"
                  label="From Date (YYYY/MM/DD)"
                  component={RenderDateField}
                  size="small"
                  disabled={values.report === "SIMEN_WEEKLY_REPORT"}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box mx={1}>
                <Field
                  name="toDate"
                  label="To Date (YYYY/MM/DD)"
                  component={RenderDateField}
                  size="small"
                  disabled={values.report === "SIMEN_WEEKLY_REPORT"}
                />
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box ml={6} mt={3}>
                <Button
                  text="Export CSV"
                  variant="contained"
                  type="submit"
                  loading={loading}
                />
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default SelectReportType;
