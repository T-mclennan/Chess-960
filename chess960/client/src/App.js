import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import GameWindow from './components/GameWindow';
import Header from './components/layout/Header'


function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header/>
          <GameWindow />
        </div>
      </div>
    </Router>
  );
}

export default App;
