import { DailyForecast } from "./dailyForecast.model";

export interface WeatherForecast { // TODO - this model needs filtering (needs removing unused properties).
    timezone: string,
    timezone_offset: number,
    lat: number,
    lon: number,
    daily: DailyForecast[];
}
