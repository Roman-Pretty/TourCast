import './css/App.css';
import React from 'react';

import { ReactComponent as Background } from './img/bg-blur.svg';


const Dashboard = ({weatherData, weekData}) => {
    return (
      <div class="content">
        <div id="activities">
          <Background />
        </div>    
      </div>  
    );
  };
  export default Dashboard;