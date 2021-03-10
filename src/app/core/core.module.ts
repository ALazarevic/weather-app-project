import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './services/location/location.service';
import { WeatherService } from './services/weather/weather.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LocationService,
    WeatherService
  ]
})
export class CoreModule { }
