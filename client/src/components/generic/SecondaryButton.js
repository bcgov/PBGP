import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    minHeight: '48px',
  },
  small: {
    height: '100%',
    minHeight: '30px',
  },
  large: {
    height: '100%',
    minHeight: '52px',
  },
}));

export const SecondaryButton = ({
  text,
  loading,
  disabled,
  ...props
}) => {
  const classes = useStyles();
  return (
    <MuiButton
      classes={{ root: classes.root, sizeSmall: classes.small, sizeLarge: classes.large }}
      disabled={loading || disabled}
      variant="outlined"
      color="primary"
      fullWidth
      {...props}
    >
      {loading ? <CircularProgress size={24} /> : text}
    </MuiButton>
  );
};
