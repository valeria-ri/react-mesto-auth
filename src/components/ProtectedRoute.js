import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ component: Component, ...props }) => {
  if (!props.loggedIn) {
    return <Navigate to="./signin" />
  }

  return <Component {...props} />
}

export default ProtectedRouteElement;