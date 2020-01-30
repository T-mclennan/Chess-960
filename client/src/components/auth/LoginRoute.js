import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const LoginRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/lobby",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
