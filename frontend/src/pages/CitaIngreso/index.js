import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { filtrarBeneficiarios } from '../../services/requestsInterface';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './citaingreso.scss';

class CitaConsulta extends Component {
  constructor() {
    super();
    this.state = {
      pacientes: [],
      pacienteSeleccionado: {}
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
          </div>
        </div>
      </div>
      </div>
    );
  }

  componentDidMount() {}

  renderTitulo = () => (
    <div className="titulo">
      <h2>Citas</h2>
    </div>
  );

  renderTablaBusqueda = () => (
    <div className="content">
      <BootstrapTable
        data={this.state.pacientes}
        bordered={false}
        striped
        pagination={true}
        selectRow={{
          mode: 'radio',
          clickToSelect: true,
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
          onFilterChange: this.onFilterChange
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

  onFilterChange = async ({ nombre, apellido, identificacion }) => {
    if ( !nombre && !apellido && !identificacion ) {
      this.setState({ pacientes: [] });
      return;
    }
    
    const searchParams = {
      nombre: nombre ? nombre.value : "",
      apellido: apellido ? apellido.value : '',
      identificacion: identificacion ? identificacion.value : ""
    };
    const { body } = await filtrarBeneficiarios(searchParams);
    this.setState({ pacientes: body.data });
  }

  onSearchChange = (params) => {
    console.log(params);
  }

  handleRowSelect = (row, isSelected, ev) => {
    console.log(isSelected, row, ev);
    this.setState({
      pacienteSeleccionado: row
    });
  };
}

export default CitaConsulta;