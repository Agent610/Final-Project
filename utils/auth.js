import { baseUrl } from "./api";
import { handleServerResponse } from "./api";

const TOKEN_KEY = "jwt";

export const login = ({ email, password }) => {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};

export const register = ({ email, password, userName }) => {
  // return fetch(`${baseUrl}/register`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email, password, userName }),
  // }).then(handleServerResponse);
  return new Promise((resolve, reject) => {
    resolve({ email, password, userName });
  });
};

//Token
export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token === "token") {
      resolve({
        data: { name: "User", email: "noEmail@yahoo.com", _id: "12345" },
      });
    } else {
      reject("Invalid token");
    }
  });
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
