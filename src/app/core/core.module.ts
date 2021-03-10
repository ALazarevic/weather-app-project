import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './services/location/location.service';
import { WeatherService } from './services/weather/weather.service';
import { StoreModule } from '@ngrx/store';
import { storeReducers } from './store/store.reducers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({ store: storeReducers })
  ],
  providers: [
    LocationService,
    WeatherService
  ]
})
export class CoreModule { }
