import React, { Component } from 'react';
import { Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { filtrarBeneficiarios } from '../../services/requestsInterface';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/es';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './citaingreso.scss';

const camposFormCita = {
  id_servicio: '',
  id_beneficiario: '',
  id_usuario: '',
  fecha: '',
  valor: ''
};

class CitaConsulta extends Component {
  constructor() {
    super();
    this.state = {
      pacientes: [],
      pacienteSeleccionado: {},
      citasAIngresar: []
    };
  }

  render() {
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

  componentDidMount() {
    this.setState({
      serviciosDisponibles: [
        { id: 1, nombre: "Medicina General" },
        { id: 2, nombre: "Odontología" },
        { id: 3, nombre: "Terapia de Lenguaje" },
        { id: 4, nombre: "Terapia Física" },
        { id: 5, nombre: "Psicología" },
        { id: 6, nombre: "Equinoterapia" },
        { id: 7, nombre: "Estimulación Temprana" }
      ],
      especialistasDisponibles: [
        { id: 1, nombre: 'Especialista 1' },
        { id: 2, nombre: 'Especialista 2' },
        { id: 3, nombre: 'Especialista 3' },
        { id: 4, nombre: 'Especialista 4' }
      ],
      tiposExoneraciones: [
        { id: 1, nombre: 'Pagado' },
        { id: 2, nombre: 'Proyecto' },
        { id: 3, nombre: 'Convenio' },
        { id: 4, nombre: 'Grupo prioritario' }
      ]
    })
  }

  renderTitulo = () => (
    <div className="titulo">
      <h2>Citas</h2>
    </div>
  );

  renderTablaBusqueda = () => (
    <div className="content">
      <p>Ingrese una búsqueda. Seleccione un paciente y asigne una cita.</p>
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
    return this.state.citasAIngresar.length ? (
      <Form horizontal autoComplete="off">
        {this.state.citasAIngresar.map((camposCita, index) => {
          return (
            <div className="form-fieldset" key={index}>
              <FormGroup 
                validationState={this.state.grupoCulturalError}
              >
                <Col componentClass={ControlLabel} lg={4} md={4} xs={12}>
                  Servicio:
                </Col>
                <Col lg={6} xs={12}>
                  <FormControl
                    name={`${camposCita.id_servicio}`}
                    componentClass="select"
                    defaultValue=""
                    onChange={this.handleChange}
                    required
                  >
                    <option value="" disabled>Seleccione servicio</option>
                    { this.state.serviciosDisponibles.length && (
                      this.state.serviciosDisponibles.map((serv, index) => (
                        <option key={index} value={`${serv.id}`}>
                          {serv.nombre}
                        </option>
                      ))
                    )}
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup 
                validationState={this.state.grupoCulturalError}
              >
                <Col componentClass={ControlLabel} lg={4} md={4} xs={12}>
                  Especialista:
                </Col>
                <Col lg={6} xs={12}>
                  <FormControl
                    name={`${camposCita.id_usuario}`}
                    componentClass="select"
                    defaultValue=""
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

              <FormGroup
                validationState={this.state.fechaNacimientoError}
              >
                <Col componentClass={ControlLabel} lg={4} md={4} xs={12}>
                  Fecha:
                </Col>
                <Col lg={6} xs={12}>
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
                </Col>
              </FormGroup>

              <FormGroup validationState={this.state.grupoCulturalError}>
                <Col componentClass={ControlLabel} lg={4} md={4} xs={12}>
                  Valor:
                </Col>
                <Col lg={6} xs={12}>
                  <FormControl
                    name={`${camposCita.valor}`}
                    componentClass="select"
                    defaultValue=""
                    onChange={this.handleChange}
                    required
                  >
                    <option value="" disabled>Seleccione valor</option>
                    { this.state.tiposExoneraciones.length && (
                      this.state.tiposExoneraciones.map((exon, index) => (
                        <option key={index} value={`${exon.id}`}>
                          {exon.nombre}
                        </option>
                      ))
                    )}
                  </FormControl>
                </Col>
              </FormGroup>
            </div>
          );
        })}
      </Form>
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
      pacienteSeleccionado: row,
      citasAIngresar: [camposFormCita]
    });
  };
}

export default CitaConsulta;