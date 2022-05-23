
import "@testing-library/jest-dom";
import React from "react";
import { Admin } from "./Admin";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);
const store = mockStore({
  crudReducer: {
    data: [
      {
        id: "3",
        name: "test",
        stock: "4",
        price: "10",
        description: "esto es un test",
      },
    ],
    showAll: false,
    showStock: false,
    showByName: false,
  },
});

describe("Test in admin component", () => {
  test("probar si se renderiza el Admin", () => {
    render(
      <Provider store={store}>
        <Admin />
      </Provider> 
    );
    const bBorrar =screen.getByText(/borrar/i)
    const bEditar = screen.getByText(/editar/i)
    expect(bBorrar).toBeInTheDocument();
    expect(bEditar).toBeInTheDocument();
  });

  test("probar si funciona el boton añadir producto", async () => {
    render(
      <Provider store={store}>
        <Admin />
      </Provider>
    );
    const boton = screen.getByRole("button", {
      name: /Añadir nuevo producto/i,
    });
    expect(
      screen.queryByPlaceholderText(/description/i)
    ).not.toBeInTheDocument();
    fireEvent.click(boton);
    await screen.findByPlaceholderText(/description/i);
  });

  test("probar los campos de editar producto", () => {
    render(
      <Provider store={store}>
        <Admin />
      </Provider>
    );
    const bEditar = screen.getByText(/editar/i)
    fireEvent.click(bEditar)
    expect(screen.getByText(/nuevo stock/i)).toBeInTheDocument();
    expect(screen.getByText(/nuevo nombre del producto/i)).toBeInTheDocument();
    expect(screen.getByText(/nuevo precio/i)).toBeInTheDocument();
    expect(screen.getByText(/nueva descripción/i)).toBeInTheDocument();
    expect(screen.getByText(/guardar producto/i)).toBeInTheDocument();
  });

  
});
