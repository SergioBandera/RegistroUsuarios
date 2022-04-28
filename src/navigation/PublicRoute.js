import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTE_NAMES } from "../constants/constants";

export const PublicRoute = ({ children, isLogged }) => {
  if (isLogged) return <Navigate to={ROUTE_NAMES.HOME} />;

  return children;
};
