import request from "superagent";

const timeout = {
  response: 20000,
  deadline: 40000,
};

export const sendLogin = ({ correo, contrasena }) => request
  .post("/api/login")
  .send({ correo, contrasena })
  .ok(res => res.status)
  .timeout(timeout);
