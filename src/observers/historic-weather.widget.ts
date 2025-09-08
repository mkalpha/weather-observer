import WeatherStore from "../subject/weather-store.js";

export class HistoricWeatherWidget {
  private store = WeatherStore.getInstance();
  private observer: () => void;
  private element: HTMLElement;

  constructor(elementId: string) {
    this.element = document.getElementById(elementId)!;
    this.observer = this.render.bind(this);
    this.store.subscribe(this.observer);
  }

  render() {
    const weatherData = this.store.weatherData;
    if (!weatherData.length) {
      this.element.innerHTML = "<p>No weather data.</p>";
      return;
    }
    this.element.innerHTML = `<ul>${this.buildList()}</ul>`;
  }

  private buildList(): string {
    return this.store.weatherData
      .reduce((acc, data) => {
        acc.push(
          `<li> ${data.time.split("T")[1]}:  ${data?.temperature}°C - ${
            data?.windspeed
          } </li>`
        );
        return acc;
      }, [] as string[])
      .join("");
  }
}
