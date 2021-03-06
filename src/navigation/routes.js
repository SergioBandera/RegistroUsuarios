
import { Registrar } from "../pages/Registrar";
import { UsuarioLogeado } from "../pages/UsuarioLogeado";
import { ROUTE_NAMES } from "../constants/constants";

export const routes = [
    {
        path: ROUTE_NAMES.HOME, 
        name: "Home",
        component: UsuarioLogeado,
        isPublic: false

    },
    {
        path: ROUTE_NAMES.REGISTER, 
        name: "Register",
        component: Registrar,
        isPublic: true
    }
]