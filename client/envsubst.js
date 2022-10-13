const replace = require('replace-in-file');

const devConfig = {
    oauthServerUrl: process.env.OAUTH_SERVER_URL,
    tenantId: process.env.TENANT_ID,
    discoveryEndpoint: process.env.REACT_APP_IBM_DISCOVERY_ENDPOINT,
    clientId: process.env.REACT_APP_IBM_CLIENT_ID,
    borderPilotDomain: process.env.REACT_APP_BORDER_PILOT_DOMAIN,
    oauthLoginURL: process.env.REACT_APP_OAUTH_LOGIN_URL,
    formAlert: process.env.REACT_APP_FORM_ALERT,
    dailyCheckInAlert: process.env.REACT_APP_DAILY_CHECKIN_ALERT,
    approverEmail: process.env.REACT_APP_GRANT_APPROVER_EMAIL,
    approverCheckFlag: process.env.REACT_APP_GRANT_APPROVER_CHECK_FLAG,
    reactAppIsClosed: process.env.REACT_APP_IS_CLOSED,
    reactAppClosedHeaderText: process.env.REACT_APP_CLOSED_HEADER_TEXT,
    reactAppClosedBodyText: process.env.REACT_APP_CLOSED_BODY_TEXT,
};

const envConfOrDev = (envVariable, prop) => {
    envVariable = envVariable? JSON.parse(envVariable): {};

    return {
        oauthServerUrl: (devConfig.oauthServerUrl || envVariable.oauthServerUrl || '').trim(),
        tenantId: (devConfig.tenantId || envVariable.tenantId || '').trim(),
        discoveryEndpoint: (devConfig.discoveryEndpoint || envVariable.discoveryEndpoint || '').trim(),
        clientId: (devConfig.clientId || envVariable.clientId || '').trim()
    }[prop];
};

const envs = [
    {
        val: envConfOrDev(process.env.APPID_AHS, 'clientId'),
        name: '__AHS_CLIENT_ID__'
    },
    {
        val: envConfOrDev(process.env.APPID_AHS, 'discoveryEndpoint'),
        name: '__AHS_DISCOVERY_ENDPOINT__'
    },
    {
        val: envConfOrDev(process.env.APPID_CLOUD, 'clientId'),
        name: '__OTHER_CLIENT_ID__'
    },
    {
        val: envConfOrDev(process.env.APPID_CLOUD, 'discoveryEndpoint'),
        name: '__OTHER_DISCOVERY_ENDPOINT__'
    },
    {
        val: envConfOrDev(process.env.APPID_SA, 'clientId'),
        name: '__GOA_CLIENT_ID__'
    },
    {
        val: envConfOrDev(process.env.APPID_SA, 'discoveryEndpoint'),
        name: '__GOA_DISCOVERY_ENDPOINT__'
    },
    {
        val: devConfig.borderPilotDomain,
        name: '__REACT_APP_BORDER_PILOT_DOMAIN__'
    },
    {
        val: devConfig.oauthLoginURL,
        name: '__REACT_APP_OAUTH_LOGIN_URL__'
    },
    {
        val: devConfig.dailyCheckInAlert,
        name: '__REACT_APP_DAILY_CHECKIN_ALERT__'
    },
    {
        val: devConfig.formAlert,
        name: '__REACT_APP_FORM_ALERT__'
    },
    {
        val: devConfig.approverEmail,
        name: '__REACT_APP_GRANT_APPROVER_EMAIL__'
    },
    {
        val: devConfig.approverCheckFlag,
        name: '__REACT_APP_GRANT_APPROVER_CHECK_FLAG__'
    },
    {
        val: devConfig.reactAppIsClosed,
        name: '__REACT_APP_IS_CLOSED__'
    },
    {
        val: devConfig.reactAppClosedHeaderText,
        name: '__REACT_APP_CLOSED_HEADER_TEXT__'
    },
    {
        val: devConfig.reactAppClosedBodyText,
        name: '__REACT_APP_CLOSED_BODY_TEXT__'
    }
];

const from = envs.map(v => new RegExp(v.name, 'g'));
const to = envs.map(v => v.val || '');


replace.sync({
    files: '/client/build/index.html',
    from: from,
    to: to
});

