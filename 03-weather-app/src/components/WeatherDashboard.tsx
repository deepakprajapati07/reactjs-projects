import { useEffect } from "react";
import { useWeatherStore } from "../store/weatherStore";

const WeatherDashboard = () => {
  const { data, loading, error, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather(25.5941, 85.1356); // Patna
  }, [fetchWeather]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Current Weather</h2>
      {data.current && (
        <p>
          Temp: {data.current.temperature}°C | Wind: {data.current.wind_speed} km/h
        </p>
      )}
    </div>
  );
};

export default WeatherDashboard;
