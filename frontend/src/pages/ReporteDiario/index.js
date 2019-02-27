import React, { Component } from 'react';
import { Col, FormGroup, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/es';
import { obtenerReporteBeneficiarios, obtenerServicioSM } from '../../services/requestsInterface';
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
      id_servicio: 1
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
      hideSizePerPage: true
    };

    return (
      <div className="content">
        <div id="contenido-reporte-diario" className="container-fluid">
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
                          <option value="" disabled>Seleccione servicio</option>
                          { this.state.servicios.length && (
                            this.state.servicios.map((serv, index) => (
                              <option key={index} value={`${serv.id}`}>
                                {serv.tipo}
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
                  exportCSV={ true }
                  options={options}>
                  <TableHeaderColumn
                    dataField="any"
                    dataFormat={this.generarIndex}
                    dataAlign='center'
                    headerAlign='center'
                    width="4%"
                    isKey={true}
                  >
                    #
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataAlign='center'
                    dataField='apellido'
                    width="auto"
                    csvHeader='Apellido'
                    dataSort>
                    Apellido
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataAlign='center'
                    dataField='nombre'
                    width="auto"
                    csvHeader='Nombre'
                    dataSort>
                    Nombre
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='identificacion'
                    dataAlign='center'
                    headerAlign='center'
                    width="auto"
                    csvHeader='Identificación'
                    dataSort>
                    Identificación
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='fechanacimiento'
                    dataAlign='center'
                    headerAlign='center'
                    dataFormat={this.obtenerEdad}
                    width="auto"
                    csvHeader='Edad'
                    csvFormat={this.obtenerEdad}
                    dataSort>
                    Edad
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    className="hidden-xs hidden-sm"
                    columnClassName="hidden-xs hidden-sm"
                    dataAlign='center'
                    dataField='sexo'
                    csvHeader='Sexo'
                    dataSort>
                    Sexo
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    className="hidden-lg hidden-md"
                    columnClassName="hidden-lg hidden-md"
                    dataAlign='center'
                    dataField='sexo'
                    csvHeader='Sexo'
                    dataFormat={(cell, row) => {
                      return row.sexo.slice(0,1);
                    }}
                    dataSort>
                    Sexo
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataAlign='center'
                    dataField='grupocultural'
                    width="auto"
                    csvHeader='Grupo Cultural'
                    dataSort>
                    Grupo Cultural
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataAlign='center'
                    dataField='canton'
                    width="auto"
                    csvHeader='Cantón'
                    dataSort>
                    Canton
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataAlign='center'
                    dataField='parroquia'
                    width="auto"
                    csvHeader='Parroquia'
                    dataSort>
                    Parroquia
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataAlign='center'
                    dataField='barrio'
                    width="auto"
                    csvHeader='Barrio'
                    dataSort>
                    Barrio
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    className="hidden-xs"
                    columnClassName="hidden-xs"
                    dataField='tipoExoneracion'
                    dataAlign='center'
                    headerAlign='center'
                    csvHeader='Exoneracióñ'
                    width="auto"
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
    const fechareporte = this.state.fecha.format("YYYY-MM-DD");
    const idservicio = this.state.id_servicio;
    await this.cargarBeneficiariosCentroMedico(fechareporte, idservicio);
  }

  generarIndex = (cell, row, enumObject, index) => {
    return (<div>{index+1}</div>)
  }

  obtenerEdad = (cell, rowData) => {
    const hoy = moment();
    const fecha = moment(rowData.fechanacimiento);
    return hoy.diff(fecha, 'year');
  }

  cargarBeneficiariosCentroMedico = async (fecha, servicio) => {
    const { status, body } = await obtenerReporteBeneficiarios(fecha, servicio);
    if (status === 200) {
      this.setState({ data: body.data });
    }
    await this.cargarServicios();
  };

  cargarServicios = async () => {
    const { body } = await obtenerServicioSM();
    this.setState({ servicios: body.data || [] });
  }

  onChangeEspecialidad = ev => {
    const id_servicio = ev.target.value;
    this.setState({ id_servicio }, async () => {
      const fechareporte = this.state.fecha.format("YYYY-MM-DD");
      const idservicio = this.state.id_servicio;
      await this.cargarBeneficiariosCentroMedico(fechareporte, idservicio);
    });
  };

  onChangeFechaConsulta = params => {
    this.setState({ fecha: params }, async () => {
      const fechareporte = this.state.fecha.format("YYYY-MM-DD");
      const idservicio = this.state.id_servicio;
      await this.cargarBeneficiariosCentroMedico(fechareporte, idservicio);
    });
  }
}

export default CitaConsulta;
