import React, { useState } from 'react';
import {
  FormLabel,
  FormControlLabel,
  FormControl,
  RadioGroup,
  makeStyles,
  Modal,
  Typography,
  Box
}
from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import { AdminButton } from './Admin-Button'
import { Button } from 'components/generic'
import { EmployeeDeniedReason } from 'constants/assessment-portal/employeeDeniedReason';

function getModalStyle() {
  const top = 50
  const left = 50
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function DenyOptions({
  deny,
  id,
  employeeId,
  variant,
  disabled,
  text,
  reason,
  color,
  icon,
  loading,
}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <RadioMenu
        handleClose={handleClose}
        deny={deny}
        id={id}
        employeeId={employeeId}
      />
    </div>
  );
  return (
    <div>
      <AdminButton
        variant={variant}
        disabled={disabled}
        text={text}
        color={color}
        icon={icon}
        onClick={handleOpen}
        size="small"
        loading={loading}
      />
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
      {reason && <Typography variant="body2" style={{fontSize: '12px', color}}>{EmployeeDeniedReason[reason]}</Typography>}
    </div>
  );
}

const RadioMenu = ({
  deny,
  id,
  employeeId,
  handleClose,
}) => {

  const [value, setValue] = useState(null)

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          <Box my={2}>
            <Typography variant="h6">
              Select Option
          </Typography>
          </Box>
        </FormLabel>
        <RadioGroup
          aria-label="Deny Employee"
          name="Deny Employee"
          value={value}
          onChange={handleChange}
          mb={2}
        >
          <FormControlLabel
            value="non_eligible_hours"
            control={<Radio />}
            label={EmployeeDeniedReason.non_eligible_hours}
          />
          <FormControlLabel
            value="non_eligible_position"
            control={<Radio />}
            label={EmployeeDeniedReason.non_eligible_position}
          />
          <FormControlLabel
            value="already_paid"
            control={<Radio />}
            label={EmployeeDeniedReason.already_paid}
          />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label={EmployeeDeniedReason.other}
          />
          <Box my={2}>
            <Button
              color='#0A70C4'
              text="Confirm"
              size="small"
              variant="contained"
              onClick={()=>
                {
                  deny(id, employeeId, value);
                  handleClose()
              }
              }
            />
          </Box>
          <Box mb={2}>
            <Button
              size="small"
              color='#0A70C4'
              text="Cancel"
              variant="outlined"
              onClick={() => {
                handleClose()
              }}
            />
          </Box>
        </RadioGroup>
      </FormControl>
    </Box>
  )
}


