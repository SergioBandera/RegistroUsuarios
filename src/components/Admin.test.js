/* eslint-disable testing-library/render-result-naming-convention */
import "@testing-library/jest-dom";
import React from "react";
import { Admin } from "./Admin";
import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Store from "../Redux/Store";


describe("Test in admin component", () => {
  test("probar si se renderiza el Admin", () => {
    render(
      <Provider store={Store}>
        <Admin />
      </Provider>
    );
  });

  test("probar si funciona el boton añadir producto", async () => {
    render(
      <Provider store={Store}>
        <Admin />
      </Provider>
    );
      
    const boton = screen.getByRole("button", {
      name: /Añadir nuevo producto/i,
    });
    fireEvent.click(boton);
    
  });
});
