/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BCLogo from 'assets/images/bc_logo.png';
import LogoFrench from 'assets/images/logo-french.png';
import { Route, UserType } from 'constants/routes';
import { useAuth } from 'hooks';
import { Button, Menu } from '.';
import { useCheckPaymentAuth } from '../../hooks/admin/payment/useCheckPaymentAuth';
import { Grid, CircularProgress, Typography, Divider } from '@material-ui/core';

export const Header = () => {
  const history = useHistory();
  const { location, pathname } = useLocation();
  const [menuOptions, setMenuOptions] = useState([]);
  const { t, i18n } = useTranslation();
  const {
    clearAuthState,
    state: { userType, isAuthenticated, user, username },
  } = useAuth();

  // const userData = localStorage.getItem('auth');

  return (
    <Fragment>
      <Box
        px={1.5}
        py={2}
        display='flex'
        alignItems='center'
        justifyContent='start'
        bgcolor='primary.main'
      >
        <Box ml={5} mr={1}>
          <img
            style={{ cursor: 'pointer' }}
            height={32}
            src={BCLogo}
            alt='Logo'
            onClick={() => history.push(Route.Root)}
          />
        </Box>
        <Divider orientation='vertical' flexItem />

        <Box ml={2}>
          <Typography variant='h4' color='textSecondary'>
            Ministry of Transportation and Infrastructure
          </Typography>
        </Box>

        <Box display='flex'>
          {isAuthenticated && (
            <>
              <Menu
                options={[
                  { label: 'Logout', onClick: clearAuthState },
                  // {
                  //   label: 'Payments',
                  //   onClick: () => history.push(`${Route.AdminPortalPaymentPage}`),
                  // },
                  // {
                  //   label: 'Reports',
                  //   onClick: () => history.push(`${Route.AdminPortalReportsPage}`),
                  // },
                ]}
                label={
                  <Fragment>
                    <AccountCircleOutlinedIcon />{username}
                   
                    {/* &nbsp;{user.idTokenPayload?.name || user.idTokenPayload?.email || 'Unknown'} */}
                  </Fragment>
                }
              />
            </>
          )}
        </Box>
      </Box>
    </Fragment>
  );
};
