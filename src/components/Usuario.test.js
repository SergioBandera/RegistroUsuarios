import "@testing-library/jest-dom";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Usuario } from "./Usuario";

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);
const store = mockStore({
  crudReducer: {
    data: [
      {
        id: "1",
        name: "test",
        stock: "4",
        price: "10",
        description: "esto es un test 1",
      },
      {
        id: "2",
        name: "test 2",
        stock: "0",
        price: "10",
        description: "esto es un test 2",
      },
      {
        id: "3",
        name: "test 3",
        stock: "4",
        price: "10",
        description: "esto es un test 3",
      },
    ],
    showAll: false,
    showStock: false,
    showByName: false,
  },
});
describe("test component Usuario", () => {
  test("si renderiza la pantalla usuario", async () => {
    render(
      <Provider store={store}>
        <Usuario />
      </Provider>
    );
    expect(
      screen.getByText(/mostrar todos los productos/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Buscar/i)).toBeInTheDocument();
    expect(screen.getByText(/mostrar solo disponibles/i)).toBeInTheDocument();
  });

  test("Buscar producto por nombre", () => {
    render(
      <Provider store={store}>
        <Usuario />
      </Provider>
    );
    const value = "test";
    const input = screen.getByPlaceholderText(/buscar por nombre/i);
    const boton = screen.getByText(/Buscar/i);
    fireEvent.change(input, { target: { value } });
    expect(input.value).toBe(value);
    fireEvent.click(boton);
  });
});
