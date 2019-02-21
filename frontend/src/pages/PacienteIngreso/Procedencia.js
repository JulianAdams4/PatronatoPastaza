import React, { Component } from 'react';
import { Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy-browser';
import Joi from 'joi-browser';
import {
  getProvincias,
  getCantonByProvinceId,
  getParroquiaByCantonId
} from '../../services/requestsInterface';
import { ingresoPacientePasos } from './index';

class Procedencia extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      direccion: props.direccion,
      provincia: props.provincia,
      canton: props.canton,
      parroquia: props.parroquia,
      id_parroquia: props.id_parroquia,
      zona: props.zona,
      barrio: props.barrio,

      direccionError: null,
      provinciaError: null,
      cantonError: null,
      parroquiaError: null,
      zonaError: null,
      barrioError: null,

      allProvincias: [],
      allParroquias: [],
      allCanton: []
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

        <FormGroup
          controlId="ingresoPacienteProvincia"
          validationState={this.state.provinciaError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Provincia:
          </Col>
          <Col sm={8}>
            <FormControl
              name="provincia"
              componentClass="select"
              value={this.state.provincia}
              onChange={this.onChangeProvincia}
              required
            >
              <option value="" disabled>Seleccione provincia</option>
              { this.state.allProvincias.length && (
                this.state.allProvincias.map((provincia, index) => (
                  <option key={index} value={`${provincia.nombre}`}>
                    {provincia.nombre}
                  </option>
                ))
              )}
            </FormControl>
            { this.state.provinciaError === 'error'
              ? this.props.getValidationMessages('provincia').map(this.renderHelpText)
              : null }
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
            <FormControl
              name="canton"
              componentClass="select"
              value={this.state.canton}
              onChange={this.onChangeCanton}
              required
            >
              <option value="" disabled>Seleccione cantón</option>
              { this.state.allCanton.length && (
                this.state.allCanton.map((canton, index) => (
                  <option key={index} value={`${canton.nombre}`}>
                    {canton.nombre}
                  </option>
                ))
              )}
            </FormControl>
            { this.state.cantonError === 'error'
              ? this.props.getValidationMessages('canton').map(this.renderHelpText)
              : null }
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
            <FormControl
              name="parroquia"
              componentClass="select"
              value={this.state.parroquia}
              onChange={this.onChangeParroquia}
              required
            >
              <option value="" disabled>Seleccione una parroquia</option>
              { this.state.allParroquias.length && (
                this.state.allParroquias.map((parroq, index) => (
                  <option key={index} value={`${parroq.nombre}`}>
                    {parroq.nombre}
                  </option>
                ))
              )}
            </FormControl>
            {this.state.parroquiaError === 'error'
              ? this.props.getValidationMessages('parroquia').map(this.renderHelpText)
              : null
            }
          </Col>
        </FormGroup>

        <FormGroup
          controlId="ingresoPacienteZona"
          validationState={this.state.zonaError}
        >
          <Col componentClass={ControlLabel} sm={3}>
            Zona:
          </Col>
          <Col sm={8}>
            <FormControl
              name="zona"
              componentClass="select"
              value={this.state.zona}
              placeholder="Seleccione opción"
              onChange={this.handleChange}
              required
            >
              <option value="" disabled>(Seleccione zona)</option>
              <option value="Urbana">Urbana</option>
              <option value="Rural">Rural</option>
            </FormControl>
              {this.state.zonaError === 'error'
                ? this.props.getValidationMessages('zona').map(this.renderHelpText)
                : null
              }
          </Col>
        </FormGroup>
      </Form>
    );
  }

  async componentDidMount() {
    const { status, body } = await getProvincias();
    if (status === 200) {
      this.setState({ allProvincias: body.data });
    }
    if (this.props.isEdit) {
      this.setState(this.props, async () => {
        await this.cargarCantonesPorParroquia();
        await this.cargarParroquiasPorCanton();
        this.obtenerIdParroquia(this.props.parroquia);
      });
    }
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

  onChangeProvincia = (e) => {
    const inputName = e.target.name;
    let inputValue = e.target.value;
    this.setState({
      [inputName]: inputValue,
      [`${inputName}Error`]: inputValue.length > 0
        ? 'success'
        : 'error'
    }, async () => { await this.cargarCantonesPorParroquia() });
  };

  cargarCantonesPorParroquia = async () => {
    const [curentProvince] = this.state.allProvincias.filter(
      provincia => provincia.nombre === this.state.provincia
    )
    const { status, body } = await getCantonByProvinceId(curentProvince.id);
    if (status === 200) {
      this.setState({ allCanton: body.data });
    }
  }

  onChangeCanton = (e) => {
    const inputName = e.target.name;
    let inputValue = e.target.value;
    this.setState({
      [inputName]: inputValue,
      [`${inputName}Error`]: inputValue.length > 0
        ? 'success'
        : 'error'
    }, async () => { await this.cargarParroquiasPorCanton(); });
  };

  cargarParroquiasPorCanton = async () => {
    const [curentCanton] = this.state.allCanton.filter(
      canton => canton.nombre === this.state.canton
    )
    const { status, body } = await getParroquiaByCantonId(curentCanton.id);
    if (status === 200) {
      this.setState({
        allParroquias: body.data
      });
    }
  }

  onChangeParroquia = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    this.setState({
      [inputName]: inputValue,
      [`${inputName}Error`]: inputValue.length > 0
        ? 'success'
        : 'error'
    }, () => {
      this.obtenerIdParroquia(inputValue);
    });
  };

  obtenerIdParroquia = nombreParroq => {
    const [parroquiaSelected] = this.state.allParroquias.filter(
      parroq => parroq.nombre === nombreParroq
    );
    const id_parroquia = parroquiaSelected.id;
    this.setState({ id_parroquia });
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
        }
        else {
          const validData = this.getValidatorData();
          this.props.guardarData(ingresoPacientePasos.DATOS_PROCEDENCIA, validData);
          return resolve();
        }
      });
    });
  }

  getValidatorData() {
    return {
      direccion: this.state.direccion,
      provincia: this.state.provincia,
      canton: this.state.canton,
      parroquia: this.state.parroquia,
      id_parroquia: this.state.id_parroquia,
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
