import React, { Component } from 'react';
import Weather from './Components/Weather/Weather.jsx'
import NavBar from './Components/Navbar/Navbar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Weather />
      </div>
    )
  }
}
