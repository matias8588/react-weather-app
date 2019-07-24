import React, { Component } from "react";
import Weather from "../Weather/Weather";

export default class Home extends Component {
  render() {
    console.log(this.Weather);
    return (
      <div>
        <p>Main screen</p>
        <Weather />
      </div>
    );
  }
}
