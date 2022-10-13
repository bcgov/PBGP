import React from 'react'
import { Button, Typography } from '@material-ui/core'

export const ConfirmAlertButton = ({ variant, text, onClick }) => (
  <Button
    variant={variant}
    onClick={onClick}
  >
    <Typography variant="body1" style={{ color: "#551A8B", textDecoration: "underline" }}>
      {text}
    </Typography>
  </Button>)
