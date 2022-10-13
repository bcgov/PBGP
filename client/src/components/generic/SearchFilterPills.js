import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(() => ({
  chip: {
    height: 26,
    fontSize: 12
  },
}))

export const SearchFilterPills = ({ options, onRemove }) => {
  const classes = useStyles();
  
  return (options.map(({ value: v, label }) => (
    <Box key={v} ml={0.75} my={0.5} display="inline-block">
      <Chip
        className={classes.chip}
        label={label}
        color="primary"
        onDelete={() => onRemove(v)}
      />
    </Box>
  )));
};
