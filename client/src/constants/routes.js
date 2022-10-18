import { isBorderPilotApp } from "../appversion";

const monitoringPrefix = isBorderPilotApp() && process.env.REACT_APP_OUTPUT === 'RTOP_ADMIN' ? '' : 'monitoring/';
const rtopTravellerPrefix = isBorderPilotApp() ? '' : 'enroll/';
const output = process.env.REACT_APP_OUTPUT
const adminPortalUrlPrefix = output === 'ALL' ? '/assessment-portal/' : '/'

export const Route = Object.freeze({

    // Shared routes.
    Root: '/',

    DashboardB: '/dashboard',
    // Topup Routes.
    Organization: '/organization',
    Employees: '/employees',
    EmployeesDetail: '/employees-detail',
    OperatorBenefit: '/operator-benefit',
    Submission: '/submission',
    Login: '/login',
    ProgramPage: '/program-information',
    ApplicationDeclaration: '/application-declaration',
    PaidEmployees: '/paid-employees',

    // Admin routes.
    AdminPortalOrganizationsLookup: `${adminPortalUrlPrefix}${output === 'ALL' ? 'organizations' : ''}`,
    AdminPortalPaymentPage: `${adminPortalUrlPrefix}payments`,
    AdminPortalOrganizationDetails: `${adminPortalUrlPrefix}organizations`,
    AdminPortalPaymentBatchDetailsPage: `${adminPortalUrlPrefix}payments/batch`,
    AdminPortalReportsPage: `${adminPortalUrlPrefix}reports`,

    // Route for appid logout page
    AppIDLogout: '/appid_logout',

    // admin-login
    // monitoring
});


export const AuthIssuer = Object.freeze({
    User: 'USER',
    GOA: 'GOA'
});

export const UserType = Object.freeze({
  BackOffice: 'Back Office',
  ServiceAlberta: 'Service Alberta',
  FreshworksAdmin: 'Admin',
  User: 'User'
});

export const Roles = Object.freeze({
    AHS: 'AHS',
    GOA: 'GOA',
    OTHER: 'OTHER',
})

export const Scope = Object.freeze({
    SCREENER: 'screener_portal',
    ADMIN: 'admin_report_access'
})

