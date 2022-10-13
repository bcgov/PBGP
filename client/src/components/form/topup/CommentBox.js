import React, { Fragment } from 'react'
import { Box , Typography } from '@material-ui/core'
import { Divider, Grid } from '@material-ui/core';
import { utcToLocalString } from 'utils';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';


export function CommentBox({commentData}){

    return (
      <Box
        py={4}
        px={[1.25, 4]}
        bgcolor="common.white"
        borderColor="divider"
        borderTop={1}
        overflow="auto"
      >
        <Box mt={1.5} component={Grid} item xs={12}>
        <Typography variant="subtitle2" gutterBottom>Action Items</Typography>
        <Divider />
        {!commentData?.data?.length || commentData?.data?.length === 0 ? (
          <Box py={1.5} component={Typography} variant="body2" color="common.darkGrey">
            There are no action items for this organization.
          </Box>
        ) : commentData.data.map(({ date, agentName, status, type, note }, index, array) => {
          const isLastChild = index === array.length - 1;
          const formattedDate = utcToLocalString(date, 'DD MMM YYYY, hh:mm A');
          return (
            <Fragment key={index}>
              <Box pt={2} pb={3}>
                <Grid container alignItems="center" justify="space-between" spacing={1}>
                  <Grid item>
                    <Box
                      fontSize="14px"
                      lineHeight="20px"
                      letterSpacing="-0.25px"
                    >
                      {formattedDate}
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      fontSize="14px"
                      lineHeight="20px"
                      letterSpacing="-0.25px"
                      display="flex"
                      alignItems="center"
                    >
                      <AccountCircleOutlinedIcon fontSize="small" />&nbsp;{agentName}
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  pt={2.5}
                  fontSize="16px"
                  fontWeight="bold"
                  lineHeight="19px"
                  letterSpacing="0"
                  color="secondary.main"
                >
                  {type}: {status}
                </Box>
                <Box pt={1.25}>
                  <Typography variant="body2">{note}</Typography>
                </Box>
              </Box>
              {!isLastChild && <Divider />}
            </Fragment>
          );
        })}
        </Box>
      </Box>
    )
}
