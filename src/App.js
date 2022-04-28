import React from "react";
import { UserProvider } from "./context/UserContext";
import { Navegacion } from "./navigation/Navegacion";

export const App = () => {
  return (
    <UserProvider>
      <Navegacion />
    </UserProvider>
  );
};
