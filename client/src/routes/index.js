import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Route as Routes } from 'constants/routes';
import { useAuth } from 'hooks';
import AppClosed from 'pages/AppClosed';

// Topup pages
const Dashboard = lazy(() => import('pages/applicant/Dashboard'));

// Shared pages
const Login = lazy(() => import('pages/applicant/Login'));

const PrivateRoute = ({ Component, ...rest }) => {
  const {
    state: { isAuthenticated },
  } = useAuth();

  if (!isAuthenticated) return <Redirect to={Routes.Login} />;
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

// Routes only accessible to applicants
const applicantRoutes = [
  {
    path: Routes.Root,
    component: Dashboard,
  },
];

export const AppRoutes = () => {
  let appRoutes = [];
  const {
    isFetchingUser,
    state: { isAuthenticated },
  } = useAuth();

  // If application is closed, just show the closed app page and disable all app functionality.
  const reactAppIsClosed = process.env.REACT_APP_IS_CLOSED ?? window._env_.REACT_APP_IS_CLOSED;
  if (reactAppIsClosed === 'true') {
    return <AppClosed />;
  }

  return isFetchingUser ? (
    <LinearProgress />
  ) : (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        {!isAuthenticated && <Route exact path={Routes.Login} render={() => <Login />} />}
        <Redirect to={Routes.Login} />
      </Switch>
    </Suspense>
  );
};
