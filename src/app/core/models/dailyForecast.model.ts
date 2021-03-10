// import { DailyTemperature } from "./dailyTemperature.model";

export interface DailyForecast { // TODO - this model needs filtering (needs removing unused properties).
    clouds: number,
    dew_point: number,
    dt: number,
    feels_like: object,
    humidity: number,
    pop: number,
    pressure: number,
    sunrise: number,
    sunset: number,
    // temp: DailyTemperature,
    uvi: number,
    weather: object,
    wind_deg: number,
    wind_speed: number
}