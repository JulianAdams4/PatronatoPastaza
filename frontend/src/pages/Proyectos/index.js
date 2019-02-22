import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
import {
  getTokenFromStorage,
  deleteSessionToken,
  saveCurrentProject,
  saveUserRol
} from "../../utils/storage";
import { cargarProyectos } from "../../reducers/Proyectos";
import { doLogout } from "../../services/requestsInterface";
import "./seleccionproyecto.scss";

class SeleccionProyecto extends Component {
  constructor(props) {
    super(props);
    this.state= {
      proyectos: [],
      shouldRedirect: false,
      redirectoTo: ''
    };
  }

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to={this.state.redirectoTo}/>
      );
    }

    return (
      <div id="seleccionProyecto" className="container" style={{ height: '100%' }} >
        {this.renderButtonCerrarSesion()}

        <div className="proyectos-container">
          <div className="titulo">
            <span>Seleccionar proyecto</span>
          </div>

          <div className="lista-proyecto">
            {this.state.proyectos.length ? (
              this.state.proyectos.map((proyecto, index) => (
                <div 
                  key={`proy-${index}`} 
                  className="proyecto" 
                  onClick={
                    () => this.onSelectProject({
                      codigo: proyecto.codigoproy,
                      rol: proyecto.nombreRol,
                      idProyUni: proyecto.id_proyuni
                    })
                  }
                  style={{ 
                    backgroundImage: `url(https://res.cloudinary.com/jrx4/image/upload/v1548688770/new.${proyecto.codigoproy}.jpg)`
                  }}
                >
                  <span>Rol: &nbsp;&nbsp;{proyecto.nombreRol}</span>
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

  renderButtonCerrarSesion = () => (
    <div className="button-container">
      <button type="submit" onClick={this.cerrarSession}>
        Cerrar sesión
      </button>
    </div>
  );

  async componentDidMount() {
    const token = getTokenFromStorage();
    if (!token) {
      this.setState({
        shouldRedirect: true,
        redirectoTo: "/"
      });
    } else {
      const { error, proyectos } = await cargarProyectos();
      if (error && proyectos === null) {
        deleteSessionToken();
        return this.setState({
          shouldRedirect: true,
          redirectoTo: "/"
        });
      }
      return this.setState({ proyectos });
    }
  }

  onSelectProject = ({ codigo, rol, idProyUni }) => {
    saveCurrentProject(codigo);
    saveUserRol(rol, idProyUni);
    this.setState({
      shouldRedirect: true,
      redirectoTo: "/home"
    });
  }

  cerrarSession = async () => {
    const { status } = await doLogout();
    if (status === 200) {
      deleteSessionToken();
      this.setState({
        shouldRedirect: true,
        redirectoTo: "/"
      });
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
