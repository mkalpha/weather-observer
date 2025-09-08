import { WeatherFetcher } from "../libs/fetch.js";
import WeatherStore from "../subject/weather-store.js";
import { WeatherApiResponse } from "../types/open-metro.types.js";

export const getWeatherDataHandler = async (
  latitude: string,
  longitude: string
) => {
  console.log("Fetching weather ...");
  const weatherFetcher = new WeatherFetcher();
  const weatherData = await weatherFetcher.get<WeatherApiResponse>(
    `forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );

  console.log("Got weatherData :", weatherData);
  const store = WeatherStore.getInstance();
  store.setWeatherData(weatherData);
};
