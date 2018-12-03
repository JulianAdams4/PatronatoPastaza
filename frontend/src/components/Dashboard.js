import React from 'react';
import { Jumbotron, Button, Table } from 'reactstrap';

const Dashboard = (props) => {
  return (
    <div style={{ height: '100%' }}>
      <Jumbotron style={{ height: '100%', backgroundColor: '#fff', padding: '5%' }}>
        <h1 className="display-3">Bienvenido, Julian</h1>
        <br/>

        <p className="lead">
          Esta es la página de inicio. Puedes empezar creando una cita
        </p>
        <p className="lead">
          <Button color="primary">
            <span className="glyphicon glyphicon-plus"></span>
            Agendar cita
          </Button>
        </p>
        <br/><br/>
        
        <h3>Citas programadas</h3>
        <br/>
        <Table>
          <thead>
            <tr>
              <th># Historia</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Cédula</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>0900000000</td>
              <td>09:00</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>0900000001</td>
              <td>09:30</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>0900000002</td>
              <td>10:00</td>
            </tr>
          </tbody>
        </Table>

      </Jumbotron>
    </div>
  );
};

export default Dashboard;