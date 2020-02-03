import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Router, Route, Switch } from "react-router-dom";
import About from "./components/pages/About";
import Settings from "./components/pages/Settings";
import Landing from "./components/layout/Landing";
import Lobby from "./components/layout/Lobby/Lobby";
import AppNavbar from "./components/layout/AppNavbar";
import { Provider } from "react-redux";
import store from "./store";
import history from "../src/history";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { LoginRoute } from "./components/auth/LoginRoute";
import "./App.css";

import SocketContext from "./socket-context";
import * as io from "socket.io-client";
import { FourOhFour } from "./components/pages/FourOhFour";

const port = process.env.PORT || "http://127.0.0.1:5000";
const socket = io(port, { pingTimeout: 30000 });

socket.on("disconnect", reason => {
  if (reason === "io server disconnect") {
    console.log("disconnect in APP");
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
  // else the socket will automatically try to reconnect
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
            <div className="App ">
              <AppNavbar />
              <div className="display">
                <Switch>
                  <LoginRoute exact path="/" component={Landing} />
                  <ProtectedRoute exact path="/about" component={About} />
                  <ProtectedRoute exact path="/lobby" component={Lobby} />
                  <ProtectedRoute exact path="/settings" component={Settings} />
                  <Route path="*" component={FourOhFour} />
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
