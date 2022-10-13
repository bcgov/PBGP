import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import InfoIcon from '../../assets/images/info-icon.svg';

export const InfoBox = ({ message }) => {
  return (
    <Box display="flex">
      <Box px={1.5} bgcolor="primary.main" display="flex" alignItems="center" justifyContent="center">
        <img src={InfoIcon} alt="Info Icon" height={22} />
      </Box>
      <Box py={[2, 3.5]} px={[1.5, 2]} bgcolor="common.lightGrey">
        <Typography variant="body1">{message}</Typography>
      </Box>
    </Box>
  );
};
