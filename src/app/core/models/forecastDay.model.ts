export class ForecastDay {
    date: string;
    averageTemperature: number;

    constructor(date: string, averageTemperature: number) {
        this.date = date;
        this.averageTemperature = averageTemperature;
    }
}