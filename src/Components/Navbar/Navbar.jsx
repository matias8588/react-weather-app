import Navbar from "react-bootstrap/Navbar";

import React, { Component } from "react";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">{" Clima hoy"}</Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}
