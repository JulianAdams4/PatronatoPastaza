import React, { Component } from 'react';
import { Col, ControlLabel, Form, FormGroup, FormControl, Checkbox } from 'react-bootstrap';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';
import Autosuggest from 'react-autosuggest';
import DatePicker from 'react-datepicker';
import 'moment/locale/es';
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';
import 'react-datepicker/dist/react-datepicker.min.css';
import moment from 'moment';

const estadosCiviles = [
  { value: 'SOLTERO' },
  { value: 'CASADO' },
  { value: 'VIUDO' }
];

class DatosGenerales extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      nombres: props.nombres,
      apellidos: props.apellidos,
      identificacion: props.identificacion,
      noTieneIdentificacion: false,
      lugarNacimiento: props.lugarNacimiento,
      fechaNacimiento: props.fechaNacimiento,
      estadoCivil: props.estadoCivil,
      estadoCivilTouched: false,
      nacionalidad: props.nacionalidad,
      grupoCultural: props.grupoCultural,
      sexo: props.sexo,
      telefono: props.telefono,


      nombresError:  null,
      apellidosError:  null,
      identificacionError:  null,
      lugarNacimientoError:  null,
      fechaNacimientoError:  null,
      estadoCivilError:  null,
      nacionalidadError:  null,
      grupoCulturalError:  null,
      sexoError:  null,
      telefonoError:  null
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
      grupoCultural: Joi.string()
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
          validationState={this.state.nombresError}
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
            {this.state.nombresError === 'error' 
              ? this.props.getValidationMessages('nombres').map(this.renderHelpText)
              : null
            }
          </Col>
        </FormGroup>
        

        <FormGroup
          controlId="ingresoPacienteApellidos"
          validationState={this.state.apellidosError}
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
            {this.state.apellidosError === 'error' 
              ? this.props.getValidationMessages('apellidos').map(this.renderHelpText)
              : null
            }
          </Col>
        </FormGroup>
        

        <FormGroup
          controlId="ingresoPacienteIdentificacion"
          validationState={this.state.identificacionError}
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
            {this.state.identificacionError === 'error' 
              ? this.props.getValidationMessages('identificacion').map(this.renderHelpText)
              : null
            }
          </Col>
          <Col sm={3}>
            <Checkbox 
              inline 
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
          validationState={this.state.lugarNacimientoError}
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
            {this.state.lugarNacimientoError === 'error' 
              ? this.props.getValidationMessages('lugarNacimiento').map(this.renderHelpText)
              : null
            }
          </Col>
        </FormGroup>


        <Col md={12} sm={12}>
        <Col md={6} sm={12}>
          <FormGroup
            controlId="ingresoPacienteFechaNacimiento"
            validationState={this.state.fechaNacimientoError}
          >
            <Col componentClass={ControlLabel} sm={5}>
              Fecha de nacimiento:
            </Col>
            <Col sm={7} style={{ paddingLeft: '9%' }} >
            <DatePicker
              locale="es"
              value={this.state.fechaNacimiento}
              selected={this.state.startDate}
              onChange={this.onChangleFechaNacimiento}
              showYearDropdown
              showMonthDropdown
              showDayDropdown
              scrollableYearDropdown
              dateFormatCalendar="MMMM"
              placeholderText="Ingrese una fecha"
              maxDate={moment()}
              dropdownMode="select"
            />
             {this.state.fechaNacimientoError === 'error'
                ? this.props.getValidationMessages('fechaNacimiento').map(this.renderHelpText)
                : null
              }
            </Col>
          </FormGroup>
        </Col>


        <Col md={6} sm={12}>
          <FormGroup 
            controlId="ingresoPacienteEstadoCivil"
            validationState={this.state.estadoCivilError}
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
            {this.state.estadoCivilError === 'error'
              ? this.props.getValidationMessages('estadoCivil').map(this.renderHelpText)
              : null
            }
            </Col>
          </FormGroup>
        </Col>
        </Col >
        
        <Col md={12} sm={12}>
        <Col md={6} sm={12}>
          <FormGroup
            controlId="ingresoPacienteNacionalidad"
            validationState={this.state.nacionalidadError}
          >
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
            {this.state.nacionalidadError === 'error'
              ? this.props.getValidationMessages('nacionalidad').map(this.renderHelpText)
              : null
            }
            </Col>
          </FormGroup>
        </Col>


        <Col md={6} sm={12}>
          <FormGroup 
            controlId="ingresoPacienteGrupoEtnico"
            validationState={this.state.grupoCulturalError}
          >
            <Col componentClass={ControlLabel} sm={3}>
              Grupo cultural:
            </Col>
            <Col sm={7} style={{ marginLeft: '2%' }} >
              <FormControl
                type="text"
                name="grupoCultural"
                value={this.state.grupoCultural}
                placeholder="Ingrese grupo étnico"
                onChange={this.handleChange}
                required
              />
              {this.state.grupoCulturalError === 'error'
                ? this.props.getValidationMessages('grupoCultural').map(this.renderHelpText)
                : null
              }
            </Col>
          </FormGroup>
        </Col>
        </Col>

        <Col sm={12}>
        <Col sm={6}>
          <FormGroup
            controlId="ingresoPacienteSexo"
            validationState={this.state.sexoError}
          >
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
              {this.state.sexoError === 'error'
                ? this.props.getValidationMessages('sexo').map(this.renderHelpText)
                : null
              }
            </Col>
          </FormGroup>
        </Col>


        <Col sm={6}>
          <FormGroup
            controlId="ingresoPacienteTelefono"
            validationState={this.state.telefonoError}
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
             {this.state.telefonoError === 'error'
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
      estadoCivilError: newValue.length > 0 ? 'success': 'error',
      estadoCivilTouched: true
    });
  };

  handleChange = (e) => {
    const inputName = e.target.name;
    let inputValue = e.target.value;
    let inputError = inputName === 'identificacion' 
      ? inputValue.length === 10 ? 'success' : 'error'
      : inputValue.length > 0 ? 'success' : 'error';

    this.setState({
      [inputName]: inputValue,
      [`${inputName}Error`]: inputError
    });
  }

  onChangleFechaNacimiento = params => {
    const date = params.format('DD-MM-YYYY');
    this.setState({
      fechaNacimiento: date,
      fechaNacimientoError: 'success'
    });
  }

  handleClickNoTieneIdentificacion = () => {
    this.setState(prevState => ({
      identificacion: '',
      identificacionError: 'success',
      noTieneIdentificacion: !prevState.noTieneIdentificacion
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
          reject();
          return;
        }
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
      grupoCultural: this.state.grupoCultural,
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