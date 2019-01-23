import { List, fromJS } from "immutable";
import { getUserProjects } from "../services/requestsInterface";

const ADD_BATCH = "add-batch";

export const anadirProyectosAlStore = proyectos => ({
  type: ADD_BATCH,
  proyectos,
});

export const cargarProyectos = async () => {
  try {
    const { status, body } = await getUserProjects();
    if (status === 200) {
      return {
        error: false, 
        proyectos: body.data.proyectos
      };
    } else if (status === 403) {
      return {
        error: true,
        proyectos: null
      };
    }
  } catch (e) {
    return {
      error: true,
      proyectos: []
    };
  }
};

export default function reducer(state = new List(), action) {
  switch (action.type) {
    case ADD_BATCH:
      return state.concat(fromJS(action.proyectos));
    default:
      return state;
  }
}