import React, { useMemo } from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import UploadABBlue from 'assets/images/upload-ABBlue.png';
import { StyledDialogActions } from './Modal';
import { Button } from './Button';

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
  acceptedFileName: {
    display: 'flex',
    lineHeight: '35px',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '35px',
    paddingTop: '5px'
  },
  rejectedFileName: {
    display: 'block',
    lineHeight: '35px',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '35px',
    paddingTop: '5px',
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
  },
  rejectedFileWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


/**
 * Styled file dropzone reusable component
 *
 * @param  acceptedFileTypes - string-array of accepted file MIME types.
 * @param  acceptedFileString - Human-Readable string of accepted file types.
 * @param  maxNumberOfFiles - maximum number of files handled at a time.
 * @param  maxFileSize - maximum file size in bytes.
 * @param  minFileSize - minimum file size in bytes. defaults to 1 byte.
 * @param  isLoading - loading flag for externally triggered events (file parsing, additional validation, etc).
 *                     Defaults to false if not provided
 * @param  uploadCallbackHandler - Function callback for upload events. NOTE: class-function onDrop() triggers from both
 *                                 drag-n-drop uploading, as well as system dialog uploading.
 * @param  cancelCallbackHandler - Function callback for cancel events. Can be used to trigger closing a dialog,
 *                                 or resetting the uploader
 * @returns object of type ReactElement
 *
 */
export function FileDropzone({
  acceptedFileTypes, 
  acceptedFileString, 
  maxNumberOfFiles,
  maxFileSize, 
  minFileSize = 1, 
  isLoading = false,
  uploadCallbackHandler,
  cancelCallbackHandler 
}) {
  const classes = useStyles();

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
    accept: acceptedFileTypes,
    maxSize: maxFileSize,
    minSize: minFileSize,
    maxFiles: maxNumberOfFiles,
    // onDrop: (file) => uploadCallbackHandler(file)
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(acceptedFiles?.length > 0 ? acceptStyle : {}),
    ...(acceptedFiles?.length === 0 && fileRejections?.length > 0 ? rejectStyle : {})
  }), [
    isDragActive,
    acceptedFiles,
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
              <img className={classes.icon} src={UploadABBlue} />
              <div className={classes.descriptionWrapper}>
                <div className={classes.description}>
                  Drop file here, or &nbsp;
                  <div className={classes.uploadOpenLink} onClick={open}>browse from your device</div>.
                </div>
              </div>
              <div className={classes.subtext}>{`Supported File Types: ${acceptedFileString}`}</div>
            </>
        }
      </div>
      {
        acceptedFiles.length > 0
          &&
        <div className={classes.acceptedFileName}>
          {
            acceptedFiles[0]?.name
          }
          &nbsp;
          <CheckCircle style={{ color: '#16c92e' }} />
        </div>
      }

      {
        fileRejections.length > 0
          &&
        <div className={classes.rejectedFileName}>
          {
            <div className={classes.rejectedFileWrapper}>
              {fileRejections[0].file.name}
              &nbsp;
              <CancelIcon style={{ color: 'Red' }} />
            </div>
          }
          {
            fileRejections[0].errors.map((error) => {
              if (error.code === 'file-invalid-type'){
                return (
                  <div>Invalid file type. File type must be one of: {acceptedFileString}</div>
                )
              } else return (
              <div>{error.message}</div>
              )
            })
          }
        </div>
      }
      <StyledDialogActions>
          <Button
            style={{ minWidth: 150 }}
            text='Cancel'
            onClick={() => cancelCallbackHandler()}
            color="primary"
            variant="outlined"
            size="small"
            fullWidth={false}
          />
          <Button
            style={{ minWidth: 150 }}
            text='Upload'
            onClick={() => {
              uploadCallbackHandler(acceptedFiles[0])
            }}
            color="primary"
            variant="outlined"
            size="small"
            disabled={!acceptedFiles.length}
            fullWidth={false}
          />
        </StyledDialogActions>
    </div>
  );
}
