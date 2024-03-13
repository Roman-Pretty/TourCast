import '../css/App.css';
import React, { useState } from 'react';
import { ReactComponent as Background } from '../img/bg-mobile.svg';

const Mobile = () => {
  return (
    <div id='mobile'>

      <Background />
      <footer>
        <a href='#'>
          <svg xmlns="http://www.w3.org/2000/svg" width="78" height="6" viewBox="0 0 78 6" fill="none">
            <path d="M3.10254 3L74.8974 3.00001" stroke="url(#paint0_linear_59_2057)" stroke-width="6" stroke-linecap="round" />
            <defs>
              <linearGradient id="paint0_linear_59_2057" x1="39" y1="3" x2="39" y2="4" gradientUnits="userSpaceOnUse">
                <stop stop-color="#07FFFF" />
                <stop stop-color="#4CE0E0" />
              </linearGradient>
            </defs>
          </svg>
        </a>
      </footer>
    </div>
  );
};
export default Mobile;
