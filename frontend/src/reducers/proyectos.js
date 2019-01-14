import { List, fromJS } from "immutable";
import { Proyecto } from "../actions/types";

const proyectos = (state = new List(), action) => {
  switch (action.type) {
    case Proyecto.ADD_BATCH: {
      return state.concat(fromJS(action.proyectos));
    }
    default:
      return state;
  }
};

export default proyectos;
