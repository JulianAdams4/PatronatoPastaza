import React, { Component } from 'react';
import StepZilla from "react-stepzilla";
import DatosGenerales from './DatosGenerales';
import Procedencia from './Procedencia';
import './dashboard.scss';


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      disableSubmit: true,
      disableNextStep: true,
      formData: {
        datosGenerales: {
          nombres: '',
          apellidos: '',
          identificacion: '',
          lugarNacimiento: '',
          fechaNacimiento: '',
          estadoCivil: '',
          nacionalidad: '',
          grupoEtnico: '',
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
          institucion: '',
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
                    { name: 'Procedencia', component: <Procedencia {...this.state.formData.datosProcedencia} /> },
                    { name: 'Datos Generales', component: <DatosGenerales {...this.state.formData.datosGenerales} /> },
                    
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
                  hocValidationAppliedTo={[0, 1]}
                  nextTextOnFinalActionStep="Guardar"
                />
              </div>
            </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;