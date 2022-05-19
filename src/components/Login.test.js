/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import "@testing-library/jest-dom";
import React from "react";
import { Login } from "./Login";
import { fireEvent, render, act, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { loginMock } from "../configs/mocks/apiResponses";
import { PublicRoute } from "../navigation/PublicRoute";
import { doLoginSucces } from "../Redux/Actions/loginAction";
import thunk from "redux-thunk";
import createMockStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: () => <h1>Navigate</h1>,
}));
const Wrapper = ({ children, store }) => {
  return (
    <Provider store={store}>
      <PublicRoute>{children}</PublicRoute>
    </Provider>
  );
};

describe("Test in Login Component:", () => {
  const store = mockStore({
    loginReducer: {
      user: null,
      role: null,
      error: null,
      isLoading: false,
      isLoggedIn: false,
    },
  });
  test("Debería de renderizar correctamente", () => {
    const { container } = render(
      <Wrapper store={store}>
        <Login />
      </Wrapper>
    );

    expect(container).toBeInTheDocument();
  });

  test("Debería de mostrar el input correctamente", () => {
    const { getByPlaceholderText } = render(
      <Wrapper store={store}>
        <Login />
      </Wrapper>
    );
    expect(getByPlaceholderText(/usuario/i)).toBeInTheDocument();
  });

  test("Deberia cambiar el valor de los input", () => {
    const value = "test";
    render(
      <Wrapper store={store}>
        <Login />
      </Wrapper>
    );
    const username = screen.getByPlaceholderText(/usuario/i);
    const password = screen.getByPlaceholderText(/contraseña/i);
    fireEvent.change(username, { target: { value } });
    fireEvent.change(password, { target: { value } });
    expect(username.value).toBe(value);
    expect(password.value).toBe(value);
  });

  test("Deber hacer el submit", async () => {
    const response = await loginMock();
    const { getByRole } = render(
      <Wrapper store={store}>
        <Login />
      </Wrapper>
    );
    await act(async () => {
      const bLogin = getByRole("button", { name: /login/i });
      fireEvent.click(bLogin);
    });
    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([expect.objectContaining(doLoginSucces(response))])
    );
  });
});
