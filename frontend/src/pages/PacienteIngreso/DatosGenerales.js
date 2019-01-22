import React, { Component } from 'react';
import { Col, ControlLabel, Form, FormGroup, FormControl, Checkbox } from 'react-bootstrap';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi-browser';
import Autosuggest from 'react-autosuggest';
import { SingleDatePicker } from 'react-dates';
// import moment from 'moment';

const tamanoMinimo = {
  nombres: 3,
  apellidos: 3,
  identificacion: 9,
  lugarNacimiento: 6,
  telefono: 6
}

const estadosCiviles = [
  { value: 'SOLTERO' },
  { value: 'CASADO' },
  { value: 'VIUDO' }
];

class DatosGenerales extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      nombres: '',
      apellidos: '',
      identificacion: '',
      noTieneIdentificacion: false,
      lugarNacimiento: '',
      fechaNacimiento: '',
      fechaNacimientoMoment: null,
      estadoCivil: '',
      estadoCivilTouched: false,
      nacionalidad: '',
      grupoEtnico: '',
      sexo: '',
      telefono: ''
    };

    this.validatorTypes = {
      nombres: Joi.string()
        .required()
        .label('Nombres'),
      apellidos: Joi.string()
        .required()
        .label('Apellidos'),
      identificacion: Joi.string()
        .required()
        .length(10)
        .label('La identificación'),
      lugarNacimiento: Joi.string()
        .required()
        .label('El lugar de nacimiento'),
      fechaNacimiento: Joi.date()
        .required()
        .label('La fecha de nacimiento'),
      estadoCivil: Joi.string()
        .required()
        .label('El estado civil'),
      nacionalidad: Joi.string()
        .required()
        .label('Nacionalidad'),
      grupoEtnico: Joi.string()
        .required()
        .label('Grupo Étnico'),
      sexo: Joi.string()
        .required()
        .label('Sexo'),
      telefono: Joi.string()
        .optional(),
    };
  }

  render() {
    return (
      <Form horizontal autoComplete="off">
        <FormGroup
          controlId="ingresoPacienteNombres"
          validationState={this.validarNombres()}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Nombres:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="nombres"
              value={this.state.nombres}
              placeholder="Ingrese nombres"
              onChange={this.handleChange}
              required
            />
            {this.validarNombres() === 'error' 
              ? this.props.getValidationMessages('nombres').map(this.renderHelpText)
              : null
            }
          </Col>
        </FormGroup>

        <FormGroup
          controlId="ingresoPacienteApellidos"
          validationState={this.validarApellidos()}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Apellidos:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="apellidos"
              value={this.state.apellidos}
              placeholder="Ingrese los apellidos"
              onChange={this.handleChange}
              required
            />
            {this.validarApellidos() === 'error' 
              ? this.props.getValidationMessages('apellidos').map(this.renderHelpText)
              : null
            }
          </Col>
        </FormGroup>

        <FormGroup
          controlId="ingresoPacienteIdentificacion"
          validationState={this.validarIdentificacion()}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Identificación:
          </Col>
          <Col sm={5}>
            <FormControl
              type="text"
              name="identificacion"
              value={this.state.identificacion}
              placeholder="Ingrese identificación"
              onChange={this.handleChange}
              disabled={this.state.noTieneIdentificacion}
            />
            {this.validarIdentificacion() === 'error' 
              ? this.props.getValidationMessages('identificacion').map(this.renderHelpText)
              : null
            }
          </Col>
          <Col sm={3}>
            <Checkbox 
              inline 
              onChange={this.validarIdentificacion}
              onClick={this.handleClickNoTieneIdentificacion}
              checked={this.state.noTieneIdentificacion}
              name="identificacion"
            >
              No tiene
            </Checkbox>
          </Col>
        </FormGroup>

        <FormGroup
          controlId="ingresoPacienteLugarNacimiento"
          validationState={this.validarLugarNacimiento()}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Lugar de nacimiento:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="lugarNacimiento"
              value={this.state.lugarNacimiento}
              placeholder="Ingrese lugar de nacimiento"
              onChange={this.handleChange}
              required
            />
            {this.validarLugarNacimiento() === 'error' 
              ? this.props.getValidationMessages('lugarNacimiento').map(this.renderHelpText)
              : null
            }
          </Col>
        </FormGroup>

        <Col md={12} sm={12}>
        <Col md={6} sm={12}>
          <FormGroup
            controlId="ingresoPacienteFechaNacimiento"
            validationState={this.validarFechaNacimiento()}
          >
            <Col componentClass={ControlLabel} sm={5}>
              Fecha de nacimiento:
            </Col>
            <Col sm={7} style={{ paddingLeft: '9%' }} >
              <SingleDatePicker
                required={true}
                date={this.state.fechaNacimientoMoment}
                onDateChange={date => {
                  this.setState({
                    fechaNacimientoMoment: date,
                    fechaNacimiento: date.toDate()
                  });
                }}
                focused={this.state.fechaNacimientoFocused}
                onFocusChange={
                  ({ focused }) => this.setState({ fechaNacimientoFocused: focused })
                }
                numberOfMonths={1}
                placeholder="Ingrese fecha"
              />
             {!this.props.isValid('fechaNacimiento')
                ? this.props.getValidationMessages('fechaNacimiento').map(this.renderHelpText)
                : null
              }

            </Col>
          </FormGroup>
        </Col>


        <Col md={6} sm={12}>
          <FormGroup 
            controlId="ingresoPacienteEstadoCivil"
            validationState={this.validarEstadoCivil()}
          >
            <Col componentClass={ControlLabel} sm={3}>
              Estado civil:
            </Col>
            <Col sm={7}>
            <Autosuggest
              suggestions={estadosCiviles}
              onSuggestionsFetchRequested={() => {}}
              onSuggestionsClearRequested={() => {}}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={{
                placeholder: 'Ingresa un estado civil',
                value: this.state.estadoCivil,
                onChange: this.onChangeEstadoCivil
              }}
            />
            {!this.props.isValid('estadoCivil')
              ? this.props.getValidationMessages('estadoCivil').map(this.renderHelpText)
              : null
            }
            </Col>
          </FormGroup>
        </Col>
        </Col >
        
        <Col md={12} sm={12}>
        <Col md={6} sm={12}>
          <FormGroup controlId="ingresoPacienteNacionalidad">
            <Col componentClass={ControlLabel} sm={5}>
              Nacionalidad:
            </Col>
            <Col sm={7} style={{ paddingLeft: '9%' }} >
              <FormControl
                type="text"
                name="nacionalidad"
                value={this.state.nacionalidad}
                placeholder="Ingrese nacionalidad"
                onChange={this.handleChange}
                required
              />
            {!this.props.isValid('nacionalidad')
              ? this.props.getValidationMessages('nacionalidad').map(this.renderHelpText)
              : null
            }
            </Col>
          </FormGroup>
        </Col>


        <Col md={6} sm={12}>
          <FormGroup controlId="ingresoPacienteGrupoEtnico">
            <Col componentClass={ControlLabel} sm={3}>
              Grupo étnico:
            </Col>
            <Col sm={7} style={{ marginLeft: '2%' }} >
              <FormControl
                type="text"
                name="grupoEtnico"
                value={this.state.grupoEtnico}
                placeholder="Ingrese grupo étnico"
                onChange={this.handleChange}
                required
              />
              {!this.props.isValid('grupoEtnico')
                ? this.props.getValidationMessages('grupoEtnico').map(this.renderHelpText)
                : null
              }
            </Col>
          </FormGroup>
        </Col>
        </Col>

        <Col sm={12}>
        <Col sm={6}>
          <FormGroup controlId="ingresoPacienteSexo">
            <Col componentClass={ControlLabel} sm={5}>
              Sexo:
            </Col>
            <Col sm={7} style={{ paddingLeft: '9%' }} >
              <FormControl
                name="sexo"
                componentClass="select"
                defaultValue=""
                placeholder="none"
                required
                onChange={this.handleChange}
              >
                <option value="" disabled>(Seleccione sexo)</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </FormControl>
              {!this.props.isValid('sexo')
                ? this.props.getValidationMessages('sexo').map(this.renderHelpText)
                : null
              }
            </Col>
          </FormGroup>
        </Col>


        <Col sm={6}>
          <FormGroup
            controlId="ingresoPacienteTelefono"
            validationState={this.validarTelefono()}
          >
            <Col componentClass={ControlLabel} sm={3}>
              Teléfono:
            </Col>
            <Col sm={7} style={{ marginLeft: '2%' }} >
              <FormControl
                type="text"
                name="telefono"
                value={this.state.telefono}
                placeholder="Ingrese teléfono"
                onChange={this.handleChange}
              />
             {!this.props.isValid('telefono')
                ? this.props.getValidationMessages('telefono').map(this.renderHelpText)
                : null
              }
            </Col>
          </FormGroup>
        </Col>
        </Col>

      </Form>
    );
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : estadosCiviles.filter(estCiv =>
      estCiv.value.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = suggestion => suggestion.value;

  renderSuggestion = suggestion => (
    <div>
      {suggestion.value}
    </div>
  );
   
  onChangeEstadoCivil = (ev, { newValue }) => {
    this.setState({
      estadoCivil: newValue,
      estadoCivilTouched: true
    });
  };
  
  // onSuggestionsFetchRequested = ({ value }) => {
  //   this.setState({
  //     suggestions: this.getSuggestions(value)
  //   });
  // };

  // onSuggestionsClearRequested = () => {
  //   this.setState({
  //     suggestions: []
  //   });
  // };

  validarNombres = () => {
    const length = this.state.nombres.length;
    if (length > tamanoMinimo.nombres) return 'success';
    else if (length > 0 || !this.props.isValid('nombres')) return 'error';
    return null;
  };

  validarApellidos = () => {
    const length = this.state.apellidos.length;
    if (length > tamanoMinimo.apellidos) return 'success';
    else if (length > 0 || !this.props.isValid('apellidos')) return 'error';
    return null;
  };

  validarIdentificacion = () => {
    if (this.state.noTieneIdentificacion === true)
      return 'success';
    const length = this.state.identificacion.length;
    if (length > tamanoMinimo.identificacion) return 'success';
    else if (length > 0 || !this.props.isValid('nombres')) return 'error';
    return null;
  }

  validarLugarNacimiento = () => {
    const length = this.state.lugarNacimiento.length;
    if (length > tamanoMinimo.lugarNacimiento) return 'success';
    else if (length > 0|| !this.props.isValid('lugarNacimiento')) return 'error';
    return null;
  };

  validarFechaNacimiento = () => {
    const length = this.state.fechaNacimiento.length;
    if (!this.state.fechaNacimientoMoment) {
      if (this.state.fechaNacimiento === '') return null;
      return 'error';
    }
    if (length > 0 && this.state.fechaNacimientoMoment) return 'success'
    else return 'error';
  };

  validarTelefono = () => {
    const length = this.state.telefono.length;
    if (length > tamanoMinimo.telefono) return 'success';
    else if (length > 0|| !this.props.isValid('telefono')) return 'error';
    return null;
  }

  validarEstadoCivil = () => {
    if (this.state.estadoCivilTouched) return null;
    if (!this.props.isValid('estadoCivil')) return 'error';
    return 'success';
  };

  handleChange = (e) => {
    const inputName = e.target.name;
    let inputValue = e.target.value;
    this.setState({
      [inputName]: inputValue
    });
  }

  handleClickNoTieneIdentificacion = () => {
    this.setState(prevState => ({
      identificacion: '',
      noTieneIdentificacion: !prevState.noTieneIdentificacion
    }));
  };

  isValidated = () => {
    return new Promise((resolve, reject) => {
      this.props.validate((error) => {
        console.log("IS VALIDATED: ", error);
        if (error) return reject();
        resolve();
      });
    });
  }

  getValidatorData() {
    return {
      nombres: this.state.nombres,
      apellidos: this.state.apellidos,
      identificacion: this.state.noTieneIdentificacion === true 
        ? '0000000000' 
        : this.state.identificacion,
      lugarNacimiento: this.state.lugarNacimiento,
      fechaNacimiento: this.state.fechaNacimiento,
      estadoCivil: this.state.estadoCivil,
      nacionalidad: this.state.nacionalidad,
      grupoEtnico: this.state.grupoEtnico,
      sexo: this.state.sexo,
      telefono: this.state.telefono,
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
    },
    date: {
      base: 'debe ser una fecha válida'
    }
  }
};

export default validation(strategy(options))(DatosGenerales);