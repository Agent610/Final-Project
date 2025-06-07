import { baseUrl } from "./api";
import { handleServerResponse } from "./api";

const TOKEN_KEY = "jwt";

export const login = ({ email, password }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Login successful",
        user: {
          name: "User",
          email,
        },
        token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
      });
    }, 1000);
  });
};

const mockUser = [];

export const register = ({ email, password, userName }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password || !userName) {
        return reject({
          success: false,
          message: "All fields are required.",
        });
      }

      const existingUser = mockUser.find((user) => user.email === email);
      if (existingUser) {
        return reject({
          success: false,
          message: "User already exists with this email.",
        });
      }

      const newUser = {
        email,
        password,
        userName,
        token: `mock-token-${Date.now()}`,
      };
      mockUser.push(newUser);

      resolve({
        success: true,
        message: "Registration successful.",
        user: {
          email: newUser.email,
          userName: newUser.userName,
        },
        token: newUser.token,
      });
    }, 1000);
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
