import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserRol, getUserName } from '../../utils/storage';

class UserInfo extends Component {

  state = {
    isShowingUserMenu: false,
    userRol: '',
    userName: ' ',
    shouldRedirect: false,
    redirectTo: ''
  };

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to={this.state.redirectTo}/>
      );
    };

    let { isShowingUserMenu } = this.state;
    return (
      <div className="user-wrapper">
        <div 
          className="user" 
          onClick={() => this.setState({ isShowingUserMenu: !this.state.isShowingUserMenu })}
        >
          <div className="avatar">
            <span>{this.state.userName.slice(0,1)}</span>
          </div>

          <div className="userinfo">
            <div className="username">
              {this.state.userName}
            </div>
            { this.state.userRol && (
              <div className="title">{this.state.userRol}</div>
            )}
          </div>
          <span className={`collapse-arrow ${isShowingUserMenu ? 'active' : ''}`}>
            <b className="caret"></b>
          </span>
        </div>

        <Collapse in={isShowingUserMenu}>
          <ul className="nav user-nav">
            <li>
              <a onClick={this.onClickCambiarProyecto}>
                Cambiar de proyecto
              </a>
            </li>
            <li>
              <a onClick={this.onClickCerrarSesion}>
                Cerrar sesión
              </a>
            </li>
          </ul>
        </Collapse>
      </div>
    );
  }

  componentDidMount() {
    const userRol = getUserRol();
    if (userRol) {
      this.setState({ userRol });
    }
    const userName = getUserName();
    if (userName) {
      this.setState({ userName });
    }
  }

  isPathActive = (path) => {
    return this.props.location.pathname.startsWith(path);
  }

  onClickCambiarProyecto = () => {
    this.setState({
      shouldRedirect: true,
      redirectTo: "/proyectos"
    });
  }

  onClickCerrarSesion = () => {
    this.setState({
      shouldRedirect: true,
      redirectTo: "/usuario/cerrarSesion"
    });
  };
}

const mapStateToProps = state => ({
  user: state.Auth.user
});

export default connect(mapStateToProps)(  withRouter(UserInfo) );