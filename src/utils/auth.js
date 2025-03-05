import { checkResponse } from "./api";

const BASE_URL = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
const register = async (name, avatar, email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  });
  return checkResponse(res);
};

const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(res);
};
const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export { register, login, checkToken };
