import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  bodyContent: {
    height: '100%',
    flex: '1 1 auto',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  footerContent: {
    flex: '0 0 auto',
  },
}));

export const ScrollContainer = ({ headerContent, bodyContent, footerContent }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>

      {headerContent && headerContent}

      <div className={classes.bodyContent}>
        {bodyContent}
      </div>

      {footerContent && (
        <div className={classes.footerContent}>
          {footerContent}
        </div>
      )}
    </div>
  );
};
