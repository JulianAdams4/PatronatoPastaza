import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';
import 'moment/locale/es';
import { obtenerCitasPendientes } from '../../services/requestsInterface';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './citaconsulta.scss';

class CitaConsulta extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataToEdit: {},
      disabledButtons: true,
      rowExpandableId: undefined
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
      onFilterChange: this.onFilterChange,
      expandRowBgColor: '#e9f5f9'
    };

    return (
      <div className="content">
        <div id="contenido-cita-consulta" className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="titulo">
                <h2>Citas</h2>
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
                    isKey
                    width="10%"
                    filter={{
                      type: 'TextFilter',
                      placeholder: 'Ingrese historia'
                    }}
                    dataSort>
                    # Historia
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='nombre'
                    width="20%"
                    filter={{
                      type: 'TextFilter',
                      placeholder: 'Ingrese nombre'
                    }}
                    dataSort>
                    Nombres
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='apellido'
                    width="20%"
                    filter={{
                      type: 'TextFilter',
                      placeholder: 'Ingrese apellidos'
                    }}
                    dataSort>
                    Apellidos
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='identificacion'
                    width="15%"
                    filter={{
                      type: 'TextFilter',
                      placeholder: 'Ingrese identificación'
                    }}
                    dataSort>
                    Identificación
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='estatenc'
                    width="15%">
                    Estado
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataAlign='center'
                    headerAlign='center'
                    dataFormat={this.renderActionButtons}
                  >
                    Acciones
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
          </div>
        </div>
      </div>
      </div>
    );
  }

  renderActionButtons = () => {
    return `
      <button class="btn btn-sm btn-info" title="Ficha médica" style="padding: 4px 7px">
        <span class="btn-label fa fa-user-md" style="font-size: 20px; position:relative; top:2px;"/>
      </button>

      <button class="btn btn-sm btn-success" title="Marcar asistencia" style="padding: 5px 6px">
        <span class="btn-label fa fa-check" style="font-size: 18px; position:relative; top:2px;"/>
      </button>

      <button class="btn btn-sm btn-danger" title="Eliminar asistencia" style="padding: 4px 7px">
        <span class="btn-label fa fa-times" style="font-size: 20px; position:relative; top:2px;"/>
      </button>
    `
  };

  async componentDidMount() {
    const { status, body } = await obtenerCitasPendientes();
    if (status === 200) {
      const formattedData = body.data.map(cita => {
        if (cita.estatenc === 'P') {
          return { ...cita, estatenc: "Pendiente" }
        }
        return cita;
      });
      this.setState({ data: formattedData });  
    }
  }

  removeItem = itemId => {
    this.setState({
      data: this.state.data.filter(item => item.id !== itemId)
    });
  }

  onFilterChange = (params) => {
    console.log(params);
  }

  onSearchChange = (params) => {
    console.log(params);
  }

  handleRowSelect = (row, isSelected, ev) => {
    this.setState({
      dataToEdit: row,
      disabledButtons: false,
      rowExpandableId: row.id
    });
  };

  expandComponent = (row) => {
    console.log(row);
    const fechaNacimiento = moment(row.fechanacimiento).format("DD-MMMM-YYYY");
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