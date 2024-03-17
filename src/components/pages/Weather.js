import React, { useContext } from 'react';
import { DayContext, WeekContext } from '../../App';

import { ReactComponent as Background } from '../../img/bg-blur.svg';
import { ReactComponent as Cloudy } from '../../img/weather/cloudy.svg';
import { ReactComponent as Rainy } from '../../img/weather/rainy.svg';
import { ReactComponent as Sunny } from '../../img/weather/sunny.svg';
import { ReactComponent as Stormy } from '../../img/weather/stormy.svg';

function WeatherItem({ day, weather, temperature, feelsLike, humidity, wind, pressure, icon }) {

  let weatherComponent = <Cloudy />;

  if (icon === "Rain") {
    weatherComponent = <Rainy />;
  } else if (icon === "Clear") {
    weatherComponent = <Sunny />;
  } else if (icon === "Storm") {
    weatherComponent = <Stormy />;
  } else if (icon === "Clouds") {
    weatherComponent = <Cloudy />;
  }

  return (
    <div className="weather-item">
      <div className='day'>
        <h1>{day}</h1>
        {weatherComponent}
      </div>
      
      <ul>
        <li>Weather: {weather}</li>
        <li>Temperature: {temperature}°C</li>
        <li>Feels like: {feelsLike}°C</li>
        <li>Humidity: {humidity}%</li>
        <li>Wind: {wind} m/h</li>
        <li>Pressure: {pressure} hPa</li>
      </ul>
    </div>
  );
}

const Weather = () => {

  const [weatherData, setWeatherData] = useContext(DayContext);
  const [weekData, setWeekData] = useContext(WeekContext);

  let icon = ["Rain", "Rain", "Rain", "Rain", "Rain", "Rain"];
  let weather = ["Rain", "Rain", "Rain", "Rain", "Rain", "Rain"];
  let temperature = ["20", "20", "20", "20", "20", "20"];
  let feelsLike = ["20", "20", "20", "20", "20", "20"];
  let humidity = ["80", "80", "80", "80", "80", "80"];
  let wind = ["10", "10", "10", "10", "10", "10"];
  let pressure = ["12", "12", "12", "12", "12", "12"];

  if (weatherData != null) {
    icon[0] = weatherData.weather[0].main;
    weather[0] = weatherData.weather[0].description;
    temperature[0] = Math.round(weatherData.main.temp);
    feelsLike[0] = weatherData.main.feels_like;
    humidity[0] = weatherData.main.humidity;
    wind[0] = weatherData.wind.speed;
    pressure[0] = weatherData.main.pressure;
  }

  if (weekData != null) {
    for (let i = 1; i < 6; i++) {
      icon[i] = weekData.list[i].weather[0].main;
      weather[i] = weekData.list[i].weather[0].description;
      temperature[i] = Math.round(weekData.list[i].main.temp);
      feelsLike[i] = weekData.list[i].main.feels_like;
      humidity[i] = weekData.list[i].main.humidity;
      wind[i] = weekData.list[i].wind.speed;
      pressure[i] = weekData.list[i].main.pressure;
    }
  }

  // Get the next 5 days
  var now = new Date();
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var day = [days[now.getDay() + 1], days[now.getDay() + 2], days[now.getDay() + 3], days[now.getDay() + 4], days[now.getDay() + 5]];

  return (
    <div id="weather-page">
      <h1>Weather Overview</h1>
      <div className="weather-container">
        <WeatherItem day={"Today"} weather={weather[0]} temperature={temperature[0]} feelsLike={feelsLike[0]} humidity={humidity[0]} wind={wind[0]} pressure={pressure[0]} icon={icon[0]} />
        <WeatherItem day={day[0]} weather={weather[1]} temperature={temperature[1]} feelsLike={feelsLike[1]} humidity={humidity[1]} wind={wind[1]} pressure={pressure[1]} icon={icon[1]} />
        <WeatherItem day={day[1]} weather={weather[2]} temperature={temperature[2]} feelsLike={feelsLike[2]} humidity={humidity[2]} wind={wind[2]} pressure={pressure[2]} icon={icon[2]} />
        <WeatherItem day={day[2]} weather={weather[3]} temperature={temperature[3]} feelsLike={feelsLike[3]} humidity={humidity[3]} wind={wind[3]} pressure={pressure[3]} icon={icon[3]} />
        <WeatherItem day={day[3]} weather={weather[4]} temperature={temperature[4]} feelsLike={feelsLike[4]} humidity={humidity[4]} wind={wind[4]} pressure={pressure[4]} icon={icon[4]} />
        <WeatherItem day={day[4]} weather={weather[5]} temperature={temperature[5]} feelsLike={feelsLike[5]} humidity={humidity[5]} wind={wind[5]} pressure={pressure[5]} icon={icon[5]} />
      </div>
      <Background />
    </div>
  );
};
export default Weather;