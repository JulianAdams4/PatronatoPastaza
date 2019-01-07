import axios from "axios";

export const sendLogin = ({ correo, contrasena }) => axios.post("/login", { correo, contrasena });
