/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { Page, Button } from '../../components/generic';
import { Typography } from '@material-ui/core';
import { useKeycloak } from '@react-keycloak/web/lib';

export default () => {
  const { keycloak } = useKeycloak();

  const login = () => {
    keycloak.login({ redirectUri: `${window.location.origin}/dashboard` });
  };

  return (
    <Page centerContent>
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
          <Box m={2} height={'100%'} display='flex' justifyContent='flex-start' alignItems='center'>
            <Button
              style={{ height: 'unset', minWidth: 150 }}
              text='Login'
              color='primary'
              variant='contained'
              size='medium'
              fullWidth={false}
              onClick={login}
            />
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};
