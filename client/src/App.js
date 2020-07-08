import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact={true} path='/' component={Landing} />
        <div className="container">
          <Switch>
            <Route path='/login' component={Login} /> 
            <Route path='/register' component={Register} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
