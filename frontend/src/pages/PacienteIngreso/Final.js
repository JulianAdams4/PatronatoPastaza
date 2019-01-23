import React, { Component } from 'react';
import Alert from 'sweetalert-react';

class Final extends Component {
constructor() {
  super();
  this.state = {
    showSuccessMessage: false
  };
}

  render() {
    return (
      <div className="content">
        <Alert
          title="¡Guardado con éxito!"
          show={this.state.showSuccessMessage}
          text="Se ha guardado la información exitosamente"
          type="success"
          onConfirm={() => this.setState({ showSuccessMessage: false })}
        />
      </div>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showSuccessMessage: true })
    }, 800);
  }

}

export default Final;