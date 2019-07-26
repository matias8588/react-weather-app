import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";

export default class Loading extends Component {
  render() {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}
