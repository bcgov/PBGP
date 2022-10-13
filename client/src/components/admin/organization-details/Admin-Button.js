import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from "@material-ui/core/CircularProgress";

export const AdminButton = ({hidden, text, color, variant, size, icon, onClick, disabled, fullWidth, loading}) => (
  <Button
    variant={variant}
    hidden={hidden}
    size={size}
    style={{ color: color, borderRadius: 4, minWidth:100 }}
    startIcon={loading ? null : icon}
    onClick={onClick}
    disabled={disabled || loading}
    fullWidth={fullWidth ? fullWidth : false}
  >
    {loading ? <CircularProgress color="primary" size={20} /> : text}
  </Button>
)
  