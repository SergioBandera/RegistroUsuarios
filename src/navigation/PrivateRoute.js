import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTE_NAMES } from "../constants/constants";

export const PrivateRoute = ({ children, isLogged }) => {
  if (!isLogged) return <Navigate to={ROUTE_NAMES.LOGIN} />;

  return children;
};
