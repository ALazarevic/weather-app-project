import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './pages/forecast/forecast.component';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { AverageTemperatureComponent } from './components/average-temperature/average-temperature.component';
import { NextSevenDaysForecastComponent } from './components/next-seven-days-forecast/next-seven-days-forecast.component';



@NgModule({
  declarations: [ForecastComponent, LocationSearchComponent, AverageTemperatureComponent, NextSevenDaysForecastComponent],
  imports: [
    CommonModule
  ]
})
export class ForecastModule { }
