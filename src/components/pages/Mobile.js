import '../../css/App.css';
import React, { useState, useContext, useEffect } from 'react';
import { ReactComponent as Background } from '../../img/bg-mobile.svg';

// Weather Imports
import { ReactComponent as Cloudy } from '../../img/weather/cloudy.svg';
import { ReactComponent as Rainy } from '../../img/weather/rainy.svg';
import { ReactComponent as Sunny } from '../../img/weather/sunny.svg';
import { ReactComponent as Stormy } from '../../img/weather/stormy.svg';

// Week Imports
import { ReactComponent as WeekRun } from '../../img/activity_icons/week_icons/directions_run.svg';
import { ReactComponent as WeekCamping } from '../../img/activity_icons/week_icons/camping.svg';
import { ReactComponent as WeekSkiing } from '../../img/activity_icons/week_icons/downhill_skiing.svg';
import { ReactComponent as WeekFishing } from '../../img/activity_icons/week_icons/fishing.svg';
import { ReactComponent as WeekHiking } from '../../img/activity_icons/week_icons/hiking.svg';
import { ReactComponent as WeekSurfing } from '../../img/activity_icons/week_icons/surfing.svg';
import { ReactComponent as WeekStar } from '../../img/activity_icons/week_icons/star.svg';

import { ActivityCard } from '../ActivityCard';
import { getIdeals } from '../IdealsHelper';
import { getExtremeWeatherIdeals } from '../ExtremeWeatherHelper';

import { DayContext, WeekContext, CityContext } from '../../App';
import axios from 'axios';

function CardArray() {
  const [weatherData, setWeatherData] = useContext(DayContext);
  let ideals = ["Ideal", "Ideal", "Ideal", "Ideal", "Ideal", "Ideal", "Ideal"];

  if (weatherData != null) {
    let temperature = Math.round(weatherData.main.temp);
    let weather = weatherData.weather[0].main; // Clear, Rain, Clouds
    let visibility = weatherData.visibility; // Maximum 10km is shown as 10000
    let windSpeed = weatherData.wind.speed; // shown in meter/sec
    let humidity = weatherData.main.humidity; // humidity 100%
    ideals = getIdeals(temperature, weather, visibility, windSpeed, humidity);
  }
  return (
    <div className='card-array'>
      <ActivityCard activity="Running" ideal={ideals[0]} />
      <ActivityCard activity="Camping" ideal={ideals[1]} />
      <ActivityCard activity="Fishing" ideal={ideals[2]} />
      <ActivityCard activity="Hiking" ideal={ideals[3]} />
      <ActivityCard activity="Watersport" ideal={ideals[4]} />
      <ActivityCard activity="Skiing" ideal={ideals[5]} />
      <ActivityCard activity="Stargazing" ideal={ideals[6]} />
    </div>
  );
}

function ExtremeWeather() {

  const [weatherData, setWeatherData] = useContext(DayContext);
  const [isDisabled, setIsDisabled] = useState("none");
  const [extremeWeather, setExtremeWeather] = useState("None");

  useEffect(() => {
    if (weatherData != null) {

      // Set the extreme weather
      setExtremeWeather(getExtremeWeatherIdeals(
        Math.round(weatherData.main.temp),
        weatherData.weather[0].id)[0]);

      // If it exists, make the notification enabled
      let isDisabled = getExtremeWeatherIdeals(
        Math.round(weatherData.main.temp),
        weatherData.weather[0].id)[0] == "None" ? "disabled" : "enabled";

      setIsDisabled(isDisabled);
    }
  }, [weatherData]);

  return (
    <div id='extreme-weather' className={isDisabled}>
      <h1>{extremeWeather + "!"}</h1>
    </div>
  );

}

