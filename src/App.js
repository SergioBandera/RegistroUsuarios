import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { Navegacion } from "./navigation/Navegacion";
import Store from "./Redux/Store";
import "./index.css";

export const App = () => {
  return (
    <Provider store={Store}>
      <UserProvider>
        <BrowserRouter>
          <Navegacion />
        </BrowserRouter>
      </UserProvider>
    </Provider>
  );
};
