import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
import "./seleccionproyecto.scss";
import { getTokenFromStorage, deleteSessionToken, saveCurrentProject } from "../../utils/storage";
import { cargarProyectos } from "../../reducers/Proyectos";
import { doLogout } from "../../services/requestsInterface";

class SeleccionProyecto extends Component {
  constructor(props) {
    super(props);
    this.state= {
      proyectos: [],
      redirectoToApp: false,
      redirectoToLogin: false
    };
  }

  render() {
    return this.state.redirectoToApp ? (
        <Redirect to="/pacientes/consulta" />
      ) 
      : this.state.redirectoToLogin ? (
        <Redirect to="/" />
      ) 
      : (
      <div id="seleccionProyecto" className="container">
        <div className="button-container">
          <button type="submit" onClick={this.cerrarSession}>
            Cerrar sesión
          </button>
        </div>

        <div className="proyectos-container">
          <div className="titulo">
            <span>Seleccionar proyecto</span>
          </div>

          <div className="lista-proyecto">
            {this.state.proyectos.length ? (
              this.state.proyectos.map((proyecto, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="proyecto" onClick={() => this.onSelectProject(proyecto.code)}>
                  {proyecto.nombre}
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

  async componentDidMount() {
    const token = getTokenFromStorage();
    if (!token) {
      this.setState({
        redirectoToApp: false,
        redirectoToLogin: true
      });
    } else {
      const { error, proyectos } = await cargarProyectos();
      if (error && proyectos === null) {
        deleteSessionToken();
        this.setState({
          redirectoToApp: false,
          redirectoToLogin: true
        });
        return;
      }
      console.log(proyectos)
      this.setState({ proyectos });
    }
  }

  onSelectProject = projectCode => {
    saveCurrentProject(projectCode);
    this.setState({
      redirectoToApp: true,
      redirectoToLogin: false
    });
  }

  cerrarSession = async () => {
    const { status } = await doLogout();
    if (status === 200) {
      deleteSessionToken();
      window.location.replace("/");
    } else {
      alert("Fallo al cerrar la sesión. Intente de nuevo");
    }
  };
}

SeleccionProyecto.propTypes = {
  cargarProyectosUsuario: PropTypes.func,
  cerrarSesion: PropTypes.func,
  proyectos: PropTypes.array,
};

export default SeleccionProyecto;
