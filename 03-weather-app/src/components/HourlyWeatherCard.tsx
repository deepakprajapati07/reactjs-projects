import styles from "./HourlyWeatherCard.module.css";
import { FaCloudRain, FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

interface Props {
  hourly: {
    raw_time: string[]; // ISO array
    time: string[];     // formatted "12/09/2025"
    temperature: number[];
    is_day: number[];
    wind_speed: number[];
    wind_direction: number[];
    precipitation_probability: number[];
    relative_humidity: number[];
  } | null;
}

const HourlyWeatherCard = ({ hourly }: Props) => {
  if (!hourly) return <p>No hourly data available.</p>;

  // Split into two groups (24 hours each)
  const todayData = Array.from({ length: 24 }, (_, i) => i);
  const tomorrowData = Array.from({ length: 24 }, (_, i) => i + 24);

  const renderCards = (indexes: number[]) =>
    indexes.map((i) => {
      const raw = hourly.raw_time[i];
      const dateObj = new Date(raw);

      // Time (12h format with AM/PM)
      const hour = dateObj.getHours();
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = ((hour + 11) % 12) + 1;

      // Formatted date (from hourly.time[] → "12/09/2025")
      // const displayDate = hourly.time[i];

      const tempIcon =
        hourly.temperature[i] > 30 ? (
          <FaTemperatureHigh size={18} />
        ) : (
          <FaTemperatureLow size={18} />
        );

      return (
        <div key={raw} className={`${styles.hourCard} ${
        hourly.is_day ? styles.day : styles.night
      }`}>
          {/* Show time */}
          <p className={styles.time}>
            {displayHour} {ampm}
          </p>

          {/* Temperature */}
          <p
            className={styles.temp}
            style={{ color: hourly.temperature[i] > 30 ? "#e53935" : "#1e88e5" }}
          >
            {tempIcon} {hourly.temperature[i]}°C
          </p>

          {/* Humidity */}
          <p className={styles.humidity}>
            <WiHumidity size={20} /> {hourly.relative_humidity[i]}%
          </p>

          {/* Precipitation */}
          <p className={styles.precip}>
            <FaCloudRain size={18} /> {hourly.precipitation_probability[i]}%
          </p>

          {/* Wind */}
          <p className={styles.wind}>
            <WiStrongWind size={22} /> {hourly.wind_speed[i]} km/h
          </p>
        </div>
      );
    });

  return (
    <div>
      {/* Today */}
      <h3 className={styles.dayLabel}>Today ({hourly.time[0]})</h3>
      <div className={styles.hourlyScroll}>{renderCards(todayData)}</div>

      {/* Tomorrow */}
      <h3 className={styles.dayLabel}>Tomorrow ({hourly.time[24]})</h3>
      <div className={styles.hourlyScroll}>{renderCards(tomorrowData)}</div>
    </div>
  );
};

export default HourlyWeatherCard;
