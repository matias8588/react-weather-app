import React, { Component } from "react";
import Weather from "../Weather/Weather";

export default class Home extends Component {
  state = {
    city: undefined,
  };
  render() {
    console.log("Ciudad: ", this.city);

    return (
      <div>
        <p>Main screen</p>
        <Weather />
      </div>
    );
  }
}
