import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setHeaderWithToken from './utils/setAuthToken';

if (localStorage.token) {
  setHeaderWithToken(localStorage.token);
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="alert-container">
            <Alert />
          </div>
          <Route exact={true} path='/' component={Landing} />
          <div className="container">
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
