import WeatherStore from "../subject/weather-store.js";

export class CurrentWeatherWidget {
  private store = WeatherStore.getInstance();
  private observer: () => void;
  private element: HTMLElement;

  constructor(elementId: string) {
    this.element = document.getElementById(elementId)!;
    this.observer = this.render.bind(this);
    this.store.subscribe(this.observer);
  }

  render() {
    console.log(" this.element :", this.element);
    console.log("this.store :", this.store);
    const weatherData = this.store.weatherData;
    if (!weatherData.length) {
      this.element.innerHTML = "<p>No weather data.</p>";
      return;
    }
    const currentWeatherdata = weatherData.at(-1);
    this.element.innerHTML = `
      <h2>${currentWeatherdata?.temperature}°C</h2>
      <p>${currentWeatherdata?.windspeed}</p>
    `;
    return;
  }
}
