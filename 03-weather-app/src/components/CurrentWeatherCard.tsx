// import "./WeatherCards.css";

interface Props {
  current: {
    temperature: number;
    is_day: number;
    wind_speed: number;
    wind_direction: number;
    precipitation_probability: number | null;
  } | null;
}

const CurrentWeatherCard = ({ current }: Props) => {
  if (!current) return <p>No current data available.</p>;

  const cardClass = current.is_day ? "card day" : "card night";

  return (
    <div className={cardClass}>
      <p className="temp">{current.temperature}°C</p>
      <p>Wind: {current.wind_speed} km/h ({current.wind_direction}°)</p>
      <p>Rain Chance: {current.precipitation_probability ?? "—"}%</p>
    </div>
  );
};

export default CurrentWeatherCard;
