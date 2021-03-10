import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './pages/forecast/forecast.component';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { AverageTemperatureComponent } from './components/average-temperature/average-temperature.component';
import { NextSevenDaysForecastComponent } from './components/next-seven-days-forecast/next-seven-days-forecast.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [ForecastComponent, LocationSearchComponent, AverageTemperatureComponent, NextSevenDaysForecastComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ForecastModule { }
