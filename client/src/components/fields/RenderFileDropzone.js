import React, { useMemo } from 'react';
import { Box, CircularProgress, makeStyles } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const baseStyle = {
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 4,
  borderColor: '#0053A4',
  borderStyle: 'dashed',
  backgroundColor: '#fff',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const useStyles = makeStyles({
  fileName: {
    display: 'flex',
    lineHeight: '35px',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '35px'
  },
  inputField: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '270px',
    color: '#0A70C4'
  },
  icon: {
    width: '90px',
    height: '90px',
    paddingBottom: '20px',
    color: '#0A70C4'
  },
  descriptionWrapper: {
    paddingBottom: '10px'
  },
  description: {
    display: 'flex',
    fontSize: '17px',
    color: '#000',
    fontWeight: 600
  },
  uploadOpenLink: {
    fontSize: '17px',
    color: '#0053A4',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: 600
  },
  subtext: {
    fontSize: '14px',
    color: '#333333'
  },
  errorText: {
    color: 'red',
    padding: '10px 0px 10px 0px',
    fontSize: '16px'
  }
});


/**
 * Styled file dropzone reusable component
 *
 * @param  props.fileUploaded - boolean for external success state
 * @param  props.uploadCallbackHandler - handler for passing the file back through
 * @param  props.icon - `optional | string` png file import reference
 * @param  props.displayValidity - `optional | boolean` flag for additional UI file validity elements
 * @returns object of type ReactElement
 *
 */
export function RenderFileDropzone(props) {
  const classes = useStyles();
  const { isFileUploaded, isFileValid, isLoading } = props;

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    open,
    isDragReject

  } = useDropzone({
    noClick: true,
    accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    maxSize: 5000000,
    minSize: 1,
    onDrop: (file) => props.uploadCallbackHandler(file)
  });
  let fileAccepted;

  if (acceptedFiles && acceptedFiles.length) {
    fileAccepted = true;
  }

  if (fileRejections && fileRejections.length) {
    fileAccepted = false;
  }

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(fileAccepted ? acceptStyle : {}),
    ...(!fileAccepted && fileAccepted !== undefined ? rejectStyle : {})
  }), [
    isDragActive,
    fileAccepted,
    isDragReject
  ]);

  return (
    <div>
      <div {...getRootProps({ style })} className={classes.inputField}>
        {
          isLoading
            ?
            <CircularProgress />
            :
            <>
              <input {...getInputProps()} />
              {
                props.icon
                  ?
                  <img className={classes.icon} src={props.icon} />
                  : null
              }
              <div className={classes.descriptionWrapper}>
                <div className={classes.description}>
                  Drop file here, or &nbsp;
                  <div className={classes.uploadOpenLink} onClick={open}>browse from your device</div>.
                </div>
              </div>
              <div className={classes.subtext}>Supported: Excel (.xls, .xlsx)</div>
            </>
        }
      </div>
      {
        isFileUploaded
        &&
        <div className={classes.fileName}>
          {
            acceptedFiles[0]
              ? acceptedFiles[0].name
              : fileRejections[0]
                ? fileRejections[0].file.name
                : null
          }
          {
            isFileUploaded && isFileValid
              ?
              <CheckCircle style={{ color: 'green' }} />
              : null
          }
          {
            isFileUploaded && !isFileValid
              ?
              <Box py={2}>
                <CancelIcon style={{ color: 'red' }} />
              </Box>
              : null
          }
        </div>
      }

      {
        !fileAccepted && fileAccepted !== undefined
          ?
          fileRejections[0]
          &&
          <div className={classes.errorText}>
            File must be an Excel file and must not be empty
            </div>
          : null
      }
    </div>
  );
}
