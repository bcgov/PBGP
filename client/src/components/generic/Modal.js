import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

import { useModal } from '../../hooks';

import { Button } from './Button';

export const StyledDialogTitle = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 3),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    textAlign: 'center',
  },
}))(DialogTitle);

export const StyledDialogContent = textAlign => withStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    textAlign: textAlign || 'center',
  },
}))(DialogContent);

export const StyledDialogActions = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2, 4, 2),
    justifyContent: 'center'
  },
}))(DialogActions);

export const Modal = () => {
  const {
    closeModal,
    state: {
      isOpen,
      title,
      description,
      negativeActionText,
      positiveActionText,
      negativeActionOnClick,
      positiveActionOnClick,
      size,
      textAlign,
      disableOnClick,
      disableBackdropClick,
      disabled,
      positiveButtonVariant
    },
  } = useModal();

  const ContentStyles = StyledDialogContent(textAlign);
  const [disabledClick, setDisabled] = useState(disabled);

  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth={size || 'xs'} fullWidth disableBackdropClick={disableBackdropClick} onEnter={() => setDisabled(disabled)}>
      <StyledDialogTitle component="div">
        <Typography component="div" variant="h4">{title}</Typography>
      </StyledDialogTitle>
      <ContentStyles>
        <Typography variant="body2">{description}</Typography>
      </ContentStyles>
      <StyledDialogActions>
        {negativeActionText && <Button
          style={{ minWidth: 150 }}
          text={negativeActionText}
          onClick={negativeActionOnClick}
          color="primary"
          variant="outlined"
          size="small"
          fullWidth={false}
        />}
        {positiveActionText && <Button
          style={{ minWidth: 150 }}
          text={positiveActionText}
          onClick={() => { 
            if(disableOnClick) setDisabled(true);
            positiveActionOnClick();
          }}
          color="primary"
          variant={positiveButtonVariant? positiveButtonVariant : "outlined"}
          size="small"
          disabled={disabledClick}
          fullWidth={false}
        />}
      </StyledDialogActions>
    </Dialog>
  );
};
