import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthUser } from '../../../utils/utils';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthUser() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;

/* check react router documentation for this code "private routes" */
