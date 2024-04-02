import { PropsWithChildren, Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';

import React from 'react';
import { useAuth } from './contexts/AuthContext';
import Products from './content/applications/Products';


interface AuthGuardProps extends PropsWithChildren<{}>  {
  element: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ element }) => {
  const { user } = useAuth(); 
  return user ? (element  as React.ReactElement) : <Navigate to="/auth/login" replace />;
};

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Home = Loader(lazy(() => import('./content/dashboards/Crypto')));

// const Transactions = Loader(
//   lazy(() => import('src/content/applications/Transactions'))
// );

const AddProducts= Loader(lazy(()=>import("./content/pages/Products/AddProduct")))
// const UserProfile = Loader(
//   lazy(() => import('src/content/applications/Users/profile'))
// );
const UserSettings = Loader(
  lazy(() => import('./content/applications/Users/settings'))
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
        element:<AuthGuard element={<Home />}/>
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'addProducts',
        element:<AuthGuard element={<AddProducts />}/> 
      },
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
          // {
          //   path: 'details',
          //   element: <UserProfile />
          // },
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
