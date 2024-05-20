import React, { useState } from 'react';
import LocationInput from '../LocationInput/LocationInput';
import Weather from '../Weather/Weather';
import News from '../News/News';
import './App.css';

const App = () => {
  const [location, setLocation] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleLocationSubmit = (location) => {
    setLocation(location);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="App-header">
        <h1>Weather and News App</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>
      <LocationInput onLocationSubmit={handleLocationSubmit} />
      {location && <Weather location={location} />}
      <News />
    </div>
  );
};

export default App;