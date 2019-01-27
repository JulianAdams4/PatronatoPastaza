import React, { Component } from "react";
import Alert from 'sweetalert-react';
import { Redirect } from 'react-router-dom';
import { doLogout } from "../../services/requestsInterface";
import { deleteSessionToken } from "../../utils/storage";

class CerrarSesion extends Component {
  state = {
    showErrorMessage: false,
    redirectToLogin: false
  }

  render() {
    return this.state.redirectToLogin ? (
      <Redirect to="/" />
    ) : (
      <div className="content" >
        <p>
          Cerrando sesión...
        </p>

        <Alert
          title="Error"
          show={this.state.showErrorMessage}
          text="Error al cerrar la sesion"
          type="error"
          onConfirm={() => this.setState({ showErrorMessage: false })}
        />
      </div>
    );
  }

  async componentDidMount() {
    const { status } = await doLogout();
    if (status === 200) {
      deleteSessionToken();
      this.setState({
        redirectToLogin: true 
      }, () => {
        window.location.reload();
      });
    }
    else {
      this.setState({ showErrorMessage: true })
    }
  }
}

export default CerrarSesion;