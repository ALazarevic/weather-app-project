import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './pages/forecast/forecast.component';
import { LocationSearchComponent } from './components/location-search/location-search.component';



@NgModule({
  declarations: [ForecastComponent, LocationSearchComponent],
  imports: [
    CommonModule
  ]
})
export class ForecastModule { }
