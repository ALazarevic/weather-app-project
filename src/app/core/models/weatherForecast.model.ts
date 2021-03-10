import { DailyForecast } from "./dailyForecast.model";

export interface WeatherForecast { // TODO - this model needs filtering (needs removing unused properties).
    city_name: string,
    country_code: string,
    data: DailyForecast[],
    lat: number
    lon: number
    state_code: string
    timezone: string
}
