import React, { useState } from 'react';
import './LocationInput.css';

const LocationInput = ({ onLocationSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLocationSubmit(input);
  };

  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        onLocationSubmit({ lat: position.coords.latitude, lon: position.coords.longitude });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="location-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter address, city name, or zip code"
      />
      <button type="submit">Get Weather</button>
      <button type="button" onClick={handleGeoLocation}>Use Current Location</button>
    </form>
  );
};

export default LocationInput;