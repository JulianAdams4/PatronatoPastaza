import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './citaconsulta.scss';
import { obtenerBeneficiarios } from '../../services/requestsInterface';

class CitaConsulta extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataToEdit: {},
      disabledButtons: true
    };
  }

  render() {
    const { data } = this.state;
    const options = {
      sizePerPage: 12,
      prePage: 'Anterior',
      nextPage: 'Siguiente',
      firstPage: 'Primera',
      lastPage: 'Última',
      noDataText: 'No hay registros',
      hideSizePerPage: true,
      onFilterChange: this.onFilterChange
    };

    return (
      <div className="content">
        <div id="contenido-cita-consulta" className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="titulo">
                <h2>Citas</h2>
              </div>
              
              <div className="buttons pull-right">
                <button className="btn btn-rectangle btn-wd btn-info" disabled={this.state.disabledButtons}>
                  Marcar asistencia
                </button>
                <button className="btn btn-rectangle btn-wd btn-danger" disabled={this.state.disabledButtons}>
                   Quitar asistencia
                </button>
              </div>

              <div className="content">
                <BootstrapTable
                  data={data}
                  bordered={false}
                  striped
                  pagination={true}
                  selectRow={{
                    mode: 'radio',
                    clickToSelect: true,
                    onSelect: this.handleRowSelect
                  }}
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
                    dataField='telefono'
                    width="15%">
                    Teléfono
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
    const { body } = await obtenerBeneficiarios({
      nombre: '', apellido: '', identificacion: ''
    });
    this.setState({ data: body.data });
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
    console.log(isSelected, row, ev);
    this.setState({
      dataToEdit: row,
      disabledButtons: false
    });
  };
}

export default CitaConsulta;