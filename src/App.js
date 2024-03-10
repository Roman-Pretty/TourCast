import './css/App.css';
import React, {useState} from 'react';
import Header from './Header';
import Dashboard from './Dashboard';

export const Context = React.createContext();
export const WeekContext = React.createContext();

const App = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [weekData, setWeekData] = useState(null);
  return (
    <Context.Provider value={[weatherData, setWeatherData]}>
      <WeekContext.Provider value={[weekData, setWeekData]}>
        <Header />
        <Dashboard weatherData={weatherData} weekData={weekData} />
      </WeekContext.Provider>
    </Context.Provider>
  );
};
export default App;
