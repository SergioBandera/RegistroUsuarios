import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Store from "../Redux/Store";
import { Registrar } from "./Registrar";


describe("Test in register component", () => {
    test("probar si se renderiza el Admin", () => {
      render(
        <Provider store={Store}>
      <Registrar />
      </Provider>
      );
    });
})
