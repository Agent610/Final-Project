// import { baseUrl } from "./api";
// import { handleServerResponse } from "./api";

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    if (email && password) {
      const token = "token";
      localStorage.setItem("jwt", token);
      resolve({ token });
    } else {
      reject("Incorrect authorization");
    }
  });
};

export const register = (email, password, userName) => {
  return new Promise((resolve, reject) => {
    if (email && password && userName) {
      resolve({ message: "User was successfully registered" });
    } else {
      reject("Error cannot register the User please try again");
    }
  });
};

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
