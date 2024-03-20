import '../../css/App.css';
import React, { useContext } from 'react';

// Import The Background SVG
import { ReactComponent as Background } from '../../img/bg-blur.svg';

// Import Helper Functions and Components
import {ActivityCard} from '../ActivityCard';
import ActivityOverview from '../ActivityOverview';
import {getIdeals} from '../IdealsHelper';

// Import React Context for weather data
import { DayContext } from '../../App';

const Activities = () => {
  const [weatherData, setWeatherData] = useContext(DayContext);

  // How ideal each activity is - either Ideal, Warning or Poor
  // Ordered by Running, Camping, Fishing, Hiking, Watersport, Skiing, Stargazing
  let ideals = ["Ideal", "Ideal", "Ideal", "Ideal", "Ideal", "Ideal", "Ideal"];

  // If weather data is available, get the ideals for each activity
  if (weatherData != null) {
    let temperature = Math.round(weatherData.main.temp);
    let weather = weatherData.weather[0].main; // Clear, Rain, Clouds
    let visibility = weatherData.visibility; // Maximum 10km is shown as 10000
    let windSpeed = weatherData.wind.speed; // shown in meter/sec
    let humidity = weatherData.main.humidity; // humidity 100%
    
    // Get the ideal conditions for each activity based on weather data passed to the getIdeals helper function
    ideals = getIdeals(temperature, weather, visibility, windSpeed, humidity);
  }

  // Render the Activities page using the ActivityCard and ActivityOverview components
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