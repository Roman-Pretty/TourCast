// This hook is used to get the window dimensions of the browser window.
// This is used to determine the size of the screen and adjust the layout of the website accordingly.
//
// This is included to switch to the mobile implementation when required

// useWindowDimensions hook created by https://stackoverflow.com/users/4484822/qop

import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}