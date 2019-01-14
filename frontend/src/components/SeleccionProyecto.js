import React, { Component } from "react";
import PropTypes from "prop-types";
import { getTokenFromStorage } from "../utils.js/storage";
import "./seleccionproyecto.scss";

class SeleccionProyecto extends Component {
  render() {
    return (
      <div id="seleccionProyecto" className="container">
        <div className="button-container">
          <button type="submit">
            Cerrar sesión
          </button>
        </div>

        <div className="proyectos-container">
          <div className="titulo">
            <span>Seleccionar proyecto</span>
          </div>

          <div className="lista-proyecto">
            {this.props.proyectos.length ? (
              this.props.proyectos.map((proyecto, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="proyecto">
                  {proyecto.name}
                </div>
              ))
            ) : (
              <p>No tiene proyectos disponibles. Contacte al administrador</p>
            ) }
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const token = getTokenFromStorage();
    if (!token) {
      // window.location.replace("/");
    } else {
      this.props.cargarProyectosUsuario();
    }
  }
}

SeleccionProyecto.propTypes = {
  cargarProyectosUsuario: PropTypes.func,
  proyectos: PropTypes.array,
};

export default SeleccionProyecto;
