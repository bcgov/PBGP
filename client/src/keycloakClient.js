import Keycloak from 'keycloak-js';

const authUrl = 'https://keycloak.freshworks.club/auth';
const authRealm = 'PBPG-dev';
const authClientId = 'PBGP';

export const keycloakClient = new Keycloak({
  url: authUrl,
  realm: authRealm,
  clientId: authClientId,
});
