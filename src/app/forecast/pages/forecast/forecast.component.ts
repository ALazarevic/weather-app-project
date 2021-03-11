import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState, State } from 'src/app/core/store/store.reducers';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html'
})
export class ForecastComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public showAverageTemp: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('store').subscribe((state: State) => {
      this.showAverageTemp = !!state.weather.data;
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
