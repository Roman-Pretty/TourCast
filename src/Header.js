import React, {useState, useContext, useEffect} from 'react';
import { ReactComponent as MenuIcon } from './img/menu_icons/menu.svg';
import { ReactComponent as RunIcon } from './img/menu_icons/directions_run.svg';
import { ReactComponent as PollutionIcon } from './img/menu_icons/Pollution 1.svg';
import { ReactComponent as WindIcon } from './img/menu_icons/Wind 1.svg';
import { ReactComponent as CloudIcon } from './img/menu_icons/cloud.svg';
import { Context } from './App';
import axios from 'axios';

function Tooltip({text}) {
    return (
      <p class="tooltip">
        {text}
      </p>
    );
}

function Nav() {
    return (
      <nav>
        <div id="selected"></div>
        <ul>
          <li><a href="#dashboard"><MenuIcon /></a><Tooltip text="Dashboard" /></li>
          <li><a href="#activities"><RunIcon /></a><Tooltip text="Activities" /></li>
          <li><a href="#weather"><CloudIcon /></a><Tooltip text="Weather" /></li>
          <li><a href="#wind"><WindIcon /></a><Tooltip text="Wind" /></li>
          <li><a href="#pollution"><PollutionIcon /></a><Tooltip text="Pollution" /></li>
        </ul>
      </nav>
    );
  }
  
  function Title() {

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useContext(Context);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=717fad74b9058562c326494dcbd56f58`
            );
            setWeatherData(response.data);
            console.log(response.data); //You can see all the weather data in console log
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
      fetchData();
  }, []);
  const handleSubmit = (e) => {
      const selectedCity = e.target.value;
      setCity(selectedCity);
      e.preventDefault();
      fetchData();
  };

    return (
      <form id="form" onSubmit={handleSubmit}>
        <select id="dropdown" value={city} onChange={() => document.getElementById("form").submit()}>
          <option value="london">London</option>
          <option value="newyork">New York</option>
          <option value="losangeles">Los Angeles</option>
          <option value="chicago">Chicago</option>
          <option value="miami">Miami</option>
          <option value="sanfrancisco">San Francisco</option>
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