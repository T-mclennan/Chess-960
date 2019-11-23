import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import GameWindow from './components/GameWindow';
import Header from './components/layout/Header'


function App() {
  return (
    <Router>
      <div className="App">
        <div className="container" 
        style={{backgroundColor: '#505255', height: '100vh'}}
        >
          <Header/>
          <GameWindow style={{marginBottom: '15px'}}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
