import React, { useContext } from 'react'
// import { AuthContext } from '../../providers/Auth';
import { Page, Button } from 'components/generic'
import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

export default function Dashboard2B() {
  // const { state } = useContext(AuthContext);

  return (
    <Page centerContent isLoading={false}>
      <Grid container justify='center' spacing={3}>
        <Grid item xs={10} sm={6} md={8} lg={8} xl={8}>
          <Box m={2} display='flex' flexDirection='column' alignItems='left'>
            <Box mb={3}>
              <Typography variant='h1' align="left">BC Air Access Program Application</Typography>
            </Box>
            <Box>
              <Typography variant='body1'>
                  The BC Air Access Program (BCAAP) is an application-based program that provides capital cost-sharing contributions to aviation infrastructure projects. This includes facility master plans, greenhouse gas audits or baselining, and GPS approaches. Support to the aviation sector is critical to helping BC address its responsibilities concerning medevac, wildfire suppression, emergency response, access to remote (often Indigenous) communities, clean transportation, tourism, and economic development.
                  BCAAP will consider applications from public-use airports, heliports and water aerodromes located in BC except for airports serving over 1 million scheduled passengers annually and airports owned and operated by the federal government. In the assessment phase, applications will be reviewed based on the following priorities:
                  o	Safety is always paramount
                  o	Core aviation infrastructure above ancillary infrastructure
                  o	Maintaining existing infrastructure before expansionary projects
                  o	Emergency services support (medevac / fire suppression / emergency response and preparedness) ahead of economic justifications
                  o	Focus on smaller facilities
                  BCAAP funding is capped at $2 million per facility per application intake. Multiple applications can be made to the program in a single application intake. In the case of multiple applications, the $2 million BCAAP funding cap applies to the combined value of all funding approved.
                  A separate application must be completed for each project and the applicant must clearly identify the relative priority of each application. The application deadline is 
                  For further assistance or inquiries, please contact the BCAAP team at 778.974.5468 or BCAAP@gov.bc.ca.
              </Typography>
            </Box>
          </Box>
          <Grid container justify="center">
            <Button
              style={{ minWidth: 150, marginTop: 20 }}
              text='Start Application'
              type='submit'
              color='primary'
              variant='contained'
              onClick={()=>alert("Starting Application")}
              size='medium'
              fullWidth={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
}
