import React, { Fragment, useState } from 'react';
import MuiMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { Button } from './Button';

export const Menu = ({ label, size, options, color, variant, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Fragment>
      <Button
        style={{ padding: '0px 0px 0px 8px', fontSize: size === 'small' ? 14 : 18 }}
        onClick={handleClick}
        variant={variant}
        color={color}
        fullWidth={false}
        size="small"
        text={(
          <Fragment>
            {label} <ArrowDropDownIcon />
          </Fragment>
        )}
      />
      <MuiMenu
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {options.map(({ label, onClick }) => (
          <MenuItem data-id={label} key={label} onClick={() => { handleClose(); onClick(); }}>
            {label}
          </MenuItem>
        ))}
      </MuiMenu>
    </Fragment>
  );
};
