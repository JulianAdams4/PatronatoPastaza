import React, { Component } from 'react';
import { Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy-browser';
import Joi from 'joi-browser';
import { ingresoPacientePasos } from './index';
import { obtenerParentescos } from '../../services/requestsInterface';

class Procedencia extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      resNombre: props.resNombre,
      resApellido: props.resApellido,
      resParentezco: props.resParentezco,
      resDireccion: props.resDireccion,
      resTelefono: props.resTelefono,

      resNombreError: null,
      resApellidoError: null,
      resParentezcoError: null,
      resDireccionError: null,
      resTelefonoError: null,

      allParentezcos: []
    };

    this.validatorTypes = {
      resNombre: Joi.string()
        .required()
        .label('Nombres'),
      resApellido: Joi.string()
        .required()
        .label('Apellidos'),
      resParentezco: Joi.string()
        .required()
        .label('Parentezco'),
      resDireccion: Joi.optional()
        .label('Dirección'),
      resTelefono: Joi.optional()
        .label('Teléfono')
    };
  }

  render() {
    return (
      <Form horizontal autoComplete="off">
        <p style={{ marginTop: '20px' }} >
          En caso de emergencia llamar a:
        </p>

        <FormGroup
          controlId="ingresoPacienteNombresRes"
          validationState={this.state.resNombreError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Nombres:
          </Col>
          <Col sm={8}>
            <FormControl
              name="resNombre"
              value={this.state.resNombre}
              onChange={this.handleChange}
            />
            { this.state.resNombreError === 'error' ? (
              this.props.getValidationMessages('resNombre').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>


        <FormGroup
          controlId="ingresoPacienteApellidosRes"
          validationState={this.state.resApellidoError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Apellidos:
          </Col>
          <Col sm={8}>
            <FormControl
              name="resApellido"
              value={this.state.resApellido}
              onChange={this.handleChange}
            />
            { this.state.resApellidoError === 'error' ? (
              this.props.getValidationMessages('resApellido').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>


        <FormGroup
          controlId="ingresoPacienteParentezcoRes"
          validationState={this.state.resParentezcoError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Parentezco:
          </Col>
          <Col sm={8}>
            <FormControl
              name="resParentezco"
              componentClass="select"
              defaultValue=""
              onChange={this.handleChange}
            >
              <option value="" disabled>Seleccione parentezco</option>
              { this.state.allParentezcos.length && (
                this.state.allParentezcos.map((parent, index) => (
                  <option key={index} value={`${parent.nombre}`}>
                    {parent.nombre}
                  </option>
                ))
              )}
            </FormControl>
            { this.state.resParentezcoError === 'error' ? (
              this.props.getValidationMessages('resParentezco').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>


        <FormGroup
          controlId="ingresoPacienteEmpresa"
          validationState={this.state.resDireccionError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Dirección:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="resDireccion"
              value={this.state.resDireccion}
              placeholder="Ingrese empresa"
              onChange={this.handleChange}
            />
            {this.state.resDireccionError === 'error' ? (
              this.props.getValidationMessages('resDireccion').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>


        <FormGroup
          controlId="ingresoPacienteTelefonoRes"
          validationState={this.state.resTelefonoError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Teléfono:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="resTelefono"
              value={this.state.resTelefono}
              placeholder="Ingrese teléfono"
              onChange={this.handleChange}
            />
            {this.state.resTelefonoError === 'error' ? (
              this.props.getValidationMessages('resTelefono').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>
      </Form>
    );
  }

  async componentDidMount() {
    await this.getParentescos();
  }

  getParentescos = async () => {
    const { status, body } = await obtenerParentescos();
    if (status === 200) {
      this.setState({ allParentezcos: body.data });
    }
  };

  handleChange = (e) => {
    const inputName = e.target.name;
    let inputValue = e.target.value;
    const optionalFields = ['resDireccion', 'resTelefono']
    let fieldError = optionalFields.includes(inputName)
      ? null
      : inputValue.length > 0 ? 'success' : 'error'
    this.setState({
      [inputName]: inputValue,
      [`${inputName}Error`]: fieldError
    });
  }

  isValidated = () => {
    return new Promise((resolve, reject) => {
      this.props.validate((error) => {
        if (error) {
          const errorFields = Object.keys(error);
          const newState = errorFields.reduce((result, item) => {
            return {
              ...result,
              [`${item}Error`]: 'error'
            }
          }, {});
          this.setState(newState);
          return reject();
        } else {
          const validData = this.getValidatorData();
          this.props.guardarData(ingresoPacientePasos.DATOS_REFERENCIA, validData);
          return resolve();
        }
      });
    });
  }

  getValidatorData() {
    return {
      resNombre: this.state.resNombre,
      resApellido: this.state.resApellido,
      resParentezco: this.state.resParentezco,
      resDireccion: this.state.resDireccion,
      resTelefono: this.state.resTelefono
    };
  }

  renderHelpText = (message, id) => (
    <span key={id} className="help-block">{message}</span>
  );
};

const options = {
  language: {
    key: '{{label}} ',
    any: {
      empty: 'es requerido',
      required: 'es requerido'
    },
    string: {
      required: `es un campo requerido*`,
      length: `debe tener {{limit}} caracteres`
    }
  }
};

export default validation(strategy(options))(Procedencia);
