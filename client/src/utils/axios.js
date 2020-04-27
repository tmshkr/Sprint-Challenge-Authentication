import axios from "axios";
const auth = {};

const token = localStorage.getItem("token");
if (token) auth.token = token;

export function setToken(token) {
  auth.token = token;
  localStorage.setItem("token", token);
}
export function logout() {
  delete auth.token;
  localStorage.removeItem("token");
}
export default function () {
  return axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: auth.token,
    },
  });
}
