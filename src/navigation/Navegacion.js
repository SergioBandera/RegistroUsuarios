import React, { useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { routes } from "./routes";
import { Login } from "../components/Login";
import UserContext from "../context/UserContext";
import { PublicRoute } from "./PublicRoute";

export const Navegacion = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <header>
        <nav >
          <ul>
            {routes.map(({ path, name }) => (
              <li key={path}>
                <Link to={path}> {name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Routes>
        {routes.map(({ path, component: Component, isPublic }) => (
          <Route
            path={path}
            key={path}
            element={
              isPublic ? (
                <PublicRoute isLogged={isLoggedIn} children={<Component />} />
              ) : (
                <PrivateRoute isLogged={isLoggedIn}>
                  <Component />
                </PrivateRoute>
              )
            }
          />
        ))}
        <Route
          path="*"
          element={
            <PublicRoute isLogged={isLoggedIn}>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
};
