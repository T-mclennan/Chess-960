import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Router, Route } from "react-router-dom";
import { Redirect } from "react-router";
import About from "./components/pages/About";
import Settings from "./components/pages/Settings";
import Landing from "./components/layout/Landing";
import Lobby from "./components/layout/Lobby/Lobby";
import Header from "./components/layout/Header";
import AppNavbar from "./components/layout/AppNavbar";
import { Provider } from "react-redux";
import store from "./store";
import history from "../src/history";
import { loadPlayer } from "./actions/authActions";
import "./App.css";

// import SocketContext from "./socket-context";
// import * as io from "socket.io-client";

// const port = process.env.PORT || "http://127.0.0.1:5000";
// const socket = io(port, { pingTimeout: 30000 });

class App extends Component {
  componentWillMount() {
    store.dispatch(loadPlayer());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          {/* <SocketContext.Provider value={socket}> */}
          <div className="App ">
            <AppNavbar />
            <div className="display">
              <Route exact path="/" component={Landing} />
              <Route exact path="/about" component={About} />
              <Route exact path="/lobby" component={Lobby} />
              <Route exact path="/settings" component={Settings} />
            </div>
          </div>
          {/* </SocketContext.Provider> */}
        </Router>
      </Provider>
    );
  }
}

export default App;
