import React, { Component } from 'react';
import { Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi-browser';

const provincias = [
  { value: 'PASTAZA' },
  { value: 'GUAYAS' }
];

const cantones = [
  { value: 'Pastaza' },
  { value: 'Mera' },
  { value: 'Arajuno' },
  { value: 'Santa Clara' }
];

const parroquias = [
  { value: 'Puyo' },
  { value: 'Arajuno' },
  { value: 'Canelos' },
  { value: 'Curaray' },
  { value: 'Diez de Agosto' },
  { value: 'Fátima' },
  { value: 'Montalvo (Andoas)' },
  { value: 'Pomona' },
  { value: 'Río Corrientes' },
  { value: 'Río Tigre' },
  { value: 'Santa Clara' },
  { value: 'Sarayacu' },
  { value: 'Simón Bolívar' },
  { value: 'Tarqui' },
  { value: 'Teniente Hugo Ortiz' },
  { value: 'Veracruz (Indillama)' },
  { value: 'El Triunfo' },
  { value: 'Mera' },
  { value: 'Madre Tierra' },
  { value: 'Shell' },
  { value: 'Santa Clara' },
  { value: 'San José' },
  { value: 'Arajuno' },
  { value: 'Curaray' }
];

class Procedencia extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      direccion: '',
      provincia: '',
      canton: '',
      parroquia: '',
      zona: '',
      barrio: '',

      direccionError: null,
      provinciaError: null,
      cantonError: null,
      parroquiaError: null,
      zonaError: null,
      barrioError: null
    };

    this.validatorTypes = {
      direccion: Joi.string()
        .required()
        .label('Dirección'),
      provincia: Joi.string()
        .required()
        .label('Provincia'),
      canton: Joi.string()
        .required()
        .label('Cantón'),
      parroquia: Joi.string()
        .required()
        .label('Parroquia'),
      zona: Joi.string()
        .required()
        .label('Zona'),
      barrio: Joi.string()
        .required()
        .label('Barrio')
    };
  }

  render() {
    return (
      <Form horizontal autoComplete="off">
        <FormGroup
          controlId="ingresoPacienteDireccion"
          validationState={this.state.direccionError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Dirección:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="direccion"
              value={this.state.direccion}
              placeholder="Ingrese direccion"
              onChange={this.handleChange}
              required
            />
            {this.state.direccionError === 'error' ? (
              this.props.getValidationMessages('direccion').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>

        <FormGroup 
          controlId="ingresoPacienteProvincia"
          validationState={this.state.provinciaError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Provincia:
          </Col>
          <Col sm={8}>
            <Autosuggest
              suggestions={provincias}
              onSuggestionsFetchRequested={() => {}}
              onSuggestionsClearRequested={() => {}}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={{
                placeholder: 'Ingrese una provincia',
                value: this.state.provincia,
                onChange: this.onChangeProvincia
              }}
            />
            {this.state.provinciaError === 'error'
              ? this.props.getValidationMessages('provincia').map(this.renderHelpText)
              : null
            }
          </Col>
        </FormGroup>

        <FormGroup 
          controlId="ingresoPacienteCanton"
          validationState={this.state.cantonError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Cantón:
          </Col>
          <Col sm={8}>
            <Autosuggest
              suggestions={cantones}
              onSuggestionsFetchRequested={() => {}}
              onSuggestionsClearRequested={() => {}}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={{
                placeholder: 'Ingrese un cantón',
                value: this.state.canton,
                onChange: this.onChangeCanton
              }}
            />
            {this.state.cantonError === 'error'
              ? this.props.getValidationMessages('canton').map(this.renderHelpText)
              : null
            }
          </Col>
        </FormGroup>

        <FormGroup 
          controlId="ingresoPacienteParroquia"
          validationState={this.state.parroquiaError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Parroquia:
          </Col>
          <Col sm={8}>
            <Autosuggest
              suggestions={parroquias}
              onSuggestionsFetchRequested={() => {}}
              onSuggestionsClearRequested={() => {}}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={{
                placeholder: 'Ingrese una parroquia',
                value: this.state.parroquia,
                onChange: this.onChangeParroquia
              }}
            />
            {this.state.parroquiaError === 'error'
              ? this.props.getValidationMessages('parroquia').map(this.renderHelpText)
              : null
            }
          </Col>
        </FormGroup>

        <FormGroup controlId="ingresoPacienteZona">
          <Col componentClass={ControlLabel} sm={3}>
            Zona:
          </Col>
          <Col sm={8}>
            <FormControl
              name="zona"
              componentClass="select"
              defaultValue=""
              placeholder="Seleccione opción"
              required
              onChange={this.handleChange}
            >
              <option value="" disabled>(Seleccione zona)</option>
              <option value="urbana">Urbana</option>
              <option value="rural">Rural</option>
            </FormControl>
              {this.state.zonaError === 'error'
                ? this.props.getValidationMessages('zona').map(this.renderHelpText)
                : null
              }
          </Col>
        </FormGroup>

        <FormGroup
          controlId="ingresoPacienteBarrio"
          validationState={this.state.barrioError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Barrio:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="barrio"
              value={this.state.barrio}
              placeholder="Ingrese un barrio"
              onChange={this.handleChange}
              required
            />
            {this.state.barrioError === 'error' ? (
              this.props.getValidationMessages('barrio').map(this.renderHelpText)
            ): null}
          </Col>
        </FormGroup>
      </Form>
    );
  }

  handleChange = (e) => {
    const inputName = e.target.name;
    let inputValue = e.target.value;
    this.setState({
      [inputName]: inputValue,
      [`${inputName}Error`]: inputValue.length > 0
        ? 'success'
        : 'error'
    });
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : provincias.filter(prov =>
      prov.value.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = suggestion => suggestion.value;

  renderSuggestion = suggestion => (
    <div>
      {suggestion.value}
    </div>
  );
   
  onChangeProvincia = (ev, { newValue }) => {
    const value = newValue ? newValue.trim() : '';
    this.setState({
      provincia: value,
      provinciaError: value.length > 0
        ? 'success'
        : 'error'
    });
  };

  onChangeCanton = (ev, { newValue }) => {
    const value = newValue ? newValue.trim() : '';
    this.setState({
      canton: value,
      cantonError: value.length > 0
        ? 'success'
        : 'error'
    });
  };

  onChangeParroquia = (ev, { newValue }) => {
    const value = newValue ? newValue.trim() : '';
    this.setState({
      parroquia: value,
      parroquiaError: value.length > 0
        ? 'success'
        : 'error'
    });
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
          reject();
          return
        }
        resolve();
      });
    });
  }

  getValidatorData() {
    return {
      direccion: this.state.direccion,
      provincia: this.state.provincia,
      canton: this.state.canton,
      parroquia: this.state.parroquia,
      zona: this.state.zona,
      barrio: this.state.barrio
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
      required: ` es un campo requerido`,
      length: `debe tener {{limit}} caracteres`
    }
  }
};

export default validation(strategy(options))(Procedencia);