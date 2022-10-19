import React, { Suspense, lazy, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Route as Routes } from 'constants/routes';
import { useAuth } from 'hooks';
import AppClosed from 'pages/AppClosed';
import DashboardB from 'pages/applicant/DashboardB';
import { useKeycloak } from '@react-keycloak/web/lib';

// Topup pages

// Shared pages
const Login = lazy(() => import('pages/applicant/Login'));

const PrivateRoute = ({ Component, ...rest }) => {
  const { keycloak, initialized } = useKeycloak();
  if (!initialized) return <LinearProgress />;

  if (!keycloak.authenticated) {
    return <Redirect to={Routes.Login} />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

// Routes only accessible to applicants

export const AppRoutes = () => {
  const { initialized } = useKeycloak();

  // If application is closed, just show the closed app page and disable all app functionality.
  const reactAppIsClosed = process.env.REACT_APP_IS_CLOSED ?? window._env_.REACT_APP_IS_CLOSED;
  if (reactAppIsClosed === 'true') {
    return <AppClosed />;
  }

  if (!initialized) return <LinearProgress />;

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
