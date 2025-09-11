import styles from "./CurrentWeatherCard.module.css";
import { FaCloudRain, FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { WiStrongWind } from "react-icons/wi";

interface CurrentWeather {
  temperature: number;
  is_day: number;
  wind_speed: number;
  wind_direction: number;
  precipitation_probability: number | null;
}

interface Props {
  current: CurrentWeather | null;
}

// 🔧 Utility: convert wind direction in degrees → compass direction
function getWindDirection(deg: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

const CurrentWeatherCard = ({ current }: Props) => {
  if (!current) return <p>No current data available.</p>;

  const tempIcon =
    current.temperature > 35 ? <FaTemperatureHigh /> : <FaTemperatureLow />;

  return (
    <div
      className={`${styles.currentWeather} ${
        current.is_day ? styles.day : styles.night
      }`}
    >
      <h2>Current Weather</h2>
      <h3
        className={`${styles.temp} ${
          current.temperature > 35 ? styles.hot : styles.cool
        }`}
      >
        {tempIcon} {current.temperature}°C
      </h3>

      <p>
        <strong><WiStrongWind size={22} />Wind:</strong> {current.wind_speed} km/h (
        {getWindDirection(current.wind_direction)})
      </p>

      <p>
        <FaCloudRain size={20} aria-hidden="true" />{" "}
        <strong>Rain Chance:</strong>{" "}
        {current.precipitation_probability !== null
          ? `${current.precipitation_probability}%`
          : "No data"}
      </p>
    </div>

  );
};

export default CurrentWeatherCard;
