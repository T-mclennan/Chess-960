/* TODO: This will be a component for displaying player information:
*/


import React, { Component } from 'react'
import whitePawn from '../assets/images/wP.png'
import blackPawn from '../assets/images/bP.png'

export class PlayerDetails extends Component {

  constructor(props) {
    super(props)  
    
    this.state = {
    }
  }


  render() {
    
    console.log(this.props.name);
    
    return (
      <div >
        {
         this.props.color === "white" ? 
          <img src={whitePawn}/> :
          <img src={blackPawn}/> 
        }
        <header style={{color: "white"}}>{this.props.name}</header>
      </div>
    )
  }
}

export default PlayerDetails
