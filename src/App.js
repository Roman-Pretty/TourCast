import './css/App.css';
import React from 'react';
import Weather from './Weather';

function Nav() {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/weather">Weather</a></li>
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
