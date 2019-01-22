import request from "superagent";
import { getTokenFromStorage } from "./../utils/storage";

const timeout = {
  response: 20000,
  deadline: 40000,
};

export const sendLogin = ({ correo, contrasena }) => request
  .post("/api/login")
  .send({ correo, contrasena })
  .ok(res => res.status)
  .timeout(timeout);

export const doLogout = () => request
  .get("/api/login/out")
  .ok(res => res.status)
  .timeout(timeout);

export const getUserProjects = () => request
  .get("/api/usuario/proyecto")
  .set("authorization", getTokenFromStorage())
  .ok(res => res.status)
  .timeout(timeout);

export const getProvincias = () => request
  .get('/api/beneficiarioSM/provincia')
  .set("authorization", getTokenFromStorage())
  .ok(res => res.status)
  .timeout(timeout);

export const getCantonByProvinceId = provinceId => request
  .get(`/api/beneficiarioSM/canton/${provinceId}`)
  .set("authorization", getTokenFromStorage())
  .ok(res => res.status)
  .timeout(timeout);

export const getParroquiaByCantonId = cantonId => request
  .get(`/api/beneficiarioSM/parroquia/${cantonId}`)
  .set("authorization", getTokenFromStorage())
  .ok(res => res.status)
  .timeout(timeout);