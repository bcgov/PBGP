import React, { useState } from 'react';
import {
  makeStyles,
  Typography,
  Box,
  Grid
}
from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { FilesTableColumns } from 'constants/assessment-portal/tableColumns';
import { Button, Table } from 'components/generic'
import { cdtToLocalString } from 'utils';
import { useAuth, useModal } from "hooks"

const useStyles = makeStyles(() => ({
  taskContainer: {
    border: '1px solid black',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  disabled: {
    borderColor: 'rgba(220,220,220, 0.8)',
    color: 'rgba(220,220,220, 0.8)',
    cursor: 'default'
  }
}));

const Body = ({task, submitAction, closeModal, filesProps: { filesList, isFetchingFiles }}) => {
  const [isModalBodyTransitioned, setTransitionModal] = useState(false);
  const [currentActionContext, setCurrentActionContext] = useState(undefined);
  const { state } = useAuth();

  const handleTaskAction = (actionItem, file=null) => submitAction({
    // If this action is triggered by a 'Send' type button, also send the current fileId.
    // file prop will be null if triggered by any other button type
    actionItemId: actionItem.id,
    fileType:
        task.name === "Send Fully Executed Grant Agreement to Operator" || "Finance Review of Grant Agreement" ? "grant" : "summary",
    action: actionItem.actionName === 'Approve'? 'approve': '',
    fileId: file?.id
  })
  
  const handleButtonAction = (action) => {
    switch (action.actionName) {
      case 'Download' :
        // If the button type is a Download, swap action to re-render modal body
        setCurrentActionContext(action)
        setTransitionModal(true);
        break;
      case 'Approve':
        handleTaskAction(action);
        closeModal();
        break;
      case 'Complete':
        handleTaskAction(action);
        closeModal();
        break;
      case 'Send' :
        setCurrentActionContext(action)
        setTransitionModal(true)
        break;
      case 'Upload' :
        handleTaskAction(action);
        closeModal();
      default :
        closeModal()
        window.alert('that action did nothing - remember to add it to the switch statement')
        break;
    }
  }

  return (
    <Box p={4}>
      <Grid container spacing={2}>

        {
          isModalBodyTransitioned
            ?
            <>
              <Grid item justify='center' xs={12}>
                <Table
                  data={
                    filesList.map(file => ({
                      ...file,
                      download: (
                        // Hijack and overload the initial onClick
                        // to also fire the action request and control modal state
                        // in the event button type is 'Download
                        <Button
                          text={currentActionContext.actionName}
                          onClick={() => {
                            if (currentActionContext.actionName === 'Download') {

                            file.download.props.onClick()
                            setCurrentActionContext(undefined)
                            handleTaskAction(currentActionContext)
                            closeModal()
                            } else {

                              setCurrentActionContext(undefined)
                              handleTaskAction(currentActionContext, file)
                              closeModal()
                            }
                          }}
                          variant='outlined'
                        />
                      )
                    }))
                  }
                  isEditable={false}
                  isLoading={isFetchingFiles}
                  isAssessmentPortal={true}
                  columns={FilesTableColumns}
                  totalCount={filesList?.length}
                  options={{
                    doubleHorizontalScroll: true,
                    pageSize: 5,
                    pageSizeOptions: [5]
                  }}
                />
              </Grid>
            </>

            :
            <>
              <Grid item container justify='flex-start' xs={12}>
                <Typography variant='h3' color='secondary'>
                  {cdtToLocalString(task.dateCreated,'YYYY/MM/DD hh:mm A')}
                </Typography>
              </Grid>
              <Grid item container justify='flex-start' xs={12} style={{paddingBottom: '16px'}}>
                <Typography variant='h2'>
                  {task.name}
                </Typography>
              </Grid>
              <Grid item container justify='flex-start' xs={12} style={{paddingBottom: '16px'}}>
                <Typography style={{fontSize: '20px'}} >
                {task.description && task.description}
                </Typography>
              </Grid>
              <Grid item container justify='flex-start' xs={12} style={{paddingBottom: '0px'}}>
                <Typography variant='h4'>
                  Action Items:
                </Typography>
              </Grid>
              {task.actionItems &&
                task.actionItems.map((action, index) => (
                  <Grid item container justify='flex-start' alignItems='center' xs={12} spacing={1} key={index}>
                    <Grid item xs={5} >
                      <Grid item container justify='flex-start' >
                        <Typography style={{fontSize: '10px'}}>
                          {'\u2B24'}&nbsp;&nbsp;&nbsp;&nbsp;
                        </Typography>
                        <Typography>{action.name}</Typography>
                      </Grid>
                      <Grid item container justify='flex-start' >
                        {
                          action.status === 'complete'
                            &&
                          <Grid item >
                            <Box
                              fontSize='14px'
                              lineHeight='20px'
                              letterSpacing='-0.25px'
                              display='flex'
                              fontWeight='bold'
                              alignItems='center'
                              color='rgb(220,220,220)'
                            >
                              Completed By:&nbsp;<AccountCircleOutlinedIcon fontSize='small' />&nbsp;
                              {action.completedBy} on {cdtToLocalString(action.dateCompleted,'YYYY/MM/DD hh:mm A')}
                            </Box>
                          </Grid>
                        }
                      </Grid>
                    </Grid>
                    <Grid item container justify='flex-start' xs={2} >
                      <Button
                        style={{minWidth: '125px'}}
                        text={action.status === 'complete' ? <CheckCircleOutlineIcon fontSize='small'/> : action.actionName}
                        variant='outlined'
                        disabled={action.status === 'complete' || ( process.env.REACT_APP_GRANT_APPROVER_CHECK_FLAG === 'true' && action.actionName ==='Approve' && task.name === 'Finance Review of Grant Agreement' && process.env.REACT_APP_GRANT_APPROVER_EMAIL !== state.user.idTokenPayload.email)}
                        fullWidth={false}
                        onClick={() => handleButtonAction(action)}
                      />
                    </Grid>
                    {
                      action.status === 'complete'
                        &&
                      <Typography
                        variant='body2'
                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={() => handleButtonAction(action)}
                        hidden={ process.env.REACT_APP_GRANT_APPROVER_CHECK_FLAG === 'true' && action.actionName ==='Approve' && task.name === 'Finance Review of Grant Agreement'  && process.env.REACT_APP_GRANT_APPROVER_EMAIL !== state.user.idTokenPayload.email }
                      >
                        {`Re-${action.actionName}`}
                      </Typography>
                    }
                  </Grid>
                ))
              }
            </>
        }

      </Grid>
    </Box>
  )
}

export const TasksList = ({submissionType, submitAction, tasks, filesProps}) => {
  const classes = useStyles();
  const {openModal, closeModal} = useModal();

  const handleOpen = (task) => {
    openModal({
      title: 'Task Details',
      description: <Body task={task} submitAction={submitAction} closeModal={closeModal} filesProps={filesProps}/>,
      size: 'md',
      disableBackdropClick: true,
      negativeActionText: 'Close',
      negativeActionOnClick: () => closeModal(),
    })
  };

  return (
    <>
      <Box
        pt={1.5}
        pb={2}
        fontSize='16px'
        fontWeight='bold'
        lineHeight='19px'
        letterSpacing='0'
        color='secondary.main'
      >
        {submissionType}
      </Box>
      {
        tasks.map((task, i) => {
          const isCellDisabled = task.status === 'pending'
          return (
            <Box
              key={`${task.status}-${i}`}
              mb={2}
              p={2}
              onClick={() => !isCellDisabled && handleOpen(task)}
              className={`${classes.taskContainer} ${isCellDisabled && classes.disabled}`}
            >
              <Grid container spacing={2}>
                <Grid container item>
                  <Grid item xs={6}>
                    <Typography style={{ fontWeight: 'bold', fontSize: '12px', lineHeight: '12px'}}>{task.status === 'complete' ? 'Task completed:' : 'Task Created:'}</Typography>
                   <Typography variant='body2' color={!isCellDisabled ? 'secondary' : 'initial'}>
                      {task.status === 'complete' ? cdtToLocalString(task.dateCompleted,'YYYY-MM-DD hh:mm') : cdtToLocalString(task.dateCreated,'YYYY-MM-DD hh:mm') }
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      fontSize='14px'
                      lineHeight='20px'
                      letterSpacing='-0.25px'
                      display='flex'
                      justifyContent='flex-end'
                      alignItems='center'
                    >
                      {
                        task.completed_by
                          &&
                        <>
                          <AccountCircleOutlinedIcon fontSize='small' />&nbsp;{task.completedBy}
                        </>
                      }
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs={8}>
                      <Typography variant='body2'>{task.name}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                  <Box
                      fontSize='14px'
                      lineHeight='20px'
                      letterSpacing='-0.25px'
                      display='flex'
                      fontWeight='bold'
                      justifyContent='flex-end'
                      color={task.status === 'active' ? 'secondary.main' : ''}
                    >
                      {task.status.toUpperCase()}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )
        })
      }
    </>
  )
}


