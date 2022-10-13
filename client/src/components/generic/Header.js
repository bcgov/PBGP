import React, { Fragment, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import LogoSmall from 'assets/images/logo-small.svg';
import LogoFrench from 'assets/images/logo-french.png';
import { Route, UserType } from 'constants/routes';
import { useAuth } from 'hooks';
import { Button, Menu } from '.';
import { useCheckPaymentAuth } from '../../hooks/admin/payment/useCheckPaymentAuth'
import {  Grid, CircularProgress } from "@material-ui/core";

export const Header = () => {
  const { auth, loadingEnv } = useCheckPaymentAuth()
  const history = useHistory();
  const {location, pathname} = useLocation();
  const [menuOptions, setMenuOptions] = useState([]);
  const { t, i18n } = useTranslation();
  const { clearAuthState, state: { userType, isAuthenticated, user } } = useAuth();

  const changeLanguage = async () => {
    const lng = i18n.language === 'en' ? 'fr' : 'en';
    await i18n.changeLanguage(lng);
    history.replace(Route.Root + lng);
    document.title = t("Critical Worker Benefit");
  }

  if (loadingEnv){
    return(
    <Grid style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: "center", alignItems: "center"}} >
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <Fragment>
      <Box py={0.75} px={[1.25, 3]} display="flex" alignItems="center" justifyContent="space-between">
        <img
          style={{ cursor: 'pointer' }}
          height={32}
          src={i18n.language === 'en' ? LogoSmall : LogoFrench}
          alt="Logo"
          onClick={() => pathname.includes('assessment-portal') ? history.push(Route.AdminPortalOrganizationsLookup) : history.push(Route.Root)}
        />

         <Box display="flex">
          <Hidden smUp>
            {!isAuthenticated && (pathname === Route.Root + 'fr' || pathname === Route.Root + 'en') && (
              <Menu
              options={[
                { label: t('Language'), onClick: changeLanguage }
              ]}
              label={( <MoreVertIcon /> )}
            />
            )}  

            {isAuthenticated && (pathname === Route.Root + 'fr' || pathname === Route.Root + 'en') && (
              <Menu
              options={[
                { label: t('Language'), onClick: changeLanguage },
                { label: 'Logout', onClick: clearAuthState }
              ]}
              label={(
                <Fragment>
                  <AccountCircleOutlinedIcon/>&nbsp;{user.idTokenPayload?.name || user.idTokenPayload?.email || 'Unknown'}
                </Fragment>
              )}
            />
            )}
          </Hidden>

          <Hidden xsDown>
          {(pathname === Route.Root + 'fr' || pathname === Route.Root + 'en') && (
              <div>
                <Box
                  component={Button}
                  mr={3}
                  style={{ minWidth: 175 }}
                  text={t('Language')}
                  variant="outlined"
                  fullWidth={false}
                  size="small"
                  onClick={ changeLanguage }
                />
              </div>
            )}
          </Hidden>
            {
              isAuthenticated && (
                <>
                  <Menu
                    options={
                      auth ? [
                                { label: 'Logout', onClick: clearAuthState }, 
                                { label: 'Payments', onClick: ()=> history.push(`${Route.AdminPortalPaymentPage}`) },
                                { label: 'Reports', onClick: () => history.push(`${Route.AdminPortalReportsPage}`)},
                              ] : [{ label: 'Logout', onClick: clearAuthState}]}
                    label={(
                      <Fragment>
                        <AccountCircleOutlinedIcon/>&nbsp;{user.idTokenPayload?.name || user.idTokenPayload?.email || 'Unknown'}
                      </Fragment>
                    )}
                  />
                </>
              )
            }
        </Box>
      </Box>
    </Fragment>
  );
};