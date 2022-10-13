import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { useToast } from '../../hooks';

const StyledAlert = withStyles((theme) => ({
  root: {
    padding: 0,
  },
  message: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1.5, 3),
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    padding: theme.spacing(3, 2),
    margin: 0,
  },
  action: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.darkGrey,
    padding: 0,
    paddingRight: theme.spacing(1.5),
  },
}))(Alert);

export const Toast = () => {
  const {
    closeToast,
    state: {
      isOpen,
      status,
      timeout,
      message,
      actionText,
      onActionClick,
    },
  } = useToast();

  return (ReactDOM.createPortal(
    <Snackbar
      open={isOpen}
      autoHideDuration={timeout === undefined ? 6000 : timeout}
      onClose={(_, reason) => reason !== 'clickaway' && closeToast()}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <StyledAlert
        onClose={closeToast}
        severity={status}
        elevation={6}
        variant="filled"
      >
        <div>
          <Typography variant="body1" color="textPrimary">
            {message}
          </Typography>
          {actionText && (
            <Typography
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={onActionClick}
              variant="body1"
              color="primary"
            >
              {actionText}
            </Typography>
          )}
        </div>
      </StyledAlert>
    </Snackbar>, document.body,
  ));
};
