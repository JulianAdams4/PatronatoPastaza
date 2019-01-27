import React, { Component } from 'react';
import StepZilla from "react-stepzilla";
import DatosGenerales from './DatosGenerales';
import Procedencia from './Procedencia';
import Ocupacion from './Ocupacion';
import DatosReferencia from './DatosReferencia';
import Final from './Final';
import './dashboard.scss';

const ingresoPacientePasos = {
  DATOS_GENERALES: 'datosGenerales',
  DATOS_PROCEDENCIA: 'datosProcedencia',
  DATOS_OCUPACION: 'datosOcupacion',
  DATOS_REFERENCIA: 'datosReferencia'
};

class IngresoPaciente extends Component {
  constructor(props){
    super(props);
    this.state = {
      datosGenerales: {
        nombre: '',
        apellido: '',
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
        id_parroquia: '',
        zona: '',
        barrio: '',
      },
      datosOcupacion: {
        instruccion: '',
        ocupacion: '',
        empresa: '',
        tipoSeguro: '',
        referido: '',
      },
      datosReferencia: {
        resNombre: '',
        resApellido: '',
        resParentezco: '',
        resDireccion: '',
        resTelefono: ''
      }
    }
  }

  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div id="formulario-ingreso-paciente" className="col-md-12">
              <div className="titulo">
                <h2>Ingreso de Paciente</h2>
              </div>

              <div className="formulario">
                <StepZilla 
                  steps={[
                    { 
                      name: 'Datos Generales', 
                      component:
                        <DatosGenerales 
                          {...this.state.datosGenerales} 
                          guardarData={this.actualizarDatosFrom} 
                        />
                    },
                    { 
                      name: 'Procedencia', 
                      component: <Procedencia 
                        {...this.state.datosProcedencia}
                        guardarData={this.actualizarDatosFrom} 
                        />
                    },
                    { 
                      name: 'Ocupación', 
                      component: 
                        <Ocupacion 
                          {...this.state.datosOcupacion} 
                          guardarData={this.actualizarDatosFrom}
                        />
                    },
                    { 
                      name: 'Datos de referencia', 
                      component: 
                        <DatosReferencia 
                          {...this.state.datosReferencia}
                          guardarData={this.actualizarDatosFrom}
                        />
                    },
                    {
                      name: 'Final',
                      component: 
                        <Final 
                          formData={{
                            ...this.state.datosGenerales,
                            ...this.state.datosProcedencia,
                            ...this.state.datosOcupacion,
                            ...this.state.datosReferencia
                          }}
                        />
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
      </div>
    );
  }

  actualizarDatosFrom = (seccion, validData) => {
    this.setState({ [seccion]: validData });
  }
};

export { IngresoPaciente as default, ingresoPacientePasos };