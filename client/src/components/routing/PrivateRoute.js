import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

//Allow only authenticated users access private routes
const PrivateRoute = (props) => {
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  if (!isAuthenticated && !isLoading) {
    return <Redirect to="/login" />;
  } else {
    return <Route exact path={props.path} component={props.component} />;
  }
};

export default PrivateRoute;
