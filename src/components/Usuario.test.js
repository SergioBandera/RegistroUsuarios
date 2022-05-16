import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import Store from "../Redux/Store"
import { Usuario } from "./Usuario"



test ("si funciona el boton login", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const login = render(<Provider store={Store}><Usuario/></Provider>)
    // eslint-disable-next-line testing-library/no-debugging-utils
 
    
   })