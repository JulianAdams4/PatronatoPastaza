import React, { Component } from "react";
import Alert from 'sweetalert-react';
import { doLogout } from "../../services/requestsInterface";
import { deleteSessionToken } from "../../utils/storage";

class CerrarSesion extends Component {
  state = {
    showErrorMessage: false
  }

  render() {
    return (
      <div>
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
    if (status === 201) {
      deleteSessionToken();
      window.location.replace('/');
      window.location.reload();
    }
    else {
      this.setState({ showErrorMessage: true })
    }
  }
}

export default CerrarSesion;