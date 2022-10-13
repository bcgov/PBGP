import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Route as Routes } from 'constants/routes'
import { useAuth } from 'hooks'
import AppClosed from 'pages/AppClosed'

// Topup pages
const Dashboard = lazy(() => import('pages/topup/Dashboard'))
const ProgramPage = lazy(() => import('pages/topup/ProgramPage'))
const Organization = lazy(() => import('pages/topup/Organization'))
const Employees = lazy(() => import('pages/topup/Employees'))
const EmployeesDetail = lazy(() => import('pages/topup/EmployeesDetail'))
const OperatorBenefitApplication = lazy(() => import('pages/topup/OperatorBenefit'))
const SubmissionDetails = lazy(() => import('pages/topup/SubmissionDetails'))
const ApplicationDeclaration = lazy(() => import('pages/topup/ApplicationDeclaration'))
const PaidEmployees = lazy(() => import('pages/topup/SubmitPaidEmployees'))

// Admin pages
const OrganizationsLookup = lazy(() => import('pages/admin/OrganizationsLookup'))
const OrganizationDetails = lazy(() => import('pages/admin/OrganizationDetails'))
const PaymentPage = lazy(() => import('pages/admin/PaymentPage'))
const PaymentBatchDetails = lazy(() => import('pages/admin/PaymentBatchDetails'))
const Reports = lazy(() => import('pages/admin/Reports'))

// Shared pages
const Login = lazy(() => import('pages/topup/Login'))

const PrivateRoute = ({ Component, ...rest }) => {
  const {
    state: {
      isAuthenticated
    }
  } = useAuth()

  if (!isAuthenticated) return <Redirect to={Routes.Login} />
  return <Route {...rest} render={(props) => <Component {...props} />} />
}

// Routes only accessible to Organizations
const organizationRoutes = [
  {
    path: Routes.Root,
    component: Dashboard
  },
  {
    path: Routes.ProgramPage,
    component: ProgramPage
  },
  {
    path: Routes.Organization,
    component: Organization
  },
  {
    path: `${Routes.Organization}/:id/edit`,
    component: Organization
  },
  {
    path: `${Routes.Organization}/:id/view`,
    component: Organization
  },
  {
    path: Routes.Employees,
    component: Employees
  },
  {
    path: `${Routes.EmployeesDetail}/:id/edit`,
    component: EmployeesDetail
  },
  {
    path: `${Routes.EmployeesDetail}/:id/view`,
    component: EmployeesDetail
  },
  {
    path: `${Routes.EmployeesDetail}/:id/download`,
    component: EmployeesDetail
  },
  {
    path: Routes.OperatorBenefit,
    component: OperatorBenefitApplication
  },
  {
    path: `${Routes.OperatorBenefit}/:id`,
    component: OperatorBenefitApplication
  },
  {
    path: `${Routes.OperatorBenefit}/:id/continue`,
    component: OperatorBenefitApplication
  },
  {
    path: `${Routes.OperatorBenefit}/:id/view`,
    component: OperatorBenefitApplication
  },
  {
    path: `${Routes.OperatorBenefit}/:id/edit`,
    component: OperatorBenefitApplication
  },
  {
    path: `${Routes.OperatorBenefit}/:id/download`,
    component: OperatorBenefitApplication
  },
  {
    path: `${Routes.Submission}/:id`,
    component: SubmissionDetails
  },
  {
    path: Routes.ApplicationDeclaration,
    component: ApplicationDeclaration
  },
  {
    path: Routes.PaidEmployees,
    component: PaidEmployees
  },
]

// Routes only accessible to Admins
const adminRoutes = [
  {
    path: `${Routes.AdminPortalPaymentPage}`,
    component: PaymentPage
  },
  {
    path: Routes.AdminPortalOrganizationsLookup,
    component: OrganizationsLookup
  },
  {
    path: `${Routes.AdminPortalOrganizationDetails}/:id`,
    component: OrganizationDetails
  },
  {
    path: `${Routes.AdminPortalPaymentBatchDetailsPage}/:id`,
    component: PaymentBatchDetails
  },
  {
    path: Routes.AdminPortalReportsPage,
    component: Reports
  }
]

const AppRoutes = () => {
  let appRoutes = []
  const {
    isFetchingUser,
    state: {
      isAuthenticated
    }
  } = useAuth();

  switch (process.env.REACT_APP_OUTPUT) {
    case 'ADMIN':
      appRoutes = adminRoutes;
      break;
    case 'TRAVELLER':
      appRoutes = organizationRoutes;
      break;
    case 'ALL':
      appRoutes = organizationRoutes.concat(adminRoutes);
      break;
    default:
      // Fallback; only render organization routes, because something went wrong
      appRoutes = organizationRoutes;
      break;
  }

  // If application is closed, just show the closed app page and disable all app functionality.
  const reactAppIsClosed = process.env.REACT_APP_IS_CLOSED ?? window._env_.REACT_APP_IS_CLOSED;
  if(reactAppIsClosed === 'true'){
    return <AppClosed />;
  };

  return isFetchingUser ? (
    <LinearProgress />
  ) : (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        {appRoutes.map((route) => (
          <PrivateRoute
            key={route.path}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
        {!isAuthenticated && (
          <Route exact path={Routes.Login} render={() => <Login />} />
        )}
        <Redirect to={Routes.Root} />
      </Switch>
    </Suspense>
  );
};

export { AppRoutes as TopUpRoutes };