import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';
import 'moment/locale/es';
import { filtrarBeneficiarios } from '../../services/requestsInterface';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './pacienteconsulta.scss';

class PacienteConsulta extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      rowExpandableId: undefined
    };
  }

  render() {
    const { data } = this.state;
    const options = {
      sizePerPage: 15,
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
        <div id="contenido-paciente-consulta" className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="titulo">
                <h2>Consulta de Paciente</h2>
              </div>
              
              <div className="content">
                <p>Seleccione la fila para ver los datos del paciente</p>
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
                    width="10%"
                    filter={{
                      type: 'TextFilter',
                      placeholder: 'Filtrar historia'
                    }}
                    dataSort>
                    # Historia
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='nombre'
                    // width="20%"
                    filter={{
                      type: 'TextFilter',
                      placeholder: 'Filtrar por nombre'
                    }}
                    dataSort>
                    Nombres
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='apellido'
                    // width="20%"
                    filter={{
                      type: 'TextFilter',
                      placeholder: 'Filtrar por apellidos'
                    }}
                    dataSort>
                    Apellidos
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    className="hidden-xs"
                    columnClassName="hidden-xs"
                    dataField='identificacion'
                    dataAlign='center'
                    headerAlign='center'
                    filter={{
                      type: 'TextFilter',
                      placeholder: 'Filtrar por identificación'
                    }}
                    dataSort>
                    Identificación
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    className="hidden-xs"
                    columnClassName="hidden-xs"
                    dataField='telefono'
                    dataAlign='center'
                    headerAlign='center'
                    >
                    Teléfono
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
      <button 
        class="btn btn-xs edit-button"
      >
        Editar
      </button>
    `
  };

  async componentDidMount() {
    const { body } = await filtrarBeneficiarios({
      nombre: '',
      apellido: '',
      identificacion: ''
    });
    this.setState({ data: body.data });
  }

  removeItem = itemId => {
    this.setState({
      data: this.state.data.filter(item => item.id !== itemId)
    });
  }

  onFilterChange = async ({ nombre, apellido, identificacion }) => {
    const searchParams = {
      nombre: nombre ? nombre.value : "",
      apellido: apellido ? apellido.value : '',
      identificacion: identificacion ? identificacion.value : ""
    };
    const { body } = await filtrarBeneficiarios(searchParams);
    this.setState({ data: body.data });
  }

  handleRowSelect = (row, ev) => {
    this.setState({
      rowExpandableId: row.id
    });
  };

  expandComponent = (row) => {
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

export default PacienteConsulta;