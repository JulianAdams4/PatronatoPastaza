import React, { Component } from 'react';
import { Col, ControlLabel, Form, FormGroup, FormControl, Checkbox } from 'react-bootstrap';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy-browser';
import Joi from 'joi-browser';
import { ingresoPacientePasos } from './index';
import { obtenerInstrucciones } from '../../services/requestsInterface';

class Procedencia extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      instruccion: props.instruccion,
      ocupacion: props.ocupacion,
      empresa: props.empresa,
      tipoSeguro: props.tipoSeguro,
      noTieneSeguro: false,
      referido: props.referido,

      instruccionError: null,
      ocupacionError: null,
      empresaError: null,
      tipoSeguroError: null,
      referidoError: null,

      allInstruccion: []
    };

    this.validatorTypes = {
      instruccion: Joi.string()
        .required()
        .label('Instrucción'),
      ocupacion: Joi.string()
        .required()
        .label('Ocupación'),
      empresa: Joi.optional()
        .label('Empresa'),
      tipoSeguro: Joi.optional()
        .label('Tipo de seguro'),
      referido: Joi.optional()
        .label('Referido')
    };
  }

  render() {
    return (
      <Form horizontal autoComplete="off">
        <FormGroup
          controlId="ingresoPacienteInstruccion"
          validationState={this.state.instruccionError}
        >
          <Col componentClass={ControlLabel} sm={3}>
          Instrucción:
          </Col>
          <Col sm={8}>
            <FormControl
              name="instruccion"
              componentClass="select"
              value={this.state.instruccion}
              onChange={this.handleChange}
            >
              <option value="" disabled>Seleccione nivel instrucción</option>
              { this.state.allInstruccion.length && (
                this.state.allInstruccion.map((instrucc, index) => (
                  <option key={index} value={`${instrucc.nombre}`}>
                    {instrucc.nombre}
                  </option>
                ))
              )}
            </FormControl>
            { this.state.instruccionError === 'error' ? (
              this.props.getValidationMessages('instruccion').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>


        <FormGroup
          controlId="ingresoPacienteOcupacion"
          validationState={this.state.ocupacionError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Ocupación:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="ocupacion"
              value={this.state.ocupacion}
              placeholder="Ingrese ocupación"
              onChange={this.handleChange}
            />
            {this.state.ocupacionError === 'error' ? (
              this.props.getValidationMessages('ocupacion').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>


        <FormGroup
          controlId="ingresoPacienteEmpresa"
          validationState={this.state.empresaError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Empresa:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="empresa"
              value={this.state.empresa}
              placeholder="Ingrese empresa"
              onChange={this.handleChange}
            />
            {this.state.empresaError === 'error' ? (
              this.props.getValidationMessages('empresa').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>


        <FormGroup
          controlId="ingresoPacienteTipoSeguro"
          validationState={this.state.tipoSeguroError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Tipo de seguro:
          </Col>
          <Col sm={5}>
            <FormControl
              type="text"
              name="tipoSeguro"
              value={this.state.tipoSeguro}
              placeholder="Ingrese tipo de seguro"
              onChange={this.handleChange}
              disabled={this.state.noTieneSeguro}
            />
            {this.state.tipoSeguroError === 'error'
              ? this.props.getValidationMessages('tipoSeguro').map(this.renderHelpText)
              : null
            }
          </Col>
          <Col sm={3}>
            <Checkbox
              inline
              onChange={this.validarTipoSeguro}
              onClick={this.handleClickNoTieneSeguro}
              checked={this.state.noTieneSeguro}
              name="identificacion"
            >
              No tiene
            </Checkbox>
          </Col>
        </FormGroup>


        <FormGroup
          controlId="ingresoPacienteInstruccion"
          validationState={this.state.referidoError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Referido de:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="referido"
              value={this.state.referido}
              placeholder="Lugar de referencia"
              onChange={this.handleChange}
            />
            {this.state.referidoError === 'error' ? (
              this.props.getValidationMessages('referido').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>
      </Form>
    );
  }

  async componentDidMount() {
    await this.getInstrucciones();
    if (this.props.isEdit) {
      this.setState(this.props)
    }
  }

  getInstrucciones = async () => {
    const { status, body } = await obtenerInstrucciones();
    if (status === 200) {
      this.setState({ allInstruccion: body.data });
    }
  };

  handleChange = (e) => {
    const inputName = e.target.name;
    let inputValue = e.target.value;
    const optionalFields = ['referido', 'emmpresa', 'tipoSeguro']
    let fieldError = optionalFields.includes(inputName)
      ? null
      : inputValue.length > 0 ? 'success' : 'error'
    this.setState({
      [inputName]: inputValue,
      [`${inputName}Error`]: fieldError
    });
  }

  handleClickNoTieneSeguro = () => {
    this.setState(prevState => ({
      tipoSeguro: 'NO TIENE',
      noTieneSeguro: !prevState.noTieneSeguro
    }));
  };

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
          this.props.guardarData(ingresoPacientePasos.DATOS_OCUPACION, validData);
          return resolve();
        }
      });
    });
  }

  getValidatorData() {
    return {
      instruccion: this.state.instruccion,
      ocupacion: this.state.ocupacion,
      empresa: this.state.empresa,
      tipoSeguro: this.state.tipoSeguro,
      referido: this.state.referido
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
