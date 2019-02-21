import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import StepZilla from "react-stepzilla";
import DatosGenerales from './DatosGenerales';
import Procedencia from './Procedencia';
import Ocupacion from './Ocupacion';
import DatosReferencia from './DatosReferencia';
import Final from './Final';
import moment from 'moment';
import { obtenerBeneficiarioPorId } from '../../services/requestsInterface';
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
      isEdit: false,
      editId: '',
      shouldRedirect: false,
      redirectTo: '',
      tituloSeccion: '',
      datosGenerales: {
        nombre: '',
        apellido: '',
        identificacion: '',
        lugarNacimiento: '',
        fechaNacimiento: moment(),
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

        parroquia: '',
        provincia: '',
        canton: ''
      },
      datosOcupacion: {
        instruccion: '',
        ocupacion: '',
        empresa: '',
        tipoSeguro: '',
        referido: ''
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
    if (this.state.shouldRedirect) {
      return (
        <Redirect to={this.state.redirectTo} />
      );
    }

    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div id="formulario-ingreso-paciente" className="col-md-12">
              <div className="titulo">
                <h2>{this.state.tituloSeccion}</h2>
              </div>

              <div className="formulario">
                <StepZilla 
                  steps={[
                    { 
                      name: '1. Datos Generales', 
                      component:
                        <DatosGenerales 
                          {...this.state.datosGenerales} 
                          guardarData={this.actualizarDatosFrom} 
                        />
                    },
                    { 
                      name: '2. Procedencia', 
                      component:
                         <Procedencia 
                          {...this.state.datosProcedencia}
                          guardarData={this.actualizarDatosFrom}
                          isEdit={this.state.isEdit}
                        />
                    },
                    { 
                      name: '3. Ocupación', 
                      component: 
                        <Ocupacion 
                          {...this.state.datosOcupacion} 
                          guardarData={this.actualizarDatosFrom}
                          isEdit={this.state.isEdit}
                        />
                    },
                    { 
                      name: '4. Datos de referencia', 
                      component: 
                        <DatosReferencia 
                          {...this.state.datosReferencia}
                          guardarData={this.actualizarDatosFrom}
                          isEdit={this.state.isEdit}
                        />
                    },
                    {
                      name: '5. Final',
                      component: 
                        <Final 
                          formData={{
                            ...this.state.datosGenerales,
                            ...this.state.datosProcedencia,
                            ...this.state.datosOcupacion,
                            ...this.state.datosReferencia
                          }}
                          isEdit={this.state.isEdit}
                          editId={this.state.editId}
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
                  nextButtonCls={`btn btn-prev btn-lg pull-right boton-prev ${this.state.disableAll ? 'disabled' : ''}`}
                  backButtonCls={`btn btn-next btn-lg pull-left boton-next ${this.state.disableAll ? 'disabled' : ''}`}
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

  async componentDidMount() {
    if (this.props.match.params.historia) {
      const id = this.props.match.params.historia;
      const { status, body } = await obtenerBeneficiarioPorId(id);
      if (status === 200) {
        const [infoPaciente] = body.data;
        if (!infoPaciente) {
          this.setState({
            shouldRedirect: true,
            redirectTo: '/pacientes/consulta'
          });
          return;
        }
        const datosGenerales = {
          nombre: infoPaciente.nombre,
          apellido: infoPaciente.apellido,
          identificacion: infoPaciente.identificacion,
          lugarNacimiento: infoPaciente.lugarnacimiento,
          fechaNacimiento: moment(infoPaciente.fechanacimiento),
          estadoCivil: infoPaciente.estadocivil,
          nacionalidad: infoPaciente.nacionalidad,
          grupoCultural: infoPaciente.grupocultural,
          sexo: infoPaciente.sexo,
          telefono: infoPaciente.telefono
        };
        const datosProcedencia = {
          direccion: infoPaciente.direccion,
          id_parroquia: infoPaciente.id_parroquia,
          zona: infoPaciente.zona,
          barrio: infoPaciente.barrio,

          parroquia: infoPaciente.parroquia,
          provincia: infoPaciente.provincia,
          canton: infoPaciente.canton
        };
        const datosOcupacion = {
          instruccion: infoPaciente.instruccion || 'No tiene',
          ocupacion: infoPaciente.ocupacion || '',
          empresa: infoPaciente.empresa || '',
          tipoSeguro: infoPaciente.seguro || '',
          referido: infoPaciente.referido || ''
        };
        const datosReferencia = {
          resNombre: infoPaciente.resNombre,
          resApellido: infoPaciente.resApellido,
          resParentezco: infoPaciente.resParentesco,
          resDireccion: infoPaciente.resDireccion || '',
          resTelefono: infoPaciente.resTelefono || ''
        };
        this.setState({
          isEdit: true,
          editId: id,
          tituloSeccion: 'Editar paciente',
          datosGenerales,
          datosProcedencia,
          datosOcupacion,
          datosReferencia
        });
        return;
      }
    }
    this.setState({ tituloSeccion: 'Ingreso de paciente' });
  }

  actualizarDatosFrom = (seccion, validData) => {
    this.setState({ [seccion]: validData });
  }
};

export { IngresoPaciente as default, ingresoPacientePasos };