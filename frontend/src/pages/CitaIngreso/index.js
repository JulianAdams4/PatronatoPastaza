import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { filtrarBeneficiarios, crearCita, obtenerServicioSM, obtenerExoneraciones, obtenerEspecialistas } from '../../services/requestsInterface';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/es';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './citaingreso.scss';

const momentFormatDate = 'DD-MM-YYYY';

class CitaConsulta extends Component {
  constructor() {
    super();
    this.state = {
      pacientes: [],
      pacienteSeleccionado: null,
      fecha: moment(),
      hora: moment(),
      id_servicio: '',
      id_usuario: '',
      valor: '',

      shouldRedirect: false,
      redirectTo: ''
    };
  }

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to={this.state.redirectTo} />
      );
    }
    return (
      <div className="content">
        <div id="contenido-cita-ingreso" className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              {this.renderTitulo()}
              {this.renderTablaBusqueda()}
              <hr style={{ color: '#d3d3d3' }}/>
              {this.renderFormCita()}
          </div>
        </div>
      </div>
      </div>
    );
  }

  async componentDidMount() {
    const { body } = await obtenerServicioSM();
    this.setState({
      serviciosDisponibles: body.data
    }, async () => {
      const { body } = await obtenerExoneraciones();
      this.setState({ tiposExoneraciones: body.data, especialistasDisponibles: [] });
    });
  }

  renderTitulo = () => (
    <div className="titulo">
      <h2>Ingreso de citas</h2>
    </div>
  );

  renderTablaBusqueda = () => (
    <div className="content">
      <p>Ingrese una búsqueda. Seleccione un paciente y asigne una cita.</p>
      <br />
      <BootstrapTable
        data={this.state.pacientes}
        bordered={false}
        striped
        pagination={true}
        selectRow={{
          mode: 'radio',
          bgColor: '#e9f5f9',
          clickToSelect: true,
          hideSelectColumn: true,
          onSelect: this.handleRowSelect
        }}
        options={{
          sizePerPage: 12,
          prePage: 'Anterior',
          nextPage: 'Siguiente',
          firstPage: 'Primera',
          lastPage: 'Última',
          noDataText: 'No hay coincidencias',
          hideSizePerPage: true,
          onFilterChange: this.onFilterChange,
          hidePageListOnlyOnePage: true
        }}
      >
        <TableHeaderColumn
          isKey={true}
          dataField='id'
          hidden
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='nombre'
          width="33%"
          filter={{
            type: 'TextFilter',
            placeholder: 'Ingrese nombre'
          }}
          dataSort
        >
          Nombres
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField='apellido'
          width="33%"
          filter={{
            type: 'TextFilter',
            placeholder: 'Ingrese apellidos'
          }}
          dataSort
        >
          Apellidos
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField='identificacion'
          width="34%"
          filter={{
            type: 'TextFilter',
            placeholder: 'Ingrese identificación'
          }}
          dataSort
        >
          Identificación
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );

  renderFormCita = () => {
    return this.state.pacienteSeleccionado ? (
      <div>
            <div className="form-fieldset">
              <FormGroup>
                <Col componentClass={ControlLabel} lg={4} md={4} xs={12}>
                  Servicio:
                </Col>
                <Col lg={5} xs={12}>
                  <FormControl
                    name={`id_servicio`}
                    componentClass="select"
                    value = {this.state.id_servicio}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="" disabled>Seleccione servicio</option>
                    { this.state.serviciosDisponibles.length && (
                      this.state.serviciosDisponibles.map((serv, index) => (
                        <option key={index} value={`${serv.id}`}>
                          {serv.tipo}
                        </option>
                      ))
                    )}
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} lg={4} md={4} xs={12}>
                  Especialista:
                </Col>
                <Col lg={5} xs={12}>
                  <FormControl
                    name={'id_usuario'}
                    componentClass="select"
                    value = {this.state.id_usuario}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="" disabled>Seleccione especialista</option>
                    { this.state.especialistasDisponibles.length && (
                      this.state.especialistasDisponibles.map((espec, index) => (
                        <option key={index} value={`${espec.id}`}>
                          {espec.nombre}
                        </option>
                      ))
                    )}
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} lg={4} md={4} xs={12}>
                  Fecha:
                </Col>
                <Col lg={5} xs={12}>
                <DatePicker
                  name="fecha"
                  locale="es"
                  selected={this.state.fecha}
                  onChange={this.handleChangeDate}
                  showYearDropdown
                  showMonthDropdown
                  showDayDropdown
                  scrollableYearDropdown
                  dateFormatCalendar="MMMM"
                  placeholderText="Ingrese una fecha"
                  dropdownMode="select"
                  dateFormat={momentFormatDate}
                />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} lg={4} md={4} xs={12}>
                  Hora:
                </Col>
                <Col lg={5} xs={12}>
                <DatePicker
                  name="hora"
                  locale="es"
                  selected={this.state.hora}
                  value={this.state.hora.format('hh:mm')}
                  onChange={this.handleChangeHour}
                  showTimeSelect
                  showTimeSelectOnly
                  placeholderText="Ingrese hora"
                  timeFormat="hh:mm"
                  timeIntervals={15}
                  timeCaption="Hora"
                />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} lg={4} md={4} xs={12}>
                  Valor:
                </Col>
                <Col lg={5} xs={12}>
                  <FormControl
                    name={'valor'}
                    componentClass="select"
                    value = {this.state.valor}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="" disabled>Seleccione valor</option>
                    { this.state.tiposExoneraciones.length && (
                      this.state.tiposExoneraciones.map((exon, index) => (
                        <option key={index} value={`${exon.nombre}`}>
                          {exon.nombre}
                        </option>
                      ))
                    )}
                  </FormControl>
                </Col>

              </FormGroup>
            </div>
            <Col lg={12} md={12} xs={12}
              style={{
                display: 'flex', 
                flexDirection: 'column',
                marginTop: '5%',
                marginBottom: "70px"
              }}
            >
              <button
                id="guardar-cita-btn"
                className="btn btn-prev btn-lg" onClick={this.enviarForm}
              >
                Guardar
              </button>
            </Col>
      </div>
    ) : null;
  };

  onFilterChange = async ({ nombre, apellido, identificacion }) => {
    if ( !nombre && !apellido && !identificacion ) {
      this.setState({
        pacientes: [],
        citasAIngresar: [],
        pacienteSeleccionado: {}
      });
      return;
    }

    const searchParams = {
      nombre: nombre ? nombre.value : "",
      apellido: apellido ? apellido.value : '',
      identificacion: identificacion ? identificacion.value : ""
    };
    const { body } = await filtrarBeneficiarios(searchParams);
    this.setState({ pacientes: body.data, pacienteSeleccionado: {} });
  }

  handleRowSelect = (row, ev) => {
    this.setState({
      pacienteSeleccionado: row
    });
  };

  handleChange = ev => {
    const value = ev.target.value;
    const name = ev.target.name;
    this.setState({ [name]: value }, async () => {
      if (name === 'id_servicio') {
        const { body } = await obtenerEspecialistas(value);
        this.setState({ especialistasDisponibles: body.data });
      }
    });
  }

  handleChangeDate = (params) => {
    this.setState({ fecha: params });
  };

  handleChangeHour = (params) => {
    this.setState({ hora: params });
  };

  enviarForm = async () => {
    const { status } = await crearCita({
      id_servicio: this.state.id_servicio,
      id_beneficiario: this.state.pacienteSeleccionado.id,
      id_usuario: this.state.id_usuario,
      fecha: this.state.fecha.format('DD-MM-YYYY'),
      hora: this.state.hora.format('hh:mm'),
      valor: this.state.valor || 'Pagado'
    });
    if (status === 200) {
      this.setState({
        shouldRedirect: true,
        redirectTo: '/pacientes/consulta'
      })
    }
  };
}

export default CitaConsulta;
