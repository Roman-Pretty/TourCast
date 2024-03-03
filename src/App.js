import './css/App.css';
import React from 'react';
import Weather from './Weather';
import { ReactComponent as MenuIcon } from './img/menu_icons/menu.svg';
import { ReactComponent as RunIcon } from './img/menu_icons/directions_run.svg';
import { ReactComponent as PollutionIcon } from './img/menu_icons/Pollution 1.svg';
import { ReactComponent as WindIcon } from './img/menu_icons/Wind 1.svg';
import { ReactComponent as CloudIcon } from './img/menu_icons/cloud.svg';
import { ReactComponent as DownIcon } from './img/menu_icons/chevron-bottom.svg';

function Nav() {
  return (
    <nav>
      <div id="selected"></div>
      <ul>
        <li><a href="#dashboard"><MenuIcon /></a></li>
        <li><a href="#activities"><RunIcon /></a></li>
        <li><a href="#weather"><CloudIcon /></a></li>
        <li><a href="#wind"><WindIcon /></a></li>
        <li><a href="#pollution"><PollutionIcon /></a></li>
      </ul>
    </nav>
  );
}

function Title() {
  return (
    <select>
      <option value="london" selected>London</option>
      <option value="newyork">New York</option>
      <option value="losangeles">Los Angeles</option>
      <option value="chicago">Chicago</option>
      <option value="miami">Miami</option>
      <option value="sanfrancisco">San Francisco</option>
    </select>
  );
}

function Header() {
  return (
    <header>
      <Nav />
      <Title />
      <div id="space"></div>
    </header>
  );

}

const App = () => {
  return (
    <div>
      <Header />
      <h1>Weather Forecast App</h1>
      <Weather />
    </div>
  );
};
export default App;
