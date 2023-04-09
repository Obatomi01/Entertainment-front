import { useContext } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import { MyContext } from './ctx';

function ProtectedRoute({ component: Component }) {
  const ctx = useContext(MyContext);
  console.log(ctx.isAuth);
  return (
    <Route
      render={({ location }) =>
        ctx.isAuth ? (
          <Component />
        ) : (
          <Navigate to='/login' replace state={{ from: location }} />
        )
      }
    />
  );
}

export default ProtectedRoute;
