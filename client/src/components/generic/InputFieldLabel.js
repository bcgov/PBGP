import React from 'react';
import Typography from '@material-ui/core/Typography';

export const InputFieldLabel = ({ label, ...props }) => {
  return <Typography variant="subtitle2" color="textSecondary" {...props}>{label}</Typography>;
};
