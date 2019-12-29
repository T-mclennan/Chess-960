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
import { Provider, connect } from "react-redux";
import store from "./store";
import history from "../src/history";
import { loadPlayer } from "./actions/authActions";
import "./App.css";

const Dashboard = () => <h2>Dashboard</h2>;
const PlayerBoard = () => <h2>PlayerBoard</h2>;

class App extends Component {
  componentDidMount() {
    store.dispatch(loadPlayer());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App ">
            <AppNavbar />
            {/* {store.getState().auth.isAuthenticated ? (
              <div className="display">
                <Route exact path="/" component={Landing} />
                <Route exact path="/about" component={About} />
                <Route exact path="/lobby" component={Lobby} />
                <Route exact path="/settings" component={Settings} />
              </div>
            ) : (
              <Route path="/" component={Landing} />
            )} */}
            <div className="display">
              <Route exact path="/" component={Landing} />
              <Route exact path="/about" component={About} />
              <Route exact path="/lobby" component={Lobby} />
              <Route exact path="/settings" component={Settings} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