function WeekItem({ day, weather, temp, levels }) {

  let weatherComponent = <Cloudy />;

  if (weather === "Rain") {
    weatherComponent = <Rainy />;
  } else if (weather === "Clear") {
    weatherComponent = <Sunny />;
  } else if (weather === "Storm") {
    weatherComponent = <Stormy />;
  } else if (weather === "Clouds") {
    weatherComponent = <Cloudy />;
  }

  return (
    <div className='week-item'>
      <div className='day'>
        <h3>{day}</h3>
        {weatherComponent}
      </div>
      <div className='activities'>
        {levels[0] == 'Ideal' ? <WeekRun /> : null}
        {levels[1] == 'Ideal' ? <WeekCamping /> : null}
        {levels[2] == 'Ideal' ? <WeekFishing /> : null}
        {levels[3] == 'Ideal' ? <WeekHiking /> : null}
        {levels[4] == 'Ideal' ? <WeekSurfing /> : null}
        {levels[5] == 'Ideal' ? <WeekSkiing /> : null}
        {levels[6] == 'Ideal' ? <WeekStar /> : null}
      </div>
      <p>{temp}°</p>
    </div>
  );

}

function MobileWeek() {

  const [weekData, setWeekData] = useContext(WeekContext);
  let ideals = null;

  // Get the next 4 days
  var now = new Date();
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var day = [days[now.getDay() + 1], days[now.getDay() + 2], days[now.getDay() + 3], days[now.getDay() + 4], days[now.getDay() + 5]];

  // Get the weather and temperature for the next 4 days
  let weathers = ["No Data", "No Data", "No Data", "No Data", "No Data"];
  let temperatures = [0, 0, 0, 0, 0];
  if (weekData != null) {
    for (let i = 0; i < 5; i++) {
      weathers[i] = weekData.list[i].weather[0].main;
      temperatures[i] = Math.round(weekData.list[i].main.temp);
    }

    ideals = [["Warning", "Warning", "Warning", "Warning", "Warning", "Warning", "Warning"],
    ["Warning", "Warning", "Warning", "Warning", "Warning", "Warning", "Warning"],
    ["Warning", "Warning", "Warning", "Warning", "Warning", "Warning", "Warning"],
    ["Warning", "Warning", "Warning", "Warning", "Warning", "Warning", "Warning"],
    ["Warning", "Warning", "Warning", "Warning", "Warning", "Warning", "Warning"]];
    for (let i = 0; i < 5; i++) {
      //temperature, weather, visibility, windSpeed, humidity
      ideals[i] = getIdeals(
        weekData.list[i].main.temp,
        weekData.list[i].weather[0].main,
        weekData.list[i].visibility,
        weekData.list[i].wind.speed,
        weekData.list[i].main.humidity);
    }
  }

  return (
    <div className='week-content'>
      <h2>5-Day Forecast</h2>
      <div className='week-items'>
        <WeekItem day={day[0]} weather={weathers[0]} temp={temperatures[0]} levels={ideals[0]} />
        <WeekItem day={day[1]} weather={weathers[1]} temp={temperatures[1]} levels={ideals[1]} />
        <WeekItem day={day[2]} weather={weathers[2]} temp={temperatures[2]} levels={ideals[2]} />
        <WeekItem day={day[3]} weather={weathers[3]} temp={temperatures[3]} levels={ideals[3]} />
        <WeekItem day={day[4]} weather={weathers[4]} temp={temperatures[4]} levels={ideals[4]} />
      </div>
    </div>
  );
}

function Footer() {

  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  let className = selected ? 'big-footer' : 'small-footer';
  let svg = selected ? 'high' : 'low';

    return (
      <footer className={className}>
        {selected ? <MobileWeek /> : null}
        <a href='#' onClick={handleClick}>
          <svg className={svg} id='mobile-bar' xmlns="http://www.w3.org/2000/svg" width="78" height="6" viewBox="0 0 78 6" fill="none">
            <path d="M3.10254 3L74.8974 3.00001" stroke="url(#paint0_linear_59_2057)" stroke-width="6" stroke-linecap="round" />
            <defs>
              <linearGradient id="paint0_linear_59_2057" x1="39" y1="3" x2="39" y2="4" gradientUnits="userSpaceOnUse">
                <stop stop-color="#07FFFF" />
                <stop stop-color="#4CE0E0" />
              </linearGradient>
            </defs>
          </svg>
        </a>
      </footer>
    );
}

