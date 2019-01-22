import React, { Component } from "react";
import { doLogout } from "../../services/requestsInterface";
import { deleteSessionToken } from "../../utils/storage";

class CerrarSesion extends Component {
  render() {
    return (
      <p>
        Cerrando sesión...
      </p>
    );
  }

  async componentDidMount() {
    const { status } = await doLogout();
    if (status === 200) {
      deleteSessionToken();
      window.location.replace('/');
    }
    else {
      alert("Error al cerrar la sesion");
    }
  }
}

export default CerrarSesion;