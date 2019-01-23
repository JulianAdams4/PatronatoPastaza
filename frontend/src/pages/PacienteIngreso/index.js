import React, { Component } from 'react';
import StepZilla from "react-stepzilla";
import DatosGenerales from './DatosGenerales';
import Procedencia from './Procedencia';
import Ocupacion from './Ocupacion';
import DatosReferencia from './DatosReferencia';
import Final from './Final';
import './dashboard.scss';


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      disableSubmit: true,
      disableNextStep: true,
        datosGenerales: {
          nombres: '',
          apellidos: '',
          identificacion: '',
          lugarNacimiento: '',
          fechaNacimiento: '',
          estadoCivil: '',
          nacionalidad: '',
          grupoCultural: '',
          sexo: '',
          telefono: ''
        },
        datosProcedencia: {
          direccion: '',
          provincia: '',
          canton: '',
          parroquia: '',
          zona: '',
          barrio: '',
        },
        datosOcupacion: {
          instruccion: '',
          ocupacion: '',
          empresa: '',
          tipoSeguro: '',
          referido: ''
        },
        datosReferencia: {
          discapacidad: '',
          viveCon: '',
          telefonoReferencia: ''
        }
    }
  }

  render() {
    return (
      <div className="content">
        <div className="container-fluid">
            <div id="formulario-ingreso-paciente" className="col-md-12">
              <div className="titulo">
                <h2>Ingreso de Paciente</h2>
              </div>

              <div className="formulario">
                <StepZilla 
                  steps={[
                    { 
                      name: 'Datos Generales', 
                      component: <DatosGenerales {...this.state.datosGenerales} guardarData={this.actualizarDatosGenerales} />
                    },
                    { 
                      name: 'Procedencia', 
                      component: <Procedencia {...this.state.datosProcedencia} />
                    },
                    { 
                      name: 'Ocupación', 
                      component: <Ocupacion {...this.state.datosOcupacion} />
                    },
                    { 
                      name: 'Datos de referencia', 
                      component: <DatosReferencia {...this.state.datosReferencia} />
                    },
                    {
                      name: 'Final',
                      component: <Final />
                    }
                  ]}
                  showNavigation={true}
                  showSteps={true}
                  stepsNavigation={true}
                  prevBtnOnLastStep={true}
                  dontValidate={false}
                  preventEnterSubmission={true}
                  nextButtonText={"Siguiente"}
                  backButtonText={"Atrás"}
                  nextButtonCls={"btn btn-prev btn-primary btn-lg pull-right"}
                  backButtonCls={"btn btn-next btn-primary btn-lg pull-left"}
                  hocValidationAppliedTo={[0, 1, 2, 3]}
                  nextTextOnFinalActionStep="Guardar"
                />
              </div>
            </div>
        </div>
      </div>
    );
  }

  actualizarDatosGenerales = (validData) => {
    this.setState({
      datosGenerales: validData
    });
  }
};

export default Dashboard;