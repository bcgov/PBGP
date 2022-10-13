import React from 'react';
import MuiCard from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid  from '@material-ui/core/Grid';
import {Skeleton} from "@material-ui/lab";
import {PaymentState} from "../admin/organization-details/PaymentState"
import { PaymentStatusSelect } from 'components/admin/organization-details/PaymentStatusOptions';

export const Card = ({ color, subtitle, children, title,  isTitleSmall, noPadding, loading, ...props }) => {
  return (
    <MuiCard {...props}>
      {loading ? <Skeleton animation="wave" height={52} width="100%" style={{ borderRadius: 0 }} /> : (
        <>
          {title &&
            <Box py={1.75} px={3} bgcolor='common.darkGrey' color='common.white' >
              <Grid container direction='row' justify='space-between'>
                <Typography py={1} variant={isTitleSmall ? 'h4' : 'h3'}>{title}</Typography>
                <Typography style={{color: color}} py={1} variant='h4'>{subtitle}</Typography>
              </Grid>
            </Box>
          }
        </>
      )}
      <Box py={noPadding ? 0 : 1.75} px={noPadding ? 0 : 3}>
        {children}
      </Box>
    </MuiCard>
  );
};

export const CardReverse = ({ color, subtitle, children, title, sideText, isTitleSmall, noPadding, ...props }) => {
  return (
    <MuiCard {...props}>
      {title && 
        <Box py={1.75} px={3} bgcolor='common.white' color='common.darkGrey' border={1} borderColor='common.lightGrey'>
          <Grid container direction='row' justify='space-between'>
            <Grid container justify='space-between'>
            <Typography py={1} variant={isTitleSmall ? 'h4' : 'h3'}>{title}</Typography>
            {sideText && <PaymentState text={sideText}/>}
            </Grid>
            <Typography style={{color: color}} py={1} variant='h4'>{subtitle}</Typography>
          </Grid>
        </Box>
      }
      <Box py={noPadding ? 0 : 1.75} px={noPadding ? 0 : 3}>
        {children}
      </Box>
    </MuiCard>
  );
};
