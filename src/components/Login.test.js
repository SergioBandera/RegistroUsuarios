/* eslint-disable testing-library/render-result-naming-convention */
/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Login } from "./Login";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Store from "../Redux/Store";


beforeEach(() =>{
    const login = render(<Provider store={Store}><Login/></Provider>)
})

describe("Login test", () => {
  test("renderizar boton login", () => {
    // const login = render(
    //   <Provider store={Store}>
    //     <Login />
    //   </Provider>
    // );
    const bLogin = screen.getByRole("button", { name: /login/i });
    expect(bLogin).toBeInTheDocument();
  });

  test("renderizar formulario", () => {
    // const login = render(
    //   <Provider store={Store}>
    //     <Login />
    //   </Provider>
    // );
    const tUsuario = screen.getByText(/usuario/i);
    const tPassword = screen.getByText(/contraseña/i);
    expect(tUsuario).toBeInTheDocument();
    expect(tPassword).toBeInTheDocument();
  });
  
  test("hacer login", () => {
    const bLogin = screen.getByRole("button", { name: /login/i });
    const iUsuario = screen.getByPlaceholderText(/usuario/i);
    const iPass = screen.getByPlaceholderText(/contraseña/i);
    fireEvent.change(iUsuario, { target: { value: "user" } });
    fireEvent.change(iPass, { target: { value: "1234" } });
    expect(iUsuario).toHaveValue("user");
    expect(iPass).toHaveValue("1234");
    // const mockLogin = jest.fn();
    // bLogin.onsubmit(mockLogin)
    fireEvent.click(bLogin)
    console.log(fireEvent.click(bLogin).valueOf())
    // expect(mockLogin).toBeCalledTimes(1)1
    
    
    
    // const mockLogin = jest.fn();
    // console.log(mockLogin)
    
    


  });
});