const Mobile = () => {

  const [city, setCity] = useContext(CityContext);
  const [weatherData, setWeatherData] = useContext(DayContext);
  const [weekData, setWeekData] = useContext(WeekContext);
  const [isLoading, setIsLoading] = useState('loading');

  const fetchData = async () => {
    setIsLoading('loading');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=717fad74b9058562c326494dcbd56f58`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metric&appid=717fad74b9058562c326494dcbd56f58`
      );
      setWeekData(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(null);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  let temperature = 0;
  let feelsLike = 0;
  let hi = 0;
  let lo = 0;
  let weather = "No Data";
  if (weatherData != null) {
    temperature = Math.round(weatherData.main.temp);
    feelsLike = weatherData.main.feels_like;
    hi = Math.round(weatherData.main.temp_max);
    lo = Math.round(weatherData.main.temp_min);
    weather = weatherData.weather[0].main;
  }

  let weatherComponent = <Cloudy />;

  if (weather === "Rain") {
    weatherComponent = <Rainy />;
  } else if (weather === "Clear") {
    weatherComponent = <Sunny />;
  } else if (weather === "Storm") {
    weatherComponent = <Stormy />;
  } else if (weather === "Clouds") {
    weatherComponent = <Cloudy />;
  }

  return (
    <div id='mobile'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <input type="text" value={city} onChange={handleInputChange}></input>
          <button type='submit' className={isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
              <path d="M32 16.5C32 25.0604 25.0604 32 16.5 32C7.93959 32 1 25.0604 1 16.5C1 7.93959 7.93959 1 16.5 1C25.0604 1 32 7.93959 32 16.5Z" fill="#A1B4D7" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6667 21C12.7211 21 10.3333 18.6122 10.3333 15.6667C10.3333 12.7211 12.7211 10.3333 15.6667 10.3333C18.6122 10.3333 21 12.7211 21 15.6667C21 16.8991 20.5819 18.034 19.8799 18.9371L23.4714 22.5286L22.5286 23.4714L18.9371 19.8799C18.034 20.5819 16.8991 21 15.6667 21ZM19.6667 15.6667C19.6667 17.8758 17.8758 19.6667 15.6667 19.6667C13.4575 19.6667 11.6667 17.8758 11.6667 15.6667C11.6667 13.4575 13.4575 11.6667 15.6667 11.6667C17.8758 11.6667 19.6667 13.4575 19.6667 15.6667Z" fill="#444444" />
              <path d="M32 16.5C32 25.0604 25.0604 32 16.5 32C7.93959 32 1 25.0604 1 16.5C1 7.93959 7.93959 1 16.5 1C25.0604 1 32 7.93959 32 16.5Z" stroke="#444444" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6667 21C12.7211 21 10.3333 18.6122 10.3333 15.6667C10.3333 12.7211 12.7211 10.3333 15.6667 10.3333C18.6122 10.3333 21 12.7211 21 15.6667C21 16.8991 20.5819 18.034 19.8799 18.9371L23.4714 22.5286L22.5286 23.4714L18.9371 19.8799C18.034 20.5819 16.8991 21 15.6667 21ZM19.6667 15.6667C19.6667 17.8758 17.8758 19.6667 15.6667 19.6667C13.4575 19.6667 11.6667 17.8758 11.6667 15.6667C11.6667 13.4575 13.4575 11.6667 15.6667 11.6667C17.8758 11.6667 19.6667 13.4575 19.6667 15.6667Z" stroke="#444444" />
            </svg>
          </button>
        </fieldset>
      </form>
      <div className='content'>
        <ExtremeWeather />
        <div className='content-text'>
          <h1>Today</h1>
          <h2>{temperature}°</h2>
        </div>
        {weatherComponent}
        <div className='content-subtext'>
          <h3>Feels like {feelsLike}°</h3>
          <p>H:{hi}° L:{lo}°</p>
        </div>
        <CardArray />
      </div>
      <Background />
      <Footer />
    </div>
  );
};
export default Mobile;
