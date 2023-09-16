import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [planetaryData, setPlanetaryData] = useState({});

  const axios = require('axios');

  const username = '33eb0470-dcd0-4412-9ca5-4616b167220d';
  const password = '18f1c87f9732e94c18d55adcf78c559602df7f92f90b2672d7d9a106b8f6541497935a08da14fcf968e53c3e81c646534ec767f415cf84d2f98e614a381c3abfac148498de3fc2246d6818acb61c5a7690b845cc6e0359750435592aaf8dfd459f97afb9895088729be6a6d608fd7b98';

  // Combine username and password with a colon and encode in base64
  const authString = btoa(`${username}:${password}`);

  const search = () => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
    
    axios
      .get('https://api.astronomyapi.com/api/v2/bodies', {
      headers: {
        Authorization: `Basic ${authString}`
      },
      params: {
        longitude : '-84.39733',
        latitude : '33.775867',
        elevation : '50',
        from_date: '2018-12-20',
        to_date: '2018-12-22',
        time: '08:00:00'
      }
      })
      .then(response => {
      // Handle the API response here
        setPlanetaryData(response.data);
        console.log(planetaryData);
      })
      .catch(error => {
      // Handle any errors here
        setError(error);
        console.log(error);
      });
    };

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Chandigarh");
  }, []);

  return (
    
    <div className="forecast">    
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            {" "}
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={search}
            />
          </div>
        </div>
        <ul>
          {typeof weather.main != "undefined" ? (
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Forcast;
