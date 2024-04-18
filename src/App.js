import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Redirect,Switch } from 'react-router-dom';
import Login from '../src/login/login'
import Main from '../src/main/main'
function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/main" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
