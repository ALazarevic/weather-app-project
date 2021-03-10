import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState, State } from 'src/app/core/store/store.reducers';

@Component({
  selector: 'app-average-temperature',
  templateUrl: './average-temperature.component.html',
  styleUrls: ['./average-temperature.component.scss']
})
export class AverageTemperatureComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public avarageTemp!: number;
  public averageTempForDays!: string;
  public showAverageTemp: boolean = false;
  public nextForecastDay!: string;
  public lastForecastDay!: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('store').subscribe((state: State) => {
      const averageTemps: number[] = state.weather.data?.slice(1).map(weatherForDay => { // skip first item, api returns current day.
        return (
          (weatherForDay.max_temp + weatherForDay.min_temp) / 2
        )
      })

      if (state.weather.data) {
        this.nextForecastDay = state.weather.data[1].datetime;
        this.lastForecastDay = state.weather.data[state.weather.data.length - 1].datetime;
      }

      this.avarageTemp = Math.round(averageTemps?.reduce((a, b) => a + b) / 7);

      this.showAverageTemp = !!state.weather.data;

      if (this.showAverageTemp) {
        const averageMinTemps: number[] = state.weather.data?.slice(1).map(weatherForDay => { // skip first item, api returns current day.
          return weatherForDay.min_temp;
        });

        const averageMin: number = Math.round(averageMinTemps?.reduce((a, b) => a + b) / 7);

        const averageMaxTemps: number[] = state.weather.data?.slice(1).map(weatherForDay => { // skip first item, api returns current day.
          return weatherForDay.max_temp;
        });

        const averageMax: number = Math.round(averageMaxTemps?.reduce((a, b) => a + b) / 7);

        const colorOfMin = 40 + 240 * (40 - averageMin) / 60;
        const colorOfMax = 40 + 240 * (40 - averageMax) / 60;

        document.body.style.backgroundImage = `linear-gradient(to bottom right, ${this.hSLToRGB(colorOfMin)}, ${this.hSLToRGB(colorOfMax)})`;
        document.body.style.backgroundRepeat = 'no-repeat';
      }
    })
  }

  /**
 * Convert hue to rgb.
 * @param h hue numner
 */
  private hSLToRGB(h: number): string {
    const s = 1;
    const l = 0.5;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "rgb(" + r + "," + g + "," + b + ")"
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
