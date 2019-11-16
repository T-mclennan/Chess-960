import React from 'react'
import { Link } from 'react-router-dom'

  function Header() {
    return (
      <header style={headerStyle}>
        <h1>Chess 960</h1>
      </header>
    )
  } 

  const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
  }

  const linkStyle = { 
    color: "white",
    textDecoration: 'none',
  }

export default Header;