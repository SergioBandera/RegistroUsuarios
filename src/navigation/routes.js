
import { Registrar } from "../components/Registrar";
import { UsuarioLogeado } from "../components/UsuarioLogeado";
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