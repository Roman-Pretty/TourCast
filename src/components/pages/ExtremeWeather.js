import '../../css/App.css';
import React, { useContext } from 'react';

// Import The Background SVG and helper functions
import { ReactComponent as Background } from '../../img/bg-blur.svg';
import { getExtremeWeatherIdeals } from '../ExtremeWeatherHelper';

// Import React Context for day weather data
import { DayContext } from '../../App';

// Extreme Weather Icon imports
import { ReactComponent as HeatwaveIcon } from '../../img/extreme_weather_icons/heatwave.svg';
import { ReactComponent as TornadoIcon } from '../../img/extreme_weather_icons/tornado.svg';
import { ReactComponent as StormIcon } from '../../img/extreme_weather_icons/storm.svg';
import { ReactComponent as SnowstormIcon } from '../../img/extreme_weather_icons/snowstorm.svg';
import { ReactComponent as DustIcon } from '../../img/extreme_weather_icons/dust.svg';
import { ReactComponent as AshIcon } from '../../img/extreme_weather_icons/ash.svg';
import { ReactComponent as ExtremeColdIcon } from '../../img/extreme_weather_icons/cold.svg';
import { ReactComponent as SmokeIcon } from '../../img/extreme_weather_icons/smoke.svg';

// Extreme Weather Component
function ExtremeCard() {

  const [weatherData, setWeatherData] = useContext(DayContext);

  // Get the current temperature and weather id
  let weather_id = 0;
  let temperature = 0;
  let extreme_array = [null, null];
  let extreme_weather = null;
  let extreme_weather_help = null;

  if (weatherData != null) {
    temperature = Math.round(weatherData.main.temp);
    weather_id = weatherData.weather[0].id;

    extreme_array = getExtremeWeatherIdeals(temperature, weather_id);
    extreme_weather = extreme_array[0];
    extreme_weather_help = extreme_array[1];
  }

  // Set the extreme weather icon based on the extreme weather
  let icon = null;
  if (extreme_weather == "Heatwave") { icon = <HeatwaveIcon />; } else
    if (extreme_weather == "Tornado") { icon = <TornadoIcon />; } else
      if (extreme_weather == "Thunderstorm") { icon = <StormIcon />; } else
        if (extreme_weather == "Snowstorm") { icon = <SnowstormIcon />; } else
          if (extreme_weather == "Dust") { icon = <DustIcon />; } else
            if (extreme_weather == "Ash") { icon = <AshIcon />; } else
              if (extreme_weather == "Extreme Cold") { icon = <ExtremeColdIcon />; } else
                if (extreme_weather == "Smoke") { icon = <SmokeIcon />; }

  if (extreme_weather == "None") {
    return (
      <div class="extreme-nothing">
        <h3>No extreme weather detected nearby.</h3>
      </div>
    )
  }

  // Render the ExtremeCard component with the extreme weather data
  return (
    <div id="extreme-content">
      <div class="extreme-card">
        <div class="extreme-card-content">
          {icon}
          <h3>{extreme_weather}</h3>
        </div>
      </div>
      <div id="extreme-details">
        <h3>{extreme_weather_help}</h3>
      </div>
    </div>
  );
}

const ExtremeWeather = () => {

  return (
    <div id="extreme-weather">
      <h1>Extreme Weather</h1>
      <ExtremeCard />
      <Background />
    </div>
  );
};
export default ExtremeWeather;