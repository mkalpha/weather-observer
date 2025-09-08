import { WeatherApiResponse } from "../types/open-metro.types";

// impliments the WeatherStore subject as a singleton

type Observer = () => void;

export default class WeatherStore {
  private static instance: WeatherStore;
  private observers: Observer[] = [];
  public weatherData: WeatherApiResponse["current_weather"][] = [];

  private constructor() {}

  public static getInstance(): WeatherStore {
    if (!WeatherStore.instance) {
      WeatherStore.instance = new WeatherStore();
    }
    return WeatherStore.instance;
  }

  public subscribe(observer: () => void): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: () => void): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  public setWeatherData(data: WeatherApiResponse): void {
    this.weatherData.push(data.current_weather);
    this.notifyObservers();
  }

  private notifyObservers(): void {
    this.observers.forEach((obs) => obs());
  }
}
