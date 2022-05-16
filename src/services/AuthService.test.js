import { loginMock } from "../configs/mocks/apiResponses";
import * as AuthService from "./AuthService";

describe("Test in AuthService", () => {
  test("Debe hacer el login correctamente", async () => {
    const expected = await loginMock();
    const dataToTest = {
      username: "Lewis",
      password: "123456",
    };

    const response = await AuthService.login(dataToTest);
    const received = response.json();

    expect(received).toEqual(expected);
  });
});
