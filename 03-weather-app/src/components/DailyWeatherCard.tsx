// import "./WeatherCards.css";

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
    <div className="daily-grid">
      {daily.time.slice(0, 5).map((day, i) => (
        <div key={day} className="card">
          <p className="day">{new Date(day).toDateString()}</p>
          <p>Max: {daily.max_temp[i]}°C</p>
          <p>Min: {daily.min_temp[i]}°C</p>
          <p>Rain Hours: {daily.precipitation_hours[i]}h</p>
          <p>{new Date(daily.sunrise[i]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
          <p>{new Date(daily.sunset[i]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
      ))}
    </div>
  );
};

export default DailyWeatherCard;
