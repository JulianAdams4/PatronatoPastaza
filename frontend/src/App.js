import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginWrapper from "./components/LoginWrapper";
import Dashboard from "./components/Dashboard";

const App = () => (
  <Router>
    <div className="app">
      <Route exact path="/" component={LoginWrapper} />
      <Route exact path="/home" component={Dashboard} />
    </div>
  </Router>
);

export default App;
