import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthUser } from '../../../utils/utils';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={({ props }) =>
      isAuthUser() && isAuthUser().payload.user.role === 1 ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
      )
    }
  />
);

export default AdminRoute;

/* check react router documentation for this code "private routes" */
