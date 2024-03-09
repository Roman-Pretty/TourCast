import './css/App.css';
import React, {useState} from 'react';
import Header from './Header';
import Dashboard from './Dashboard';

export const Context = React.createContext();

const App = () => {

  const [weatherData, setWeatherData] = useState(null);
  return (
    <Context.Provider value={[weatherData, setWeatherData]}>
      <Header />
      <Dashboard weatherData={weatherData}/>
    </Context.Provider>
  );
};
export default App;
