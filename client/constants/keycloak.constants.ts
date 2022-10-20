export const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KC_AUTH_URL || '',
  realm: process.env.NEXT_PUBLIC_KC_AUTH_REALM || '',
  clientId: process.env.NEXT_PUBLIC_KC_AUTH_CLIENT_ID || '',
};
