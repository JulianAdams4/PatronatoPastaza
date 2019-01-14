import { Proyecto } from "./types";
// import { mockGetProyectos } from "../services/requestsInterface";

export const anadirProyectosAlStore = proyectos => ({
  type: Proyecto.ADD_BATCH,
  proyectos,
});

export const cargarProyectos = () => async (dispatch) => {
  try {
    // const { status } = mockGetProyectos();
    // if (status === 200) {
    const proyectos = [
      { name: "Servicios médicos" },
      { name: "CITET" },
    ];
    dispatch(anadirProyectosAlStore(proyectos));
    // }
  } catch (e) {
    // TO DO
  }
};
