import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "26cb7fc6160a454fbc262122262502";
  const BASE_URL = "https://api.weatherapi.com/v1/history.json";

  const getWeather = () => {
    if (!city || !date) {
      setError("Please enter both city and date");
      return;
    }

    setError("");
    setWeather(null);

    fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&dt=${date}`)
      .then((res) => {
        if (!res.ok) throw new Error("City not found or API error");
        return res.json();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="container">
      <h2>Weather Data</h2>

      <div className="box">
        <input
          type="text"
          placeholder="Enter city (e.g., Delhi)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Date</th>
              <th>Max Temp (°C)</th>
              <th>Min Temp (°C)</th>
              <th>Avg Humidity (%)</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{weather.location.name}</td>
              <td>{weather.forecast.forecastday[0].date}</td>
              <td>{weather.forecast.forecastday[0].day.maxtemp_c}</td>
              <td>{weather.forecast.forecastday[0].day.mintemp_c}</td>
              <td>{weather.forecast.forecastday[0].day.avghumidity}</td>
              <td>{weather.forecast.forecastday[0].day.condition.text}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;