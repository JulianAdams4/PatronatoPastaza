import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import LoginWrapper from "./components/LoginWrapper";
import SeleccionProyecto from "./containers/SeleccionProyecto";
import rootReducer from "./reducers/index";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

window.getState = () => store.getState();

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="app">
        <Route exact path="/" component={LoginWrapper} />
        <Route exact path="/proyectos" component={SeleccionProyecto} />
      </div>
    </Router>
  </Provider>
);

export default App;
