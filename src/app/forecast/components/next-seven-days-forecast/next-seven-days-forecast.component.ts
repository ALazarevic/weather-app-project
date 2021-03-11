import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DailyForecast } from 'src/app/core/models/dailyForecast.model';
import { ForecastDay } from 'src/app/core/models/forecastDay.model';
import { AppState, State } from 'src/app/core/store/store.reducers';

@Component({
  selector: 'app-next-seven-days-forecast',
  templateUrl: './next-seven-days-forecast.component.html'
})
export class NextSevenDaysForecastComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public dailyForecast!: DailyForecast[];
  public forecastedDays!: ForecastDay[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('store').subscribe((state: State) => {
      this.dailyForecast = state.weather.data;

      this.dailyForecast = this.dailyForecast?.slice(1, 8); // Take forecast for next 7 days.

      this.forecastedDays = this.dailyForecast?.map(day => {
        const convertedDate = day.datetime;
        const averageTemperature = Math.floor((day.max_temp + day.min_temp) / 2);

        return new ForecastDay(convertedDate, averageTemperature);
      })
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
