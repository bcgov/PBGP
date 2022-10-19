import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
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
import { LinearProgress } from '@material-ui/core';

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

const App = () => {
  const handleTokens = (tokens) => {
    AxiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${tokens.token}`;
    localStorage.setItem('keycloakToken', tokens.token);
  };

  return (
    <ReactKeycloakProvider
      LoadingComponent={<LinearProgress />}
      authClient={keycloakClient}
      onTokens={handleTokens}
    >
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
                </ErrorBoundary>{' '}
              </ModalProvider>{' '}
            </AuthProvider>{' '}
          </ToastProvider>{' '}
        </BrowserRouter>{' '}
      </ThemeProvider>
    </ReactKeycloakProvider>
  );
};

ReactDOM.render(msieversion() ? <IEMessage /> : <App />, document.getElementById('root'));
