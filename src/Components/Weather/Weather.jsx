import React, { Component } from "react";
import moment from "moment";
import Search from "../Searchbox/Search";
import "./Weather.css";

export default class Weather extends Component {
  state = {
    lat: undefined,
    lon: undefined,
    city: undefined,
    temperatureC: undefined,
    humidity: undefined,
    icon: undefined,
    sunrise: undefined,
    sunset: undefined,
    errorMessage: undefined,
  };

  getPosition = () => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  getWeather = async (latitude, longitude) => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const api_call = await fetch(
      `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
    );
    const data = await api_call.json();
    console.log("Desde el componente del clima:", data);

    this.setState({
      lat: latitude,
      lon: longitude,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      humidity: data.main.humidity,
      icon: data.weather[0].icon,
      sunrise: moment.unix(data.sys.sunrise).format("hh:mm a"),
      sunset: moment.unix(data.sys.sunset).format("hh:mm a"),
    });
  };

  componentDidMount() {
    this.getPosition()
      .then(position => {
        this.getWeather(position.coords.latitude, position.coords.longitude);
      })
      .catch(err => {
        this.setState({ errorMessage: err.message });
      });

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      100000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { city, temperatureC, humidity, icon, sunrise, sunset } = this.state;
    if (city) {
      return (
        <div className="App">
          <div className="weather-box">
            <div className="weather-item">Ciudad: {city}</div>
            <div className="weather-item">
              Temperatura: {temperatureC} &deg;C
            </div>
            <div className="weather-item">Humedad: {humidity}%</div>
            <div>
              <img
                className="weather-icon"
                src={`http://openweathermap.org/img/w/${icon}.png`}
                alt="weather icon"
              />
            </div>
            <div className="weather-item">
              <span>Salida del sol: {sunrise}</span>
            </div>
            <div className="weather-item">
              <span>Puesta del sol: {sunset}</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>
            No pudimos encontrar tu ubicación, por favor ingresá el nombre de tu
            ciudad
          </h2>
          <Search />
        </div>
      );
    }
  }
}
