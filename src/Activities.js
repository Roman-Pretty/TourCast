import './css/App.css';
import React from 'react';

import { ReactComponent as Background } from './img/bg-blur.svg';
import { ReactComponent as Run } from './img/activity_icons/directions_run.svg';
import { ReactComponent as Camping } from './img/activity_icons/camping.svg';
import { ReactComponent as Skiing } from './img/activity_icons/downhill_skiing.svg';
import { ReactComponent as Fishing } from './img/activity_icons/fishing.svg';
import { ReactComponent as Hiking } from './img/activity_icons/hiking.svg';
import { ReactComponent as Surfing } from './img/activity_icons/surfing.svg';
import { ReactComponent as Telescope } from './img/activity_icons/telescope.svg';

function getIdeals(weatherData) {
  let ideals = ["Ideal","Ideal","Ideal","Ideal","Ideal","Ideal","Ideal"];

  if (weatherData != null) {

    let temperature = Math.round(weatherData.main.temp)
    let weather = weatherData.weather[0].main // Clear, Rain, Clouds
    let visibility = weatherData.visibility // Maximum 10km is shown as 10000
    let windSpeed = weatherData.wind.speed // shown in meter/sec
    let humidity = weatherData.main.humidity // humidity 100%

    // Running
    if (visibility < 5000 || temperature < 5 || temperature > 30 || weather == "Rain" || windSpeed > 5.5|| humidity < 20 || humidity > 80) {
      ideals[0] = "Poor"
    }
    if (visibility < 2000 || temperature < -5 || temperature > 35 || weather == "Thunder" || weather == "Storm" || windSpeed > 8.3|| humidity < 10 || humidity > 90) {
      ideals[0] = "Warning"
    }

    // Camping
    if (visibility < 5000 || temperature < 10 || temperature > 25 || weather == "Rain" || windSpeed > 5.5|| humidity < 40 || humidity > 70) {
      ideals[1] = "Poor"
    }
    if (visibility < 2000 || temperature < -5 || temperature > 35 || weather == "Thunder" || weather == "Storm" || windSpeed > 8.3|| humidity < 20 || humidity > 80) {
      ideals[1] = "Warning"
    }
    
    // Fishing
    if (visibility < 5000 || temperature < 10 || temperature > 30 || windSpeed > 5.5) {
      ideals[2] = "Poor"
    }
    if (visibility < 2000 || temperature < -5 || temperature > 35 || weather == "Thunder" || weather == "Storm" || windSpeed > 8.3|| humidity < 15 || humidity > 80) {
      ideals[2] = "Warning"
    }

    // Hiking
    if (visibility < 4000 || temperature < 0 || temperature > 30 || weather == "Rain" || windSpeed > 5.5) {
      ideals[3] = "Poor"
    }
    if (visibility < 2000 || temperature < -5 || temperature > 35 || weather == "Thunder" || weather == "Storm" || windSpeed > 8.3) {
      ideals[3] = "Warning"
    }

    // Watersports
    if (visibility < 5000 || temperature < 18 || temperature > 25 || weather == "Rain" || windSpeed > 10) {
      ideals[4] = "Poor"
    }
    if (visibility < 2000 || temperature < 5 || temperature > 35 || weather == "Thunder" || weather == "Storm" || windSpeed > 15.56) {
      ideals[4] = "Warning"
    }

     // Skiing
     if (visibility < 40 || temperature < -6|| windSpeed > 7) {
      ideals[5] = "Poor"
    }
    if (visibility < 20 || temperature < -10 || weather == "Thunder" || weather == "Storm" || windSpeed > 13) {
      ideals[5] = "Warning"
    }
    if (temperature >= 0) {
      ideals[5] = "Unavailable"
    }

    // Stargazing
    if (visibility < 5000 || weather != "Clear") {
      ideals[6] = "Unavailable"
    }
  }
  return ideals;
}

function Card({activity, ideal}) {

  let className = "rating rating-" + ideal.toLowerCase();
  let cardType = ideal == "Unavailable" ? "card unavailable" : "card";

  let icon = null;
  if(activity == "Running") {icon = <Run />} else
  if(activity == "Camping") {icon = <Camping />} else
  if(activity == "Skiing") {icon = <Skiing />} else
  if(activity == "Fishing") {icon = <Fishing />} else
  if(activity == "Hiking") {icon = <Hiking />} else
  if(activity == "Watersport") {icon = <Surfing />} else
  if(activity == "Stargazing") {icon = <Telescope />}

  return (
    <div class={cardType}>
      <div class="card-content">
        {icon}
        <h3>{activity}</h3>
        <div class={className}>
          <hr class="bar"></hr>
          <p>{ideal}</p>
        </div>
      </div>
    </div>
  );

}

function WeekItem() {

  return (
    <div class="week-item">
      
    </div>
  );

}

const Dashboard = ({weatherData, weekData}) => {
  
  let ideals = getIdeals(weatherData);

    return (
      <div class="content">
        <div id="activities">
          <h1>Activities</h1>
          <div id="card-array">
            <Card activity={"Running"} ideal={ideals[0]}/>
            <Card activity={"Camping"} ideal={ideals[1]}/>
            <Card activity={"Fishing"} ideal={ideals[2]}/>
            <Card activity={"Hiking"} ideal={ideals[3]}/>
            <Card activity={"Watersport"} ideal={ideals[4]}/>
            <Card activity={"Skiing"} ideal={ideals[5]}/>
            <Card activity={"Stargazing"} ideal={ideals[6]}/>
          </div>
          <div id="weekly-activities">
            <div id="weekly-activity-content">
              <h2>Weekly Overview</h2>
              <div id="activity-forecast">
                <WeekItem />
                <WeekItem />
                <WeekItem />
                <WeekItem />
                <WeekItem />
              </div>
            </div>
          </div>
          <Background />
        </div>    
      </div>  
    );
  };
  export default Dashboard;