import React from 'react';
import Typography from '@material-ui/core/Typography';

export const InputFieldError = ({ error, ...props }) => {
  return <Typography variant="caption" component="p" color="error" {...props}>{error}</Typography>;
};
