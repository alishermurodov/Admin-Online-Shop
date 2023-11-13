import axios from "axios";

// import jwt_decode from "jwt-decode";
export const axiosRequest = axios.create({
  baseURL: "http://localhost:3000/api/",
});
axiosRequest.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
export function saveToken(access_token) {
  localStorage.setItem("access_token", access_token);
}

function getToken() {
  try {
    return jwt_decode(localStorage.getItem("access_token"));
  } catch (error) {}
}

// function destroyToken() {
//   localStorage.removeItem("access_token");
//   localStorage.removeItem("rememberMe");
//   window.location.pathname = "/";
// }

// export { saveToken, destroyToken, getToken };
