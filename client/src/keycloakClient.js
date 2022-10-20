import Keycloak from 'keycloak-js';

export const keycloakClient = new Keycloak({
  url: process.env.REACT_APP_KC_AUTH_URL,
  realm: process.env.REACT_APP_KC_AUTH_REALM,
  clientId: process.env.REACT_APP_KC_AUTH_CLIENT_ID,
});
