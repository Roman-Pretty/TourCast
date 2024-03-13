import './css/App.css';
import React, {useEffect, useState} from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import Activities from './Activities';
import useWindowDimensions from './WindowDimensions';
import Mobile from './Mobile';

export const DayContext = React.createContext();
export const WeekContext = React.createContext();
export const PageContext = React.createContext();

const App = () => {

  const [page, setPage] = useState('dashboard-page');
  const [pageComponent, setPageComponent] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weekData, setWeekData] = useState(null);
  const { height, width } = useWindowDimensions();
  
  useEffect(() => {
    if (width <= 768) {
      setPageComponent(<Mobile />);
    } else if (page == 'dashboard-page') {
      setPageComponent( <Dashboard />);
    } else if (page == 'activities-page') {
      setPageComponent(<Activities />);
    }
  },[width, page]);

  

  return (
    <PageContext.Provider value={[page, setPage]}>
      <DayContext.Provider value={[weatherData, setWeatherData]}>
        <WeekContext.Provider value={[weekData, setWeekData]}>
          {width > 768 ? <Header /> : null}
          {pageComponent}
        </WeekContext.Provider>
      </DayContext.Provider>
    </PageContext.Provider>
  );
};
export default App;
