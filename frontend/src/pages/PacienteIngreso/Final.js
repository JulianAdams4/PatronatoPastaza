import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Alert from 'sweetalert-react';
import { ingresarBeneficiario, actualizarBeneficiario } from '../../services/requestsInterface';

class Final extends Component {
constructor(props) {
  super(props);
  this.state = {
    showMessage: 'none',
    shouldRedirect: false,
    redirectTo: ""
  };
}

  render() {
    const {
      nombre,
      apellido,
      identificacion,
      lugarNacimiento,
      fechaNacimiento,
      estadoCivil,
      nacionalidad,
      grupoCultural,
      sexo,
      telefono,
      direccion,
      barrio,
      instruccion,
      ocupacion,
      empresa,
      tipoSeguro,
      referido,
      resNombre,
      resApellido,
      parentezco
    } = this.props.formData;
    return (
      <div className="content">
        { this.state.shouldRedirect ? (
          <Redirect to={this.state.redirectTo} />
        ) : (
          <div>
            <p>Nombres: {nombre} </p>
            <p>Apellidos: {apellido} </p>
            <p>Identificación: {identificacion} </p>
            <p>Lugar de nacimiento: {lugarNacimiento} </p>
            <p>Fecha de nacimiento: {fechaNacimiento.format("DD-MM-YYYY")} </p>
            <p>Estado civil: {estadoCivil} </p>
            <p>Nacionalidad: {nacionalidad} </p>
            <p>Grupo Cultural: {grupoCultural} </p>
            <p>Sexo: {sexo} </p>
            { telefono ? (<p>Teléfono: {telefono}</p>) : null}
            <p>Dirección: {direccion} </p>
            <p>Barrio: {barrio} </p>
            <p>Instrucción: {instruccion} </p>
            <p>Ocupación: {ocupacion} </p>
            { empresa ? (<p>Empresa: {empresa}</p>) : null}
            { tipoSeguro ? (<p>Seguro: {tipoSeguro}</p>) : null}
            { this.props.referido ? (<p>Referido: {referido}</p>) : null}
            <p>Responsable: {resNombre} {resApellido}</p>
            <p>Parentezco: {parentezco} </p>

            {this.defineAlert(this.state.showMessage)}
          </div>
        )}
      </div>
    )
  }

  defineAlert = (showMessage) => {
    switch (showMessage) {
      case 'success': {
        return (
          <Alert
            title="¡Guardado con éxito!"
            show={this.state.showMessage === 'success'}
            text="Se ha guardado la información exitosamente"
            type="success"
            onConfirm={() => {
              this.onCloseAlert();
              this.onCloseSuccess();
            }}
          />
        );
      }
      case 'error': {
        return (     
          <Alert
            title="¡Ups! Ocurrió un error"
            show={this.state.showMessage === 'error'}
            text={`
              No se ha podido guardar la información del paciente.\n
              Verifica la información ingresada y vuelve a intentarlo.\n
              Si el problema persiste, contacte al administrador
            `}
            type="error"
            onConfirm={() => {
              this.onCloseAlert();
              this.onCloseError();
            }}
          />
        );
      }
      default: {
        return (     
          <Alert
            title=""
            show={false}
            text={``}
            type="error"
          />
        );
      }
    }
  }

  async componentDidMount() {
    window.addEventListener('popstate', this.onCloseAlert);
    const formData = {
      ...this.props.formData,
      fechaNacimiento: this.props.formData.fechaNacimiento.format('DD-MM-YYYY')
    };
    delete formData.provincia;
    delete formData.canton;
    delete formData.parroquia;
    if (this.props.isEdit) {
      let showMessage = '';
      const { status } = await actualizarBeneficiario({
        idBeneficiario: this.props.editId,
        data: formData
      });
      if (status === 200) {
        showMessage = 'success';
      } else {
        showMessage = 'error';
      }
      this.setState({ showMessage });
    } else {
      let showMessage = '';
      const { status } = await ingresarBeneficiario(formData);
      if (status === 200) {
        showMessage = 'success';
      } else {
        showMessage = 'error';
      }
      this.setState({ showMessage });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onCloseAlert);
  }

  onCloseAlert = () => {
    this.setState({ showMessage: 'none' });
  }

  onCloseError = () => {
    this.setState({
      showMessage: 'none'
    }, () => {
      setTimeout(() => {
        this.props.jumpToStep(0);
      }, 500);
    });
  };

  onCloseSuccess = () => {
    this.setState({
      showMessage: 'none',
      shouldRedirect: true,
      redirectTo: "/pacientes/consulta"
    })
  };
}

export default Final;