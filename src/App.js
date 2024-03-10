import './css/App.css';
import React, {useState} from 'react';
import Header from './Header';
import Dashboard from './Dashboard';

export const DayContext = React.createContext();
export const WeekContext = React.createContext();
export const PageContext = React.createContext();

const App = () => {

  const [page, setPage] = useState('dashboard-page');
  const [weatherData, setWeatherData] = useState(null);
  const [weekData, setWeekData] = useState(null);

  let pageComponent = null;

  if (page == 'dashboard-page') {
    pageComponent = <Dashboard weatherData={weatherData} weekData={weekData} />;
  }

  return (
    <PageContext.Provider value={[page, setPage]}>
      <DayContext.Provider value={[weatherData, setWeatherData]}>
        <WeekContext.Provider value={[weekData, setWeekData]}>
          <Header />
          {pageComponent}
        </WeekContext.Provider>
      </DayContext.Provider>
    </PageContext.Provider>
  );
};
export default App;
