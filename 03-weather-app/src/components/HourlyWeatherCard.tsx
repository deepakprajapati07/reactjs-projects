// import "./WeatherCards.css";

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
    <div className="hourly-scroll">
      {hourly.time.slice(0, 6).map((t, i) => (
        <div key={t} className="card small">
          <p className="hour">{new Date(t).getHours()}:00</p>
          <p>{hourly.temperature[i]}°C</p>
          <p>{hourly.relative_humidity[i]}%</p>
          <p>{hourly.precipitation_probability[i]}%</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyWeatherCard;
