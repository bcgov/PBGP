import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import throttle from 'lodash.throttle';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '42px',
    paddingRight: 0,
  },
  iconButton: {
    backgroundColor: `${theme.palette.common.darkGrey} !important`,
    borderRadius: 0,
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    padding: '8px 10px',
  },
  icon: {
    color: theme.palette.common.white,
  },
}));

export const SearchBar = ({ onSearch, isFetching, initialValue, ...props }) => {
  const classes = useStyles();
  const [value, setValue] = useState(initialValue || '');
  return (
    <TextField
      fullWidth
      variant="outlined"
      value={value}
      onKeyPress={(e) => e.key === 'Enter' && onSearch(value)}
      onBlur={(e) => setValue(e.target.value.trim())}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        className: classes.root,
        endAdornment: (
          <IconButton
            className={classes.iconButton}
            centerRipple={false}
            onClick={() => onSearch(value)}
          >
            <SearchIcon className={classes.icon} />
          </IconButton>
        ),
      }}
      {...props}
    />
  );
};

export const SearchSABar = ({ onSearch, isFetching, initialValue, ...props }) => {
  const classes = useStyles();
  const [value, setValue] = useState(initialValue || '');
  return (
    <TextField
      fullWidth
      variant="outlined"
      value={value}
      onKeyPress={(e) => e.key === 'Enter' && onSearch(value)}
      onBlur={(e) => setValue(e.target.value.trim())}
      onChange={(e) => {
        const value = e.target.value;
        setValue(value);
        if (value.length === 0) { onSearch(value); return; }
        if (value.length >= 3) throttle(value => onSearch(value), 1000)(value);
      }}
      InputProps={{
        className: classes.root,
        endAdornment: (
          <IconButton
            className={classes.iconButton}
            centerRipple={false}
            onClick={() => onSearch(value)}
          >
            <SearchIcon className={classes.icon} />
          </IconButton>
        ),
      }}
      {...props}
    />
  );
};
