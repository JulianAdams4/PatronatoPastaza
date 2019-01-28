import request from "superagent";
import { getTokenFromStorage } from "./../utils/storage";

const timeout = {
  response: 20000,
  deadline: 40000,
};

export const sendLogin = ({ correo, contrasena }) => request
  .post("/api/login")
  .set("authorization", getTokenFromStorage())
  .send({ correo, contrasena })
  .ok(res => res.status)
  .timeout(timeout);

export const doLogout = () => request
  .get("/api/login/out")
  .set("authorization", getTokenFromStorage())
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

export const obtenerBeneficiarios = ({ nombre, apellido, identificacion }) => request
  .post("/api/beneficiarioSM/todos")
  .set("authorization", getTokenFromStorage())
  .send({ nombre, apellido, identificacion })
  .ok(res => res.status)
  .timeout(timeout);

export const filtrarBeneficiarios = ({ nombre, apellido, identificacion }) => request
  .post("/api/beneficiarioSM/filtrar")
  .set("authorization", getTokenFromStorage())
  .send({ nombre, apellido, identificacion })
  .ok(res => res.status)
  .timeout(timeout);

export const ingresarBeneficiario = params => request
  .post("/api/beneficiarioSM/crear")
  .set("authorization", getTokenFromStorage())
  .send(params)
  .ok(res => res.status)
  .timeout(timeout);

export const obtenerNacionalidades = () => request
  .get("/api/beneficiarioSM/nacionalidad")
  .set("authorization", getTokenFromStorage())
  .ok(res => res.status)
  .timeout(timeout);

export const obtenerGruposCulturales = () => request
  .get("/api/beneficiarioSM/grupocultural")
  .set("authorization", getTokenFromStorage())
  .ok(res => res.status)
  .timeout(timeout);

export const obtenerEstadosCiviles = () => request
  .get("/api/beneficiarioSM/estadocivil")
  .set("authorization", getTokenFromStorage())
  .ok(res => res.status)
  .timeout(timeout);

export const obtenerInstrucciones = () => request
  .get("/api/beneficiarioSM/instruccion")
  .set("authorization", getTokenFromStorage())
  .ok(res => res.status)
  .timeout(timeout);

export const obtenerParentescos = () => request
  .get("/api/beneficiarioSM/parentesco")
  .set("authorization", getTokenFromStorage())
  .ok(res => res.status)
  .timeout(timeout);

export const obtenerTipoDeExoneraciones = () => request
  .get("/api/citaSM/exoneracion")
  .set("authorization", getTokenFromStorage())
  .ok(res => res.status)
  .timeout(timeout);

export const obtenerCitasPendientes = () => request
  .get("/api/citaSM/atender")
  .set("authorization", getTokenFromStorage())
  .ok(res => res.status)
  .timeout(timeout);