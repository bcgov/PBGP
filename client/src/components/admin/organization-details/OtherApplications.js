import React, { useEffect } from 'react';
import {
  makeStyles,
  Modal,
  Typography,
  Box,
  LinearProgress
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import { Card, Button } from 'components/generic'
import { useHandleLookupConfirmationNumbers } from 'hooks/admin/organization-details/lookupOrganizationConfirmationNumbers';
import { Route as Routes } from 'constants/routes'

function getModalStyle() {
  const top = 50
  const left = 50
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    maxHeight: '95vh',
    overflow: 'scroll'
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: '95vh',
    overflow: 'scroll'
  },
}));

export function OtherApplications({ data }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <BusinessNameList handleClose={handleClose} data={data}/>
    </div>
  );

  return (
    <div>
      <Link variant="body2" onClick={handleOpen}>Duplicate SIN</Link>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}

const BusinessNameList = ({data, handleClose}) => {
  const {isFetching, confirmationNumbers, lookupOrganizationConfirmationNumbers} = useHandleLookupConfirmationNumbers()

  useEffect(() => {
    // Find matches to other applications in the system
    const internalMatches = Array.from(new Set(data.filter(item => item.ministryProgramAreaSource === 'HEALTH-FW')
      .map(item => item.applicationId)));

    if(internalMatches?.length) {
      // Look up the actual confirmation numbers of the matches organization.
      lookupOrganizationConfirmationNumbers(internalMatches);
    }
  }, []);

  return (
    <Card title={"Already Reviewed/Paid By"} color='#FEBA35'>
      <Box mb={2}>
        {data && data.map(item =>
          <Box py={2} px={1} style={{ flexDirection: "column", justifyContent: "space-around", alignItems: "flex-start" }}>
            <Box py={1}>
              <Typography variant="button">Business Name: </Typography>
              <Typography variant="body1">{item.businessName}</Typography>
            </Box>
            <Box py={1}>
              <Typography variant="button">Ministry/Program Area: </Typography>
              <Typography variant="body1">{item.ministryProgramAreaSource}</Typography>
            </Box>
            <Box py={1}>
              <Typography variant="button">Application Status: </Typography>
              <Typography variant="body1">{item.applicationStatus}</Typography>
            </Box>
            <Box py={1}>
              <Typography variant="button">Application ID: </Typography>
              <Typography variant="body1">
                {isFetching? <LinearProgress/>: (
                  confirmationNumbers[item.applicationId]? (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={`${Routes.AdminPortalOrganizationDetails}/${confirmationNumbers[item.applicationId]?.organizationId}?employee=${item.employeeSequenceNumber}`}>
                        {item.applicationId}
                      </Link>
                  ): (
                    item.applicationId
                  )
                )}
              </Typography>
            </Box>
          </Box>
        )}
        <Button
          size="small"
          color='#0A70C4'
          text="Close"
          variant="outlined"
          onClick={() => handleClose()}
        />
      </Box>
    </Card>
  )
}