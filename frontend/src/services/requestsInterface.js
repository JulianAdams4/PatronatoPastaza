import request from "superagent";
import { getTokenFromStorage } from "../utils.js/storage";

const timeout = {
  response: 20000,
  deadline: 40000,
};

export const sendLogin = ({ correo, contrasena }) => request
  .post("/api/login")
  .send({ correo, contrasena })
  .ok(res => res.status)
  .timeout(timeout);

export const getUserProjects = () => request
  .post("/api/usuario/proyecto")
  .set("authorization", getTokenFromStorage())
  .ok(res => res.status)
  .timeout(timeout);
