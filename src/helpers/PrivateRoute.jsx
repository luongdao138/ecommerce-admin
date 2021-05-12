import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, authenticated, loading, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) return <div>Loading...</div>;
        if (authenticated) return children;

        return <Redirect to='/login' />;
      }}
    />
  );
};

export default PrivateRoute;
