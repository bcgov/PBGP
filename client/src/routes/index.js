import React, { Suspense, lazy, useEffect, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Route as Routes } from 'constants/routes';
import { useAuth } from 'hooks';
import AppClosed from 'pages/AppClosed';
import DashboardB from 'pages/applicant/DashboardB';
import { useKeycloak } from '@react-keycloak/web/lib';
import { AuthContext } from 'index';

// Topup pages

// Shared pages
const Login = lazy(() => import('pages/applicant/Login'));

const PrivateRoute = ({ component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { keycloak, initialized } = useKeycloak();

  // Loading while keycloak is initializing
  if (!initialized) return <LinearProgress />;

  // Loading after we've been authenticated but haven't received tokens
  if (keycloak.authenticated && !authContext.tokensInitialized) return <LinearProgress />;

  if (!keycloak.authenticated) {
    return <Redirect to={Routes.Login} />;
  }

  return <Route component={component} {...rest} />;
};

// Routes only accessible to applicants

export const AppRoutes = () => {
  // If application is closed, just show the closed app page and disable all app functionality.
  const reactAppIsClosed = process.env.REACT_APP_IS_CLOSED ?? window._env_.REACT_APP_IS_CLOSED;
  if (reactAppIsClosed === 'true') {
    return <AppClosed />;
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route exact path={Routes.Login} render={() => <Login />} />

        <PrivateRoute path={Routes.DashboardB} component={DashboardB} />
        <Redirect to={Routes.DashboardB} />
      </Switch>
    </Suspense>
  );
};
