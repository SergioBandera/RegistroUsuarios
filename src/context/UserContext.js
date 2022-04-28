import React, { useEffect, useState } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

    const checkIsLogged = ()=>{
        const user = sessionStorage.getItem( "datosUsuario")
        if (user) {
            setRole(user.role)
            setIsLoggedIn(true);
        }

    }
    useEffect(() => {
        checkIsLogged();
    
 
    }, [])
    
  return (
    <UserContext.Provider value={{ isLoggedIn, role, setIsLoggedIn, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
