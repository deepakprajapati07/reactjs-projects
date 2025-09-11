import { useEffect } from "react";
import { useWeatherStore } from "../store/weatherStore";
import CurrentWeatherCard from "./CurrentWeatherCard";
import HourlyWeatherCard from "./HourlyWeatherCard";
import DailyWeatherCard from "./DailyWeatherCard";
import styles from "./WeatherDashboard.module.css";

const WeatherDashboard = () => {
  const { data, loading, error, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather(25.5941, 85.1356); // Patna
  }, [fetchWeather]);

  useEffect(() => {
    if (data?.current) {
      document.body.classList.toggle("night", data.current.is_day === 0);
    }
  }, [data]);

  if (loading) return <p className={styles.loading}>Loading weather...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.dashboard}>
      <section className={styles.currentWeather}>
        <CurrentWeatherCard current={data.current} />
      </section>

      <section className={styles.hourlySection}>
        <h2>Hourly Forecast</h2>
        <HourlyWeatherCard hourly={data.hourly} />
      </section>

      <section className={styles.dailySection}>
        <h2>Daily Forecast</h2>
        <DailyWeatherCard daily={data.daily} />
      </section>
    </div>
  );
};

export default WeatherDashboard;
