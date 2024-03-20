/**
 * Navigating this project:
 * 
 * For the main page components, navigate to the components/pages folder. The mobile page
 * can be viewed by setting the viewport width to less than 768px. The main page components
 * are the Dashboard, Activities, ExtremeWeather, and Weather components.
 * 
 * For other components, navigate to the components folder. The Header, Mobile, WeatherItem,
 * and WeatherIcon components are located here.
 * 
 * Finally, for styling, please refer to the css folder. The style.scss file contains the main
 * styling and the reset.css contains reset styles for the website.
 * 
 * Please note that the styles are done in SCSS. You can also view styles.css for the compiled
 * CSS if prefered, however SCSS is more readible in this application.
 */

import './css/App.css';
import React, { useEffect, useState } from 'react';

// Import Pages and Hooks
import Header from './components/pages/Header';
import Dashboard from './components/pages/Dashboard';
import Activities from './components/pages/Activities';
import useWindowDimensions from './components/WindowDimensions';
import Mobile from './components/pages/Mobile';
import ExtremeWeather from './components/pages/ExtremeWeather';
import Weather from './components/pages/Weather';

// Create Contexts
export const DayContext = React.createContext();
export const WeekContext = React.createContext();
export const PageContext = React.createContext();
export const CityContext = React.createContext();

const App = () => {

  // Set the default page to the dashboard and define contexts as null
  const [page, setPage] = useState('dashboard-page');
  const [pageComponent, setPageComponent] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weekData, setWeekData] = useState(null);
  const [city, setCity] = useState('London');
  const {height, width } = useWindowDimensions();

  // Set the page component based on the width of the screen and the current page
  useEffect(() => {
    if (width <= 768) {
      setPageComponent(<Mobile />);
    } else if (page === 'dashboard-page') {
      setPageComponent(<Dashboard />);
    } else if (page === 'activities-page') {
      setPageComponent(<Activities />);
    } else if (page === 'extreme-weather-page') {
      setPageComponent(<ExtremeWeather />);
    } else if (page === 'weather-page') {
      setPageComponent(<Weather />);
    } else {
      setPageComponent(null);
    }
  }, [width, page]);


  // Return the page context providers with the page component
  return (
    <PageContext.Provider value={[page, setPage]}>
      <DayContext.Provider value={[weatherData, setWeatherData]}>
        <WeekContext.Provider value={[weekData, setWeekData]}>
          <CityContext.Provider value={[city, setCity]}>
            {width > 768 ? <Header /> : null}
            {pageComponent}
          </CityContext.Provider>
        </WeekContext.Provider>
      </DayContext.Provider>
    </PageContext.Provider>
  );
};
export default App;
