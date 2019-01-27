import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


class Nav extends Component {

  state = {};

  render() {
    return (
      <ul className="nav">
        <li className={this.isPathActive('/pacientes') || this.state.componentMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-plugin"></i>
            <p>
              Pacientes
            <b className="caret"></b>
            </p>
          </a>
          
          <Collapse in={this.state.componentMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/pacientes/ingreso') ? 'active' : null}>
                  <Link to="/pacientes/ingreso">Ingreso</Link>
                </li>
                <li className={this.isPathActive('/pacientes/consulta') ? 'active' : null}>
                  <Link to="/pacientes/consulta">Consulta</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <div className="line"><hr /></div>

        <li className={this.isPathActive('/citas') || this.state.formMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ formMenuOpen: !this.state.formMenuOpen })} data-toggle="collapse">
            <i className="pe-7s-note2"></i>
            <p>Cita médica <b className="caret"></b></p>
          </a>
          <Collapse in={this.state.formMenuOpen}>
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