import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReactKeycloakProvider } from '@react-keycloak/web';

import './constants/i18n';
import { Theme, AuthIssuer } from './constants';
import { AxiosPrivate } from 'utils';

import { AppRoutes } from './routes';
import { Toast, Modal, ErrorBoundary } from './components/generic';
import { AuthProvider, ToastProvider, ModalProvider } from './providers';
import { keycloakClient } from './keycloakClient';
import { Box, CircularProgress, Typography } from '@material-ui/core';

function msieversion() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    // If Internet Explorer
    return true;
  } else if (/*@cc_on!@*/ false || !!document.documentMode) {
    return true;
  }
  return false;
}

const IEMessage = () => {
  const { t } = useTranslation();
  return (
    <div>
      {t(
        'This content is ignored in IE browsers. Please use either Chrome, Edge, Safari, or Firefox.'
      )}{' '}
    </div>
  );
};

const authIssuer = process.env.REACT_APP_OUTPUT === 'ALL' ? AuthIssuer.GOA : AuthIssuer.User;

export const AuthContext = React.createContext({
  tokensInitialized: false,
});

const App = () => {
  const [authState, setAuthState] = useState({
    tokensInitialized: false,
  });

  const handleTokens = (tokens) => {
    AxiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${tokens.token}`;
    setAuthState((prev) => ({ ...prev, tokensInitialized: true }));
  };

  return (
    <ReactKeycloakProvider
      LoadingComponent={
        <Box
          height='100vh'
          width='100%'
          display='flex'
          justifyContent='center'
          flexDirection='column'
          alignItems='center'
        >
          <CircularProgress />
          <Typography
            style={{
              fontFamily: 'acumin-pro-semi-condensed, sans-serif',
              fontWeight: '600',
              fontSize: '1.5rem',
              paddingTop: '1rem',
            }}
            variant='h1'
          >
            Authenticating...
          </Typography>
        </Box>
      }
      authClient={keycloakClient}
      onTokens={handleTokens}
    >
      <AuthContext.Provider value={authState}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            <ToastProvider>
              <AuthProvider authIssuer={authIssuer} userType={AuthIssuer.User}>
                <ModalProvider>
                  <ErrorBoundary>
                    <CssBaseline />
                    <Toast />
                    <Modal />
                    <AppRoutes />
                  </ErrorBoundary>
                </ModalProvider>
              </AuthProvider>
            </ToastProvider>
          </BrowserRouter>
        </ThemeProvider>
      </AuthContext.Provider>
    </ReactKeycloakProvider>
  );
};

ReactDOM.render(msieversion() ? <IEMessage /> : <App />, document.getElementById('root'));
