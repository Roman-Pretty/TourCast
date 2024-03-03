import './css/App.css';
import React from 'react';
import { ReactComponent as Cloudy } from './img/weather/cloudy.svg';


const Dashboard = () => {
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
  };
  export default Dashboard;