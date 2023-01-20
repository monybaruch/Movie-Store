import httpService from "./httpService";
import jwtDecode from "jwt-decode";

const TOKEN_VAL = "token";

function setTokenHeader() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

export function getJWT() {
  return localStorage.getItem(TOKEN_VAL);
}

export function createUser(user) {
  return httpService.post("/users", user);
}

export async function userLogin(credentials) {
  const { data } = await httpService.post("/auth", credentials);
  localStorage.setItem(TOKEN_VAL, data.token);
  setTokenHeader();
}

export function logout() {
  localStorage.removeItem(TOKEN_VAL);
  setTokenHeader();
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

const userService = {
  createUser,
  userLogin,
  logout,
  getJWT,
  getUser,
};

export default userService;
