import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import About from "./components/pages/About";
import Landing from "./components/layout/Landing";
import Lobby from "./components/layout/Lobby";
import Header from "./components/layout/Header";
import AppNavbar from "./components/layout/AppNavbar";
import { Provider } from "react-redux";
import store from "./store";
import { loadPlayer } from "./actions/authActions";

const Dashboard = () => <h2>Dashboard</h2>;
const PlayerBoard = () => <h2>PlayerBoard</h2>;

class App extends Component {
  componentDidMount() {
    store.dispatch(loadPlayer());
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <AppNavbar />
            <div className="display">
              <Route exact path="/" component={Landing} />
              <Route exact path="/about" component={About} />
              <Route exact path="/lobby" component={Lobby} />
            </div>
            {/* <div className="Wrapper" style={lobbyStyle}>

               <Header /> 
              {<GameWindow style={{ marginBottom: "15px" }} /> }
            </div> */}
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
