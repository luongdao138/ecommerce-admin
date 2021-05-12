import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoggedInRoute = ({ children, authenticated, loggedInPath, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!authenticated) return children;

        return <Redirect to={loggedInPath} />;
      }}
    />
  );
};

export default LoggedInRoute;
