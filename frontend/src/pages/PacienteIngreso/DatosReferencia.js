import React, { Component } from 'react';
import { Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';

class Procedencia extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      nombreRes: '',
      apellidoRes: '',
      parentezco: '',
      direccionRes: '',
      telefonoRes: '',

      nombreResError: null,
      apellidoResError: null,
      parentezcoError: null,
      direccionResError: null,
      telefonoResError: null,

      allParentezcos: []
    };

    this.validatorTypes = {
      nombreRes: Joi.string()
        .required()
        .label('Nombres'),
      apellidoRes: Joi.string()
        .required()
        .label('Apellidos'),
      parentezco: Joi.string()
        .required()
        .label('Parentezco'),
      direccionRes: Joi.optional()
        .label('Dirección'),
      telefonoRes: Joi.optional()
        .label('Teléfono')
    };
  }

  render() {
    return (
      <Form horizontal autoComplete="off">
        <p>
          En caso de emergencia llamar a:
        </p>

        <FormGroup 
          controlId="ingresoPacienteNombresRes"
          validationState={this.state.nombreResError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Nombres:
          </Col>
          <Col sm={8}>
            <FormControl
              name="nombreRes"
              value={this.state.nombreRes}
              onChange={this.handleChange}
            />
            { this.state.nombreResError === 'error' ? (
              this.props.getValidationMessages('nombresRes').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>


        <FormGroup 
          controlId="ingresoPacienteApellidosRes"
          validationState={this.state.apellidoResError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Apellidos:
          </Col>
          <Col sm={8}>
            <FormControl
              name="apellidoRes"
              value={this.state.apellidoRes}
              onChange={this.handleChange}
            />
            { this.state.apellidoResError === 'error' ? (
              this.props.getValidationMessages('apellidoRes').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>
        

        <FormGroup 
          controlId="ingresoPacienteParentezcoRes"
          validationState={this.state.parentezcoError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Parentezco:
          </Col>
          <Col sm={8}>
            <FormControl
              name="parentezco"
              componentClass="select"
              defaultValue=""
              onChange={this.handleChange}
            >
              <option value="" disabled>Seleccione parentezco</option>
              { this.state.allParentezcos.length && (
                this.state.allParentezcos.map((parent, index) => (
                  <option key={index} value={`${parent}`}>
                    {parent}
                  </option>
                ))
              )}
            </FormControl>
            { this.state.parentezcoError === 'error' ? (
              this.props.getValidationMessages('parentezco').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>


        <FormGroup
          controlId="ingresoPacienteEmpresa"
          validationState={this.state.direccionResError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Dirección:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="direccionRes"
              value={this.state.direccionRes}
              placeholder="Ingrese empresa"
              onChange={this.handleChange}
            />
            {this.state.direccionResError === 'error' ? (
              this.props.getValidationMessages('direccionRes').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>


        <FormGroup
          controlId="ingresoPacienteTelefonoRes"
          validationState={this.state.telefonoResError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Empresa:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="telefonoRes"
              value={this.state.telefonoRes}
              placeholder="Ingrese teléfono"
              onChange={this.handleChange}
            />
            {this.state.telefonoResError === 'error' ? (
              this.props.getValidationMessages('telefonoRes').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>
      </Form>
    );
  }

  componentDidMount() {
    this.setState({
      allParentezcos: [
        'Madre',
        'Padre',
        'Hermano(a)',
        'Tio(a)'
      ]
    })
  }

  handleChange = (e) => {
    const inputName = e.target.name;
    let inputValue = e.target.value;
    const optionalFields = ['direccionRes', 'telefonoRes']
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
          reject();
          return
        }
        resolve();
      });
    });
  }

  getValidatorData() {
    return {
      nombreRes: this.state.nombreRes,
      apellidoRes: this.state.apellidoRes,
      parentezco: this.state.parentezco,
      direccionRes: this.state.direccionRes,
      telefonoRes: this.state.telefonoRes
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