import React, { Component } from 'react';
import { Col, FormGroup, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/es';
import { obtenerCitasPendientes, marcarAsistenciaCita, eliminarCita, filtrarBeneficiarios } from '../../services/requestsInterface';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './citaconsulta.scss';

const momentFormatDate = 'DD-MM-YYYY';

class CitaConsulta extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      servicios: [],
      fecha: moment(),
      id_servicio: 1,
      rowExpandableId: null
    };
  }

  render() {
    const { data } = this.state;
    const options = {
      sizePerPage: 20,
      prePage: 'Anterior',
      nextPage: 'Siguiente',
      firstPage: 'Primera',
      lastPage: 'Última',
      noDataText: 'No hay registros',
      hideSizePerPage: true,
      expandRowBgColor: '#e9f5f9',
      expandBy: 'column'
    };

    return (
      <div className="content">
        <div id="contenido-cita-consulta" className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="titulo">
                <h2>Reporte diario</h2>
              </div>

              <ul>
                <li>Seleccione especialidad y fecha a buscar</li>
                <li>Seleccione una fila para ver los datos del paciente</li>
              </ul>
               <br />

              <div className="filtros-cita-consulta">
                <Col md={12} sm={12} xs={12}>
                  <Col md={6} sm={6} xs={12}>
                    <FormGroup >
                      <Col sm={3}xs={12}>
                        Especialidad:
                      </Col>
                      <Col sm={8} xs={12}>
                        <FormControl
                          name="id_servicio"
                          componentClass="select"
                          value={this.state.id_servicio}
                          onChange={this.onChangeEspecialidad}
                        >
                          { this.state.servicios.length && (
                            this.state.servicios.map((serv, index) => (
                              <option key={index} value={`${serv.id}`}>
                                {serv.nombre}
                              </option>
                            ))
                          )}
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Col>
                  
                  <Col md={6} sm={6} xs={12}>
                    <FormGroup >
                      <Col sm={3}xs={12}>
                        Fecha:
                      </Col>
                      <Col sm={8}xs={12}>
                        <DatePicker
                          locale="es"
                          value={this.state.fecha.format(momentFormatDate)}
                          selected={this.state.fecha}
                          onChange={this.onChangeFechaConsulta}
                          dropdownMode="select"
                          showYearDropdown
                          scrollableYearDropdown
                          showMonthDropdown
                          dateFormatCalendar="MMMM"
                          placeholderText="Seleccione una fecha"
                          dateFormat={momentFormatDate}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Col>
              </div>

              <div className="content">
              <BootstrapTable
                  data={data}
                  bordered={false}
                  striped
                  pagination={true}
                  selectRow={{
                    mode: 'radio',
                    bgColor: '#e9f5f9',
                    clickToSelect: true,
                    clickToExpand: true,
                    hideSelectColumn: true,
                    onSelect: this.handleRowSelect
                  }}
                  expandableRow={row => row.id  === this.state.rowExpandableId}
                  expandComponent={this.expandComponent}
                  options={options}>
                  <TableHeaderColumn
                    dataField='id'
                    dataAlign='center'
                    headerAlign='center'
                    isKey
                    dataSort>
                    #
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='apellido'
                    dataSort>
                    Apellido
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='nombre'
                    dataSort>
                    Nombre
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    className="hidden-xs"
                    columnClassName="hidden-xs"
                    dataField='identificacion'
                    dataAlign='center'
                    headerAlign='center'
                    dataSort>
                    Identificación
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField='edad'
                    dataSort>
                    Edad
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='sexo'
                    dataSort>
                    Sexo
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='grupocultural'
                    dataSort>
                    Grupo Cultural
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField='canton'
                    dataSort>
                    Canton
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='parroquia'
                    dataSort>
                    Parroquia
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='barrio'
                    dataSort>
                    Barrio
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    className="hidden-xs"
                    columnClassName="hidden-xs"
                    dataField='tipoExoneracion'
                    dataAlign='center'
                    headerAlign='center'
                    >
                    Exoneración
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
          </div>
        </div>
      </div>
      </div>
    );
  }

  async componentDidMount() {
    await this.cargarBeneficiariosCentroMedico();
  }

  cargarBeneficiariosCentroMedico = async () => {
    const { body } = await filtrarBeneficiarios({
      nombre: '',
      apellido: '',
      identificacion: ''
    });
    this.setState({ data: body.data });
    await this.cargarServicios();
  };

  cargarServicios = async () => {
    const servicios = [
      { id: 1, nombre: 'Medicina general' },
      { id: 2, nombre: 'Odontologia' },
      { id: 3, nombre: 'Hidroterapia' },
      { id: 4, nombre: 'Equinoterapia' }
    ];
    this.setState({
      servicios,
      especialidad: servicios[0] ? servicios[0].id : null
    })
  }

  onChangeEspecialidad = ev => {
    const id_servicio = ev.target.value;
    this.setState({ id_servicio }, async () => {
      const { id_servicio, fecha } = this.state;
      await this.cargarCitasPendientes({ id_servicio, fecha });
    });
  };

  onChangeFechaConsulta = params => {
    this.setState({ fecha: params }, async () => {
      const { id_servicio, fecha } = this.state;
      const parsed = fecha.format(momentFormatDate);
      await this.cargarCitasPendientes({ id_servicio, fecha: parsed });
    });
  }

  expandComponent = (row) => {
    const fechaNacimiento = moment(row.fechanacimiento).format(momentFormatDate);
    return (
      <div className="row-expanded">
        <div><strong>Nombres:</strong>    {row.nombre}</div>
        <div><strong>Apellidos:</strong>    {row.apellido}</div>
        {row.identificacion && ( <div><strong>Identificación:</strong>    {row.identificacion}</div> )}
        <div><strong>Lugar de nacimiento:</strong>    {row.lugarnacimiento}</div>
        <div><strong>Fecha de nacimiento:</strong>    {fechaNacimiento}</div>
        {row.telefono && ( <div><strong>Teléfono:</strong>    {row.telefono}</div> )}
        <div><strong>Estado civil:</strong>    {row.estadocivil}</div>
        {row.direccion && ( <div><strong>Dirección:</strong>    {row.direccion}</div> )}
        {row.barrio && ( <div><strong>Barrio:</strong>    {row.barrio}</div> )}
        <div><strong>Nacionalidad:</strong>    {row.nacionalidad}</div>
        <div><strong>Grupo Cultural:</strong>    {row.grupocultural}</div>
        {row.instruccion && ( <div><strong>Instrucción:</strong>    {row.instruccion}</div> )}
        {row.ocupacion && ( <div><strong>Ocupación:</strong>    {row.ocupacion}</div> )}
        {row.empresa && ( <div><strong>Empresa:</strong>    {row.empresa}</div> )}
        {row.seguro && ( <div><strong>Seguro:</strong>    {row.seguro}</div> )}
      </div>
    )
  }
}

export default CitaConsulta;