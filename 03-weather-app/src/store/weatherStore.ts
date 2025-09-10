import { create } from "zustand";

interface WeatherData {
  current: {
    temperature: number;
    is_day: number;
    wind_speed: number;
    wind_direction: number;
    precipitation_probability: number | null;
  } | null;
  hourly: {
    time: string[];
    temperature: number[];
    is_day: number[];
    wind_speed: number[];
    wind_direction: number[];
    precipitation_probability: number[];
    relative_humidity: number[];
  } | null;
  daily: {
    time: string[];
    max_temp: number[];
    min_temp: number[];
    precipitation_hours: number[];
    sunrise: string[];
    sunset: string[];
  } | null;
}

interface WeatherStore {
  data: WeatherData;
  loading: boolean;
  error: string | null;
  fetchWeather: (lat: number, lon: number) => Promise<void>;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  data: { current: null, hourly: null, daily: null },
  loading: false,
  error: null,

  fetchWeather: async (lat, lon) => {
    set({ loading: true, error: null });
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,is_day,wind_speed_10m,precipitation_probability,wind_direction_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_hours,sunrise,sunset&timezone=auto`;

      const res = await fetch(url);
      const raw = await res.json();

      // Clean & map data
      const cleaned: WeatherData = {
        current: raw.current
          ? {
              temperature: raw.current.temperature_2m,
              is_day: raw.current.is_day,
              wind_speed: raw.current.wind_speed_10m,
              wind_direction: raw.current.wind_direction_10m,
              precipitation_probability: raw.hourly?.precipitation_probability?.[0] ?? null, // since not in current
            }
          : null,
        hourly: raw.hourly
          ? {
              time: raw.hourly.time,
              temperature: raw.hourly.temperature_2m,
              is_day: raw.hourly.is_day,
              wind_speed: raw.hourly.wind_speed_10m,
              wind_direction: raw.hourly.wind_direction_10m,
              precipitation_probability: raw.hourly.precipitation_probability,
              relative_humidity: raw.hourly.relative_humidity_2m,
            }
          : null,
        daily: raw.daily
          ? {
              time: raw.daily.time,
              max_temp: raw.daily.temperature_2m_max,
              min_temp: raw.daily.temperature_2m_min,
              precipitation_hours: raw.daily.precipitation_hours,
              sunrise: raw.daily.sunrise,
              sunset: raw.daily.sunset,
            }
          : null,
      };

      set({ data: cleaned, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch weather data", loading: false });
      console.log(err);
    }
  },
}));
