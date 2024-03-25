import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

import React from 'react';
import { useAuth } from './contexts/AuthContext';
import Products from './content/applications/Products';



// Define the authentication guard HOC
const withAuthGuard = (WrappedComponent) => {
  return (props) => {
    const { user } = useAuth();
    console.log(user)

    if (!user) {
      // Redirect to login page if user is not authenticated
      return <Navigate to="/auth/login" />;
    }

    // Render the wrapped component if user is authenticated
    return <WrappedComponent {...props} />;
  };
};

// export default withAuthGuard;


const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );



const Home = Loader(lazy(() => import('src/content/dashboards/Crypto')));

const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);


//Auth
const Login = Loader(lazy(()=>import('./content/pages/auth/Login')))
const SignUp = Loader(lazy(()=>import('./content/pages/auth/SignUp')))
const Verify = Loader(lazy(()=>import('./content/pages/auth/Verify')))

const routes: RouteObject[] = [
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
     
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'transpoters',
        element: <Products />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  }
  ,{
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <Login  />
      },
      {
        path: 'signup',
        element: <SignUp  />
      },
      {
        path: 'verify/:token',
        element: <Verify />
      }]
  }
];

export default routes;
