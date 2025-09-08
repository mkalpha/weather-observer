export class WeatherFetcher {
  private BASE_URL: string;
  constructor() {
    this.BASE_URL = `https://api.open-meteo.com/v1`;
  }

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.BASE_URL}/${path}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  }
}
