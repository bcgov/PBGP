/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

import Logo from '../../assets/images/logo-large.svg';

import { Route, UserType, AuthIssuer } from '../../constants';
import { useLogin } from '../../hooks';

import { Page, Button } from '../../components/generic';
import { Typography } from '@material-ui/core';
import { FastField, Formik, Form } from 'formik';
import { RenderTextField } from 'components/fields';

export default () => {
  const history = useHistory();
  const { login, isFetching } = useLogin();

  return (
    <Page centerContent isLoading={isFetching}>
      <Grid container justify='center' spacing={3}>
        <Grid item xs={10} sm={6} md={4} lg={4} xl={4}>
          <Box m={2} display='flex' flexDirection='column' alignItems='center'>
            <Box mb={3}>
              <Typography variant='h1'>BC Air Access Program Application</Typography>
            </Box>
            <Box>
              <Typography variant='body1'>
                The BC Air Access Program (BCAAP) is an application-based program that provides
                capital cost-sharing contributions to aviation infrastructure projects. This
                includes facility master plans, greenhouse gas audits or baselining, and GPS
                approaches. Support to the aviation sector is critical to helping BC address its
                responsibilities concerning medevac, wildfire suppression, emergency response,
                access to remote (often Indigenous) communities, clean transportation, tourism, and
                economic development.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={10} sm={6} md={4} lg={4} xl={4}>
          <Box m={2} display='flex' flexDirection='column' alignItems='center'>
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={(values) => console.log(values)}
            >
              <Form style={{ width: '100%' }}>
                <Grid container direction='column' spacing={2}>
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                    <FastField
                      name='username'
                      label='Username'
                      component={RenderTextField}
                      size='medium'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FastField
                      name='password'
                      label='Password'
                      component={RenderTextField}
                      type='password'
                      size='medium'
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      style={{ minWidth: 150 }}
                      text='Login'
                      type='submit'
                      color='primary'
                      variant='contained'
                      size='medium'
                      fullWidth={false}
                    />
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};
