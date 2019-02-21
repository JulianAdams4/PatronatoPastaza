import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Switch, withRouter } from 'react-router-dom';

import { setMobileNavVisibility } from '../../reducers/Layout';
import Header from './Header';
import SideBar from '../../components/SideBar';

//================
//    Pages
//================
import Login from '../Login';
import Proyectos from '../Proyectos';
import CerrarSesion from '../CerrarSesion';

import PacienteIngreso from '../PacienteIngreso';
import PacienteConsulta from '../PacienteConsulta';

import CitaIngreso from '../CitaIngreso';
import CitaConsulta from '../CitaConsulta';

const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history
}) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });
  return (
    <div className={cx({
      'nav-open': mobileNavVisibility === true
    })}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/proyectos" component={Proyectos} />
      
        <div className="wrapper">
          <div className="close-layer" onClick={hideMobileMenu}></div>
          <SideBar />
          <div className="main-panel">
            <Header />

            <Route path="/pacientes/ingreso" component={PacienteIngreso} />
            <Route path="/pacientes/consulta" component={PacienteConsulta} />
            <Route path="/pacientes/editar/:historia" component={PacienteIngreso} />
            <Route path="/citas/ingreso" component={CitaIngreso} />
            <Route path="/citas/consulta" component={CitaConsulta} />
            <Route exact path="/usuario/cerrarSesion" component={CerrarSesion} />

            {/* Default */}
            <Redirect from='/home' to="/pacientes/consulta" />
          </div>
        </div>
      </Switch>
    )}
    </div>
  )
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));