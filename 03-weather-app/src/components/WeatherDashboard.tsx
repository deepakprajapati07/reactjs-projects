import { useEffect, useState } from "react";
import { useWeatherStore } from "../store/weatherStore";
import CurrentWeatherCard from "./CurrentWeatherCard";
import HourlyWeatherCard from "./HourlyWeatherCard";
import DailyWeatherCard from "./DailyWeatherCard";
import styles from "./WeatherDashboard.module.css";

const WeatherDashboard = () => {
  const { data, loading, error, fetchWeather } = useWeatherStore();
  const [activeTab, setActiveTab] = useState<"hourly" | "daily" | null>(null);

  useEffect(() => {
    fetchWeather(25.5941, 85.1356); // Patna
  }, [fetchWeather]);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.dashboard}>
      <section className={styles.currentWeather}>
        <h2>Current Weather</h2>
        <CurrentWeatherCard current={data.current} />
      </section>

      <section className={styles.otherTab}>
        <div className={styles.tabButtons}>
          <button
            className={activeTab === "hourly" ? styles.activeBtn : ""}
            onClick={() => setActiveTab("hourly")}
          >
            Hourly Forecast
          </button>
          <button
            className={activeTab === "daily" ? styles.activeBtn : ""}
            onClick={() => setActiveTab("daily")}
          >
            Daily Forecast
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "hourly" && <HourlyWeatherCard hourly={data.hourly} />}
          {activeTab === "daily" && <DailyWeatherCard daily={data.daily} />}
          {!activeTab && <p>Select a tab above</p>}
        </div>
      </section>
    </div>
  );
};

export default WeatherDashboard;
