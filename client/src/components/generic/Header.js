/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment } from 'react';
import Box from '@material-ui/core/Box';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import BCLogo from 'assets/images/bc_logo.png';
import { Route } from 'constants/routes';
import { useKeycloak } from '@react-keycloak/web/lib';
import { Divider, Typography } from '@material-ui/core';
import { Menu } from './Menu';

export const Header = () => {
  const { keycloak } = useKeycloak();

  const handleLogout = () => {
    localStorage.removeItem('keycloakToken');
    keycloak.logout();
  };

  return (
    <Fragment>
      <Box
        px={1.5}
        py={2}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        bgcolor='primary.main'
      >
        <Box display='flex' alignItems='center'>
          <Box ml={5} mr={1}>
            <Link to={Route.Root}>
              <img height={32} src={BCLogo} alt='government of british columbia logo' />
            </Link>
          </Box>
          <Divider orientation='vertical' flexItem />

          <Box ml={2}>
            <Typography variant='h4' color='textSecondary'>
              Ministry of Transportation and Infrastructure
            </Typography>
          </Box>
        </Box>

        <Box display='flex'>
          {keycloak.authenticated && (
            <>
              <Menu
                options={[{ label: 'Logout', onClick: () => handleLogout() }]}
                label={
                  <Fragment>
                    <AccountCircleOutlinedIcon />
                    &nbsp;User
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
