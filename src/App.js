import './css/App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/pages/Header';
import Dashboard from './components/pages/Dashboard';
import Activities from './components/pages/Activities';
import useWindowDimensions from './components/WindowDimensions';
import Mobile from './components/pages/Mobile';
import ExtremeWeather from './components/pages/ExtremeWeather';
import Weather from './components/pages/Weather';

export const DayContext = React.createContext();
export const WeekContext = React.createContext();
export const PageContext = React.createContext();
export const CityContext = React.createContext();

const App = () => {

  const [page, setPage] = useState('dashboard-page');
  const [pageComponent, setPageComponent] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weekData, setWeekData] = useState(null);
  const [city, setCity] = useState('London');
  const {height, width } = useWindowDimensions();

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
