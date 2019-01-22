import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';

class UserInfo extends Component {

  state = {
    isShowingUserMenu: false
  };

  render() {
    let { user } = this.props;
    let { isShowingUserMenu } = this.state;
    return (
      <div className="user-wrapper">
        <div className="user">
          <div className="avatar">
            <span>{user.name.slice(0,1)}</span>
          </div>

          <div className="userinfo">
            <div className="username">
              {user.name}
            </div>
            <div className="title">Rol: Admin</div>
          </div>
          <span
            onClick={() => this.setState({ isShowingUserMenu: !this.state.isShowingUserMenu })}
            className={cx("pe-7s-angle-down collapse-arrow", {
              active: isShowingUserMenu
            })}></span>
        </div>
        <Collapse in={isShowingUserMenu}>
          <ul className="nav user-nav">
            <li className={this.isPathActive('/usuario/cambiarContrasena') ? 'active' : null}>
              <Link to="/usuario/cambiarContrasena">Cambiar contraseña</Link>
            </li>
            <li className={this.isPathActive('/usuario/cerrarSesion') ? 'active' : null}>
              <Link to="/usuario/cerrarSesion">Cerrar sesión</Link>
            </li>
          </ul>
        </Collapse>
      </div>
    );
  }

  isPathActive = (path) => {
    return this.props.location.pathname.startsWith(path);
  }
}

const mapStateToProps = state => ({
  user: state.Auth.user
});

export default connect(mapStateToProps)(  withRouter(UserInfo) );