export const loginResponse = {
  userName: "Lewis",
};

export const loginFailed = {
  status: 401,
  data: {
    message: "Invalid credentials",
  },
};

export const loginMock = () => {
  global.fetch = jest
    .fn()
    .mockImplementation(() => ({
      json: () => loginResponse,
    }));
  return loginResponse;
};
