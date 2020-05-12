import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthUser } from '../../../utils/utils';

const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      isAuthUser() ? (
        children
      ) : (
        <Redirect to={{ pathname: '/signin', state: { from: location } }} />
      )
    }
  />
);

export default PrivateRoute;

/* check react router documentation for this code "private routes" */
