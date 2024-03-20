import React, { useState, useContext, useEffect } from 'react';

// Import the SVGs for the menu icons
import { ReactComponent as MenuIcon } from '../../img/menu_icons/menu.svg';
import { ReactComponent as RunIcon } from '../../img/menu_icons/directions_run.svg';
import { ReactComponent as PollutionIcon } from '../../img/menu_icons/Pollution 1.svg';
import { ReactComponent as WindIcon } from '../../img/menu_icons/Wind 1.svg';
import { ReactComponent as CloudIcon } from '../../img/menu_icons/cloud.svg';

// Import all React Contexts as they are set in the header
import { DayContext, WeekContext, PageContext, CityContext } from '../../App';
import { getExtremeWeatherIdeals } from '../ExtremeWeatherHelper';
import axios from 'axios';

// Tooltip component for the menu icons
function Tooltip({ text }) {
  return (
    <p class="tooltip">
      {text}
    </p>
  );
}

// Navigation component for the header
function Nav() {

  // Get the current page, weather data and if the extreme weather page is disabled
  const [page, setPage] = useContext(PageContext);
  const [weatherData, setWeatherData] = useContext(DayContext);
  const [isDisabled, setIsDisabled] = useState("none");

  // If the weather data is available, check if the extreme weather page should be disabled
  useEffect(() => {
    if (weatherData != null) {
      let isDisabled = getExtremeWeatherIdeals(
        Math.round(weatherData.main.temp),
        weatherData.weather[0].id)[0] == "None" ? "disabled" : "none";
      setIsDisabled(isDisabled);
    }
  }, [weatherData]);


  // Pollution page has unimplemented stying so it can be easily implemented later
  return (
    <nav>
      <div id="selected" class={page}></div>
      <ul>
        <li><a onClick={() => setPage("dashboard-page")}><MenuIcon /></a><Tooltip text="Dashboard" /></li>
        <li><a onClick={() => setPage("activities-page")}><RunIcon /></a><Tooltip text="Activities" /></li>
        <li><a onClick={() => setPage("weather-page")}><CloudIcon /></a><Tooltip text="Weather" /></li>
        <li><a className={isDisabled} onClick={() => setPage("extreme-weather-page")}><WindIcon /></a><Tooltip text="Extreme Weather" /></li>
        <li><a className='unimplemented'><PollutionIcon /></a></li>
      </ul>
    </nav>
  );
}

// Title component for the header
function Title() {

  // Get the current city and weather data
  const [city, setCity] = useContext(CityContext);
  const [weatherData, setWeatherData] = useContext(DayContext);
  const [weekData, setWeekData] = useContext(WeekContext);
  const [isLoading, setIsLoading] = useState('loading');

  // Fetch the weather data for the current city
  const fetchData = async () => {

    // Set the loading state of the search button to loading
    setIsLoading('loading');

    // Fetch the current weather data
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=717fad74b9058562c326494dcbd56f58`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }

    // Fetch the week weather data
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metric&appid=717fad74b9058562c326494dcbd56f58`
      );
      setWeekData(response.data);
    } catch (error) {
      console.error(error);
    }

    // Set the loading state of the search button to not loading
    setIsLoading(null);
  };

  // Fetch the weather data for the current city on page load
  useEffect(() => {
    fetchData();
  }, []);

  // Handle the input change for the city search
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // Handle the form submit for the city search
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  // Render the title component with the city search form
  return (
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
  );
}

// Header component for the page
const Header = () => {
  return (
    <header>
      <Nav />
      <Title />
      <div id="space"></div>
    </header>
  );
};
export default Header;