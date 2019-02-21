import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


class Nav extends Component {

  state = {
    isOpenPacientes: true,
    isOpenCitas: false
  };

  render() {
    return (
      <ul className="nav">
        <li className={this.isPathActive('/pacientes') || this.state.isOpenPacientes ? 'active' : null}>
          <a onClick={() => this.setState({ isOpenPacientes: !this.state.isOpenPacientes })}
            data-toggle="collapse">
            <i className="pe-7s-plugin"></i>
            <p>
              Pacientes
            <b className="caret"></b>
            </p>
          </a>
          
          <Collapse in={this.state.isOpenPacientes}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/pacientes/ingreso') ? 'active' : null}>
                  <Link to="/pacientes/ingreso">Ingreso</Link>
                </li>
                <li className={
                  (this.isPathActive('/pacientes/consulta') || this.isPathActive('/pacientes/editar'))
                    ? 'active' 
                    : null
                }>
                  <Link to="/pacientes/consulta">Consulta</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <div className="line"><hr /></div>

        <li className={this.isPathActive('/citas') || this.state.isOpenCitas ? 'active' : null}>
          <a onClick={() => this.setState({ isOpenCitas: !this.state.isOpenCitas })} data-toggle="collapse">
            <i className="pe-7s-note2"></i>
            <p>Cita médica <b className="caret"></b></p>
          </a>
          <Collapse in={this.state.isOpenCitas}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/citas/ingreso') ? 'active' : null}>
                  <Link to="/citas/ingreso">Ingreso</Link>
                </li>
                <li className={this.isPathActive('/citas/consulta') ? 'active' : null}>
                  <Link to="/citas/consulta">Consulta</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);