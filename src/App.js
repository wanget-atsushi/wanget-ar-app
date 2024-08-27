import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/landing" component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;

