import React, {useState, useContext, useEffect} from 'react';
import { ReactComponent as MenuIcon } from './img/menu_icons/menu.svg';
import { ReactComponent as RunIcon } from './img/menu_icons/directions_run.svg';
import { ReactComponent as PollutionIcon } from './img/menu_icons/Pollution 1.svg';
import { ReactComponent as WindIcon } from './img/menu_icons/Wind 1.svg';
import { ReactComponent as CloudIcon } from './img/menu_icons/cloud.svg';
import { DayContext, WeekContext, PageContext } from './App';
import axios from 'axios';

function Tooltip({text}) {
    return (
      <p class="tooltip">
        {text}
      </p>
    );
}

function Nav() {

  const [page, setPage] = useContext(PageContext);

    return (
      <nav>
        <div id="selected" class={page}></div>
        <ul>
          <li><a onClick={() => setPage("dashboard-page")}><MenuIcon /></a><Tooltip text="Dashboard" /></li>
          <li><a onClick={() => setPage("activities-page")}><RunIcon /></a><Tooltip text="Activities" /></li>
          <li><a onClick={() => setPage("weather-page")}><CloudIcon /></a><Tooltip text="Weather" /></li>
          <li><a onClick={() => setPage("wind-page")}><WindIcon /></a><Tooltip text="Wind" /></li>
          <li><a onClick={() => setPage("pollution-page")}><PollutionIcon /></a><Tooltip text="Pollution" /></li>
        </ul>
      </nav>
    );
  }
  
  function Title() {

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useContext(DayContext);
    const [weekData, setWeekData] = useContext(WeekContext);
    const fetchData = async (selectedCity) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=717fad74b9058562c326494dcbd56f58`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast/?q=${selectedCity}&units=metric&appid=717fad74b9058562c326494dcbd56f58`
        );
        setWeekData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      if (city) {
        fetchData(city);
      } else {
        //TODO: Save default city in local storage
        fetchData('London');
      }
    }, [city]);
    const handleSubmit = (e) => {
      const selectedCity = e.target.value;
      setCity(selectedCity);
      e.preventDefault();
    };

    return (
      <form id="form">
      <select id="dropdown" value={city} onChange={handleSubmit}>
        <optgroup label="UK">
          <option value="london">London</option>
          <option value="birmingham">Birmingham</option>
          <option value="bristol">Bristol</option>
          <option value="edinburgh">Edinburgh</option>
          <option value="glasgow">Glasgow</option>
          <option value="leeds">Leeds</option>
          <option value="liverpool">Liverpool</option>
          <option value="manchester">Manchester</option>
          <option value="newcastle">Newcastle</option>
          <option value="nottingham">Nottingham</option>
          <option value="norwich">Norwich</option>
        </optgroup>
        <optgroup label="USA">
          <option value="atlanta">Atlanta</option>
          <option value="austin">Austin</option>
          <option value="boston">Boston</option>
          <option value="chicago">Chicago</option>
          <option value="dallas">Dallas</option>
          <option value="denver">Denver</option>
          <option value="houston">Houston</option>
          <option value="las vegas">Las Vegas</option>
          <option value="los angeles">Los Angeles</option>
          <option value="miami">Miami</option>
          <option value="new york">New York</option>
          <option value="orlando">Orlando</option>
          <option value="philadelphia">Philadelphia</option>
          <option value="phoenix">Phoenix</option>
          <option value="san antonio">San Antonio</option>
          <option value="san diego">San Diego</option>
          <option value="san francisco">San Francisco</option>
          <option value="san jose">San Jose</option>
          <option value="seattle">Seattle</option>
          <option value="washington">Washington</option>
        </optgroup>
        <optgroup label="Other Countries">
          <option value="mexico city">Mexico City</option>
          <option value="rome">Rome</option>
        </optgroup>
      </select>
      </form>
    );
    }
  
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