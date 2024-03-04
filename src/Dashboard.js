import './css/App.css';
import React from 'react';
import { ReactComponent as Cloudy } from './img/weather/cloudy.svg';

function Background() {
  return 
  (
    <div id="bg"></div>
  )
}

function TodayWeather() {
  return (
    <div id="today-weather">
        <div id="today-weather-text">
            <section id="title">
                <h1>Today</h1>
                <p>Chance of rain: 0%</p>
            </section>
            <h1 id="temperature">21°</h1>
        </div>
        <Cloudy />
    </div>
  );
}

const Dashboard = () => {
    return (
      <div>
        <TodayWeather />
        <Background />
      </div>
      
    );
  };
  export default Dashboard;