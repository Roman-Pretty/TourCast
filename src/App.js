import './css/App.css';
import React from 'react';
import Weather from './Weather';
import {ReactComponent as MenuIcon} from './img/menu_icons/menu.svg';
import {ReactComponent as RunIcon} from './img/menu_icons/directions_run.svg';
import {ReactComponent as PollutionIcon} from './img/menu_icons/Pollution 1.svg';
import {ReactComponent as WindIcon} from './img/menu_icons/Wind 1.svg';
import {ReactComponent as CloudIcon} from './img/menu_icons/cloud.svg';

function Nav() {
  return (
    <nav>
      <ul>
      <li><a href="/"><MenuIcon /></a></li>
      <li><a href="/"><RunIcon /></a></li>
      <li><a href="/"><CloudIcon /></a></li>
        <li><a href="/"><WindIcon /></a></li>
        <li><a href="/weather"><PollutionIcon /></a></li>
      </ul>
    </nav>
  );

}

function Header() {
  return (
    <header>
      <Nav />
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
