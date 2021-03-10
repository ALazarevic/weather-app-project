import { Action } from '@ngrx/store';
import { StoreActionsEnum } from '../enums/storeActionsEnum.enum';
import { WeatherForecast } from '../models/weatherForecast.model';

export class SetWeather implements Action {
  public readonly type = StoreActionsEnum.SET_WEATHER;

  constructor(public payload: WeatherForecast) { }
}
