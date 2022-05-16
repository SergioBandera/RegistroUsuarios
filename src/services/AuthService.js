export const login = (body) => {
  return fetch("http://localhost:8080/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body,
  });
};
