import React, { Component } from "react";
import moment from "moment";
import Loading from "../Loading/Loading.jsx";
import "./Weather.scss";

export default class Weather extends Component {
  state = {
    lat: undefined,
    lon: undefined,
    city: undefined,
    status: undefined,
    temperatureC: undefined,
    humidity: undefined,
    maxTemp: undefined,
    minTemp: undefined,
    wind: undefined,
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
      `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`,
    );
    const data = await api_call.json();
    console.log(data);
    console.log(data.weather[0].main);
    this.setState({
      lat: latitude,
      lon: longitude,
      city: data.name,
      status: data.weather[0].main,
      condition:
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1),
      temperatureC: Math.round(data.main.temp),
      humidity: data.main.humidity,
      maxTemp: Math.round(data.main.temp_max),
      minTemp: Math.round(data.main.temp_min),
      wind: data.wind.speed,
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
    const {
      city,
      status,
      condition,
      temperatureC,
      humidity,
      maxTemp,
      minTemp,
      wind,
      icon,
      sunrise,
      sunset,
    } = this.state;

    if ((city && status === "Clear") || (city && status === "Clouds")) {
      return (
        <div className="App">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="weather-card one">
                  <div className="top">
                    <div className="wrapper">
                      <h1 className="heading">
                        <img
                          className="weather-icon"
                          src={`http://openweathermap.org/img/w/${icon}.png`}
                          alt="weather icon"
                        />
                        {condition}
                      </h1>
                      <h3 className="location">{city}</h3>
                      <p className="temp">
                        <span className="temp-value">{temperatureC}</span>
                        <span className="deg">0</span>
                        <span className="temp-type">C</span>
                      </p>
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="wrapper">
                      <ul className="forecast">
                        <li className="active">
                          <div id="weather-item">
                            <span>Salida del sol: {sunrise}</span>
                          </div>
                          <div id="weather-item">
                            <span>Puesta del sol: {sunset}</span>
                          </div>
                          <div id="weather-item">
                            <span>Máxima prevista: {maxTemp}&deg;C</span>
                          </div>
                          <div id="weather-item">
                            <span>Mínima prevista: {minTemp}&deg;C</span>
                          </div>
                          <div id="weather-item">
                            <span>Viento: {wind} km/h</span>
                          </div>
                          <div id="weather-item">
                            <span>Humedad: {humidity}%</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (city && status !== "Clear") {
      return (
        <div className="App">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="weather-card rain">
                  <div className="top">
                    <div className="wrapper">
                      <h1 className="heading">
                        <img
                          className="weather-icon"
                          src={`http://openweathermap.org/img/w/${icon}.png`}
                          alt="weather icon"
                        />
                        {condition}
                      </h1>
                      <h3 className="location">{city}</h3>
                      <p className="temp">
                        <span className="temp-value">{temperatureC}</span>
                        <span className="deg">0</span>
                        <span className="temp-type">C</span>
                      </p>
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="wrapper">
                      <ul className="forecast">
                        <li className="active">
                          <div className="weather-item">
                            <span>Salida del sol: {sunrise}</span>
                          </div>
                          <div id="weather-item">
                            <span>Puesta del sol: {sunset}</span>
                          </div>
                          <div id="weather-item">
                            <span>Máxima prevista: {maxTemp}&deg;C</span>
                          </div>
                          <div id="weather-item">
                            <span>Mínima prevista: {minTemp}&deg;C</span>
                          </div>
                          <div id="weather-item">
                            <span>Viento: {wind} km/h</span>
                          </div>
                          <div id="weather-item">
                            <span>Humedad: {humidity}%</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="App">
            <div className="container">
              <div className="row">
                <div className="col">
                  <Loading />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
