import styles from "./DailyWeatherCards.module.css";
import { FaSun, FaMoon, FaCloudRain, FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";

interface Props {
  daily: {
    time: string[];
    max_temp: number[];
    min_temp: number[];
    precipitation_hours: number[];
    sunrise: string[];
    sunset: string[];
  } | null;
}

const DailyWeatherCard = ({ daily }: Props) => {
  if (!daily) return <p>No daily data available.</p>;

  return (
    <div className={styles.dailyGrid}>
      {daily.time.slice(0, 7).map((day, i) => {
        const date = new Date(day);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
        const sunrise = new Date(daily.sunrise[i]).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const sunset = new Date(daily.sunset[i]).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div key={day} className={styles.card}>
            <p className={styles.day}>{weekday}</p>

            <div className={styles.temps}>
              <p className={styles.max}>
                <FaTemperatureHigh /> {daily.max_temp[i]}°C
              </p>
              <p className={styles.min}>
                <FaTemperatureLow /> {daily.min_temp[i]}°C
              </p>
            </div>

            <p className={styles.rain}>
              <FaCloudRain /> {daily.precipitation_hours[i]}h
            </p>

            <div className={styles.sunTimes}>
              <p>
                <FaSun /> {sunrise}
              </p>
              <p>
                <FaMoon /> {sunset}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyWeatherCard;
