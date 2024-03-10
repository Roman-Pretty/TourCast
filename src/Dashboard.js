import './css/App.css';
import React from 'react';
import { ReactComponent as Cloudy } from './img/weather/cloudy.svg';
import { ReactComponent as Background } from './img/bg.svg';
import { ReactComponent as RainyWeek } from './img/weather/week/Rainy.svg';
import { ReactComponent as SunWeek } from './img/weather/week/Sun.svg';
import { ReactComponent as StormyWeek } from './img/weather/week/Stormy.svg';
import { ReactComponent as CloudyWeek } from './img/weather/week/Cloudy.svg';

function TodayWeather({weatherData}) {

  let temperature = 0
  let feelsLike = 0
  if (weatherData != null) {
    temperature = Math.round(weatherData.main.temp)
    feelsLike = weatherData.main.feels_like
  }

  return (
    <div id="today-weather">
        <div id="today-weather-text">
            <section id="title">
                <h1>Today</h1>
                <p>Feels like {feelsLike}°</p>
            </section>
            <h1 id="temperature">{temperature}°</h1>
        </div>
        <Cloudy />
    </div>
  );
}

function WeekItem({day, weather, temp}) {
  let weatherComponent = <CloudyWeek />;

  if (weather === "Rainy") {
    weatherComponent = <RainyWeek />;
  } else if (weather === "Sunny") {
    weatherComponent = <SunWeek />;
  } else if (weather === "Stormy") {
    weatherComponent = <StormyWeek />;
  } else if (weather === "Cloudy") {
    weatherComponent = <CloudyWeek />;
  }

  return (
    <div class="week-item">
      <div class="week-item-divider"></div>
      <div class="week-item-content">
        <div class="week-item-text">
          <h3>{day}</h3>
          <p>{weather}<br/>{temp}°</p>
        </div>
        {weatherComponent}
      </div>
    </div>
  );
}

function Forecast() {
  return (
    <div id="forecast">
      <WeekItem day="Tom" weather="Rainy" temp="4"/>
      <WeekItem day="Wed" weather="Cloudy" temp="8"/>
      <WeekItem day="Thu" weather="Sunny" temp="19"/>
      <WeekItem day="Fri" weather="Stormy" temp="7"/>
    </div>
  );
}

const Dashboard = ({weatherData}) => {
    return (
      <div class="content">
        <div id="dashboard">
          <TodayWeather weatherData={weatherData}/>
          <Forecast />
          <Background />
        </div>    
      </div>  
    );
  };
  export default Dashboard;