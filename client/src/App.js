import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import Landing from './components/layout/Landing';
import Lobby from './components/layout/Lobby/Lobby';
import FourOFour from './components/pages/FourOFour';
import About from './components/pages/About';
import Settings from './components/pages/Settings';
import { Provider } from 'react-redux';
import store from './store';
import history from '../src/history';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginRoute } from './components/auth/LoginRoute';
import './App.css';

import SocketContext from './socket-context';
import * as io from 'socket.io-client';

const socket = io();

socket.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    console.log('disconnect in APP');
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
});

class App extends Component {
  componentWillMount() {
    // store.dispatch(loadPlayer());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <SocketContext.Provider value={socket}>
            <div className='App '>
              <AppNavbar />
              <div className='display'>
                <Switch>
                  <LoginRoute exact path='/' component={Landing} />
                  <Route exact path='/about' component={About} />
                  <ProtectedRoute exact path='/lobby' component={Lobby} />
                  <ProtectedRoute exact path='/settings' component={Settings} />
                  <Route path='/*' component={FourOFour} />
                </Switch>
              </div>
            </div>
          </SocketContext.Provider>
        </Router>
      </Provider>
    );
  }
}

export default App;
