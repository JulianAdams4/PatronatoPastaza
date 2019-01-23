import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';

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

import { getTokenFromStorage, getCurrentProject } from '../../utils/storage';

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
      { !getTokenFromStorage() ? (
          <div className="wrapper-out">
            <Route exact path="/" component={Login} />
          </div>
        ) : ( 
         !getCurrentProject() ? (
            <Route exact path="/proyectos" component={Proyectos} />
          ) : 
          (
            <div className="wrapper">
              <div className="close-layer" onClick={hideMobileMenu}></div>
              <SideBar />
              <div className="main-panel">
                <Header />
                <Route path="/" render={() => 
                  <Redirect to="/pacientes/consulta" />
                }/>
                <Route path="/pacientes/ingreso" component={PacienteIngreso} />
                <Route path="/pacientes/consulta" component={PacienteConsulta} />
                
                <Route path="/citas/ingreso" component={CitaIngreso} />
                <Route path="/citas/consulta" component={CitaConsulta} />

                <Route path="/usuario/cerrarSesion" component={CerrarSesion} />
              </div>
            </div>
          )
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