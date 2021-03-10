import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './pages/forecast/forecast.component';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { AverageTemperatureComponent } from './components/average-temperature/average-temperature.component';



@NgModule({
  declarations: [ForecastComponent, LocationSearchComponent, AverageTemperatureComponent],
  imports: [
    CommonModule
  ]
})
export class ForecastModule { }
