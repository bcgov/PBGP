/** @type {import('next').NextConfig} */
module.exports = {
    publicRuntimeConfig: {
        NEXT_PUBLIC_REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
        NEXT_PUBLIC_KC_AUTH_URL: process.env.NEXT_PUBLIC_KC_AUTH_URL,
        NEXT_PUBLIC_KC_AUTH_REALM: process.env.NEXT_PUBLIC_KC_AUTH_REALM,
        NEXT_PUBLIC_KC_AUTH_CLIENT_ID: process.env.NEXT_PUBLIC_KC_AUTH_CLIENT_ID,
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
        NEXT_PUBLIC_LARGE_PROJECT: process.env.NEXT_PUBLIC_LARGE_PROJECT,
        NEXT_PUBLIC_SMALL_PROJECT: process.env.NEXT_PUBLIC_SMALL_PROJECT,
        NEXT_PUBLIC_ENVIRONMENT_PLANNING: process.env.NEXT_PUBLIC_ENVIRONMENT_PLANNING,
        NEXT_PUBLIC_DEVELOPMENT_PLANNING: process.env.NEXT_PUBLIC_DEVELOPMENT_PLANNING,
    },
    reactStrictMode: false, // https://github.com/react-keycloak/react-keycloak/issues/182#issuecomment-1119370025 Strict mode is placed within KC provider
};