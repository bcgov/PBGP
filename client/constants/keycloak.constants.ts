export const keycloakConfig = {
  realm: process.env.NEXT_PUBLIC_KC_AUTH_REALM || '',
  url: process.env.NEXT_PUBLIC_KC_AUTH_URL || '',
  clientId: process.env.NEXT_PUBLIC_KC_AUTH_CLIENT_ID || '',
};
