import './css/App.css';
import React from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import Weather from './Weather';

const App = () => {
  return (
    <div>
      <Header />
      <Dashboard />
    </div>
  );
};
export default App;
