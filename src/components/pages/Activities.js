import '../../css/App.css';
import React, { useContext } from 'react';

import { ReactComponent as Background } from '../../img/bg-blur.svg';
import { getIdeals } from '../IdealsHelper';

import { DayContext } from '../../App';
import { ActivityCard } from '../ActivityCard';
import ActivityOverview from '../ActivityOverview';

const Activities = () => {
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
    <div class="content">
      <div id="activities">
        <h1>Activities</h1>
        <div id="card-array">
          
          <ActivityCard activity="Running" ideal={ideals[0]} />
          <ActivityCard activity="Camping" ideal={ideals[1]} />
          <ActivityCard activity="Fishing" ideal={ideals[2]} />
          <ActivityCard activity="Hiking" ideal={ideals[3]} />
          <ActivityCard activity="Watersport" ideal={ideals[4]} />
          <ActivityCard activity="Skiing" ideal={ideals[5]} />
          <ActivityCard activity="Stargazing" ideal={ideals[6]} />
        </div>
        <ActivityOverview />
        <Background />
      </div>
    </div>
  );
};
export default Activities;