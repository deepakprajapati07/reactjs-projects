import styles from "./HourlyWeatherCard.module.css";
import { FaCloudRain, FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

interface Props {
  hourly: {
    time: string[];
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

  return (
    <div className={styles.hourlyScroll}>
      {hourly.time.slice(0, 24).map((t, i) => {
        const hour = new Date(t).getHours();
        const ampm = hour >= 12 ? "PM" : "AM";
        const displayHour = ((hour + 11) % 12) + 1;

        const tempIcon =
          hourly.temperature[i] > 35 ? (
            <FaTemperatureHigh size={18} />
          ) : (
            <FaTemperatureLow size={18} />
          );

        return (
          <div key={t} className={styles.hourCard}>
            <p className={styles.time}>
              {displayHour} {ampm}
            </p>

            <p className={styles.temp}>
              {tempIcon} {hourly.temperature[i]}°C
            </p>

            <p className={styles.humidity}>
              <WiHumidity size={20} /> {hourly.relative_humidity[i]}%
            </p>

            <p className={styles.precip}>
              <FaCloudRain size={18} /> {hourly.precipitation_probability[i]}%
            </p>

            <p className={styles.wind}>
              <WiStrongWind size={22} /> {hourly.wind_speed[i]} km/h
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyWeatherCard;
