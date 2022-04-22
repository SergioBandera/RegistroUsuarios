import React from "react";
import { UserProvider } from "./components/context/UserContext";
import { Navegacion } from "./navigation/Navegacion";

export const App = () => {
  return (
    <UserProvider>
      <Navegacion />
    </UserProvider>
  );
};
