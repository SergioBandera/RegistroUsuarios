/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
/**
 * @jest-environment jsdom
 */
import React from "react";
import { Login } from "./Login";
import { fireEvent, render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { loginMock } from "../configs/mocks/apiResponses";
import createMockStore from "redux-mock-store";
import { PublicRoute } from "../navigation/PublicRoute";
import { doLoginSucces } from "../Redux/Actions/loginAction";
import thunk from "redux-thunk";
const middlewares = [thunk];

const mockStore = createMockStore(middlewares);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: () => <h1>Navigate</h1>,
}));

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
    const { getByTestId } = render(
      <Wrapper store={store}>
        <Login />
      </Wrapper>
    );

    expect(getByTestId("usernameInput")).toBeInTheDocument();
  });
  test("Deber cambiar el valor del input", () => {
    const value = "test";
    const { getByTestId } = render(
      <Wrapper store={store}>
        <Login />
      </Wrapper>
    );

    const input = getByTestId("usernameInput");
    fireEvent.change(input, { target: { value } });
    expect(input.value).toBe(value);
  });
  test("Deber hacer el submit", async () => {
    const response = await loginMock();
    const { getByTestId } = render(
      <Wrapper store={store}>
        <Login />
      </Wrapper>
    );

    await act(async () => {
      const input = getByTestId("submitBtn");
      fireEvent.click(input);
    });

    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([expect.objectContaining(doLoginSucces(response))])
    );
  });
});

const Wrapper = ({ children, store }) => {
  return (
    <Provider store={store}>
      <PublicRoute>{children}</PublicRoute>
    </Provider>
  );
};
