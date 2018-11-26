import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginWrapper from './components/LoginWrapper';

const Dash = () => (
  <h3>Dashborad</h3>
);

const App = () => (
  <Router>
    <div className="app">
      <Route path="/" component={LoginWrapper} />
      <Route exact path="/home" component={Dash} />
    </div>
  </Router>
);

export default App;
