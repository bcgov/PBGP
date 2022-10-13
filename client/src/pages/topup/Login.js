import React, { Fragment, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";

import Logo from "../../assets/images/logo-large.svg";

import { Route, UserType, AuthIssuer } from "../../constants";
import { useLogin } from "../../hooks";

import { Page, Button } from "../../components/generic";

export default () => {
  const history = useHistory();
  const { login, isFetching } = useLogin();

  const isUniversalLogin = history.location.pathname === Route.Login;
  const isBackOfficeLogin = history.location.pathname === Route.BackOfficeLogin;
  const isServiceAlbertaLogin = history.location.pathname === Route.ServiceAlbertaLogin;

  useEffect(() => {
    document.title = 'Alberta Stimulus Package - Login'
  }, [])

  return (
    <Page hideHeader hideFooter centerContent isLoading={isFetching}>
      <Grid container justify="center">
        <Grid item xs={10} sm={6} md={4} lg={2} xl={1}>
          <Box m={2} display="flex" flexDirection="column" alignItems="center">
            <Box mb={3}>
              <img
                style={{ cursor: 'pointer' }}
                onClick={() => history.push(Route.AdminForm)}
                src={Logo}
                height={48}
                alt="Logo"
              />
            </Box>
            {(isBackOfficeLogin || isServiceAlbertaLogin) && (
              <Fragment>
                <Box width={300} mt={2} mb={2}>
                  <Button
                    type="submit"
                    text="AHS Login"
                    onClick={() => login(UserType.BackOffice, 'AHS')}
                  />
                </Box>
                <Box width={300} mt={2} mb={2}>
                  <Button
                    type="submit"
                    text="Contractor Login"
                    onClick={() => login(UserType.BackOffice, 'OTHER')}
                    loading={isFetching}
                  />
                </Box>
                <Box width={300} mt={2} mb={2}>
                  <Button
                    type="submit"
                    text="GOA Login"
                    onClick={() => login(UserType.ServiceAlberta, 'GOA')}
                  />
                </Box>
              </Fragment>
            )}
            {isUniversalLogin && (
              <Fragment>
                <Box width={300} mt={2} mb={2}>
                  <Button
                    type="submit"
                    text="User Login"
                    onClick={() => login(UserType.User, AuthIssuer.User)}
                  />
                </Box>
              </Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};
