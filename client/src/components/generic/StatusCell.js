import React from 'react';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  statusCellWrapper: {
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cell: {
    height: '36px',
    minHeight: '36px',
    minWidth: '145px',
    border: '1.5px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '25px',
    width: '180px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    borderRight: '1.5px solid rgba(0, 0, 0, 0.2)',
    height: '36px',
    width: '38px',
    paddingLeft: '8px',
    justifyContent: '',
    alignItems: 'center',
  },
  textContainer: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitted: {
    color: '#16c92e',
    fontSize: '1.5em'
  },
  notSubmitted: {
    color: '#ffb835',
    fontSize: '1.5em'
  },
  rejected: {
    color: 'red',
    fontSize: '1.5em'
  },
  info: {
    color: '#0A70C4',
    fontSize: '1.5em'
  },
  submittedBorder: {
    borderColor: '#16c92e',
  },
  notSubmittedBorder: {
    borderColor: '#ffb835',
  },
  rejectedBorder: {
    borderColor: 'red',
  },

  infoBorder: {
    borderColor: '#0A70C4',
  }
}));


export const StatusCell = ({
  status,
  submissionStatus
}) => {
  const classes = useStyles();
  let ActiveIcon;
  let activeContent;
  let activeStyle;
  let borderStyle;
  switch (submissionStatus) {

    case 'denied':
      ActiveIcon = HighlightOffIcon;
      activeContent = 'Denied';
      activeStyle = classes.rejected;
      borderStyle = classes.rejectedBorder;
      break;
    case 'approved':
      activeContent = 'Approved';
      ActiveIcon = CheckCircleOutlineIcon;
      activeStyle = classes.submitted;
      borderStyle = classes.submittedBorder;
      break;
    case 'validated':
      activeContent = 'Validated';
      ActiveIcon = CheckCircleOutlineIcon;
      activeStyle = classes.submitted;
      borderStyle = classes.submittedBorder;
      break;
    case 'needs information':
      activeContent = 'Needs Info';
      ActiveIcon = CheckCircleOutlineIcon;
      activeStyle = classes.info;
      borderStyle = classes.infoBorder;
      break;
    default:
      activeContent = 'Pending';
      ActiveIcon = HelpOutlineIcon;
      activeStyle = classes.notSubmitted;
      borderStyle = classes.notSubmittedBorder;
      break;
  }

  return (
    <div className={classes.statusCellWrapper}>
      {
        submissionStatus
          ?
          <div className={`${classes.cell} ${borderStyle}`}>
            <div className={`${classes.iconContainer} ${borderStyle}`}>
              <ActiveIcon className={activeStyle} />
            </div>
            <div className={classes.textContainer}>
              <Typography className={classes.textContainer}>
                {activeContent}
              </Typography>
            </div>
          </div>
          :
          null
        // <div className={`${classes.cell} ${borderStyle}`}>
        //   <div className={`${classes.iconContainer} ${borderStyle}`}>
        //     <ActiveIcon className={activeStyle}/>
        //   </div>
        //   <div className={classes.textContainer}>
        //     <Typography className={classes.textContainer}>
        //       {activeContent}
        //     </Typography>
        //   </div>
        // </div>
      }
    </div>
  );
};
