import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import InfoIcon from "@material-ui/icons/Info";
import { FastField, Formik, Form } from "formik";
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from "components/generic";
import { RenderTextField, RenderSelectField } from "components/fields";
import { Typography } from "@material-ui/core";

const BenefitTypes = [
  { value: "operatorApplication", label: "Operator Application" },
  { value: "employeeApplication", label: "Employee Application" },
];

export const PaymentTableToolbarSearch = ({ onSearch }) => {
  const initialValues = {
    filterByBenefit: "",
    query: "",
  };

  const onCancelFilterByBenefit = (e, setFieldValue, submitForm) => {
    setFieldValue('filterByBenefit', "")
    submitForm();
  }

  return (
    <Box mb={3}>
      <Formik initialValues={initialValues} onSubmit={onSearch}>
        {({ values, ...helpers }) => (
          <Form>
            <Grid
              container
              spacing={2}
              alignItems='flex-end'
              justify='space-between'
            >
              <Grid item container xs={10} alignItems='center' spacing={2}>
                <Grid item xs={12} md={4}>
                  <FastField
                    name='filterByBenefit'
                    label='Filter By Benefit Type'
                    component={RenderSelectField}
                    options={BenefitTypes}
                    size='small'
                  />
                </Grid>
                {values.filterByBenefit && <Grid item  alignItems="center" style={{marginLeft: "-50px", zIndex:10}}>
                  <IconButton size="small" style={{backgroundColor:"white", marginTop: "25px"}} onClick={e => onCancelFilterByBenefit(e, helpers.setFieldValue, helpers.submitForm)}>
                    <CloseIcon fontSize="small"/>
                  </IconButton>
                </Grid>}
                <Grid item xs={12} md={4}>
                  <FastField
                    name="query"
                    placeholder="Search"
                    component={RenderTextField}
                    size="small"
                    label={
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        Search&nbsp;
                        <Tooltip title="Organization Name/Confirmation #">
                          <InfoIcon fontSize="small" color="inherit" />
                        </Tooltip>
                      </Box>
                    }
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  style={{ minHeight: 40, height: 40 }}
                  text="Search"
                  type="submit"
                  color="primary"
                  size="medium"
                  endIcon={<SearchIcon />}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
