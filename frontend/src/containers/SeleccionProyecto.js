import { connect } from "react-redux";
import { cargarProyectos } from "../actions/index";
import SeleccionProyectoView from "../components/SeleccionProyecto";

const mapStateToProps = (state) => {
  const proyectos = state.get("proyectos");
  return {
    proyectos: proyectos.toJS(),
  };
};

const mapDispatchToProps = dispatch => ({
  cargarProyectosUsuario: () => {
    dispatch(cargarProyectos());
  },
});

const SeleccionProyecto = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeleccionProyectoView);

export default SeleccionProyecto;
