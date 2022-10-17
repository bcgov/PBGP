/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Redirect, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Route } from 'constants/routes';
import { useSubmissionLookup } from 'hooks/topup';
import { Page } from 'components/generic';

export default () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { getOne, isFetching, error, formValues } = useSubmissionLookup();
  useEffect(() => {
    getOne(id);
  }, []);

  if (!id) return <Redirect to={Route.Root} />;
  if (isFetching) return <LinearProgress />;
  return (
    <Page>
      <Box p={4}>
        {error ? (
          <Typography variant='h6'>Failed to retrieve the submission with id {id}</Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h6'>Submission Type: {formValues.submissionType}</Typography>
            </Grid>
            {formValues.submissionType === 'organization' ? (
              Object.keys(formValues.data).map((k) => (
                <Grid item xs={12} md={6} lg={4}>
                  {k === 'void_cheque`' ? (
                    <>
                      <b>Void cheque:</b>
                      <img src={`${formValues.data[k]}`} />
                    </>
                  ) : (
                    <>
                      <b>{k}</b>: {formValues.data[k]}
                    </>
                  )}
                </Grid>
              ))
            ) : formValues.submissionType === 'operator' ? (
              ['acute_care', 'ems', 'lab_services', 'dsl_ltc'].includes(
                formValues.data.category
              ) ? (
                <Typography>No data to display</Typography>
              ) : formValues.data.category === 'home_care' ? (
                Object.keys(formValues.data[formValues.data.category]).map((k) => (
                  <Grid item xs={12} md={6} lg={4}>
                    {
                      <>
                        <b>{k}</b>: {formValues.data[formValues.data.category][k]}
                      </>
                    }
                  </Grid>
                ))
              ) : (
                formValues.data[formValues.data.category].map((obj) =>
                  Object.keys(obj).map((k) => (
                    <Grid item xs={12} md={6} lg={4}>
                      {
                        <>
                          <b>{k}</b>: {obj[k]}
                        </>
                      }
                    </Grid>
                  ))
                )
              )
            ) : formValues.submissionType === 'employee' ? (
              formValues.data.employees.map((employee) => (
                <Box p={2}>
                  <Grid container gap={2}>
                    {Object.keys(employee).map((k) => (
                      <Grid item xs={12} md={3}>
                        {
                          <>
                            <b>{k}</b>: {k === 'sin' ? employee[k].slice(0, 9) : employee[k]}
                          </>
                        }
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))
            ) : (
              <Typography>Submission Type not recognized, no data available</Typography>
            )}
          </Grid>
        )}
      </Box>
    </Page>
  );
};
