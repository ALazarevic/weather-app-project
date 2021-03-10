import { SetWeather } from './store.actions'
import { WeatherForecast } from '../models/weatherForecast.model';
import { StoreActionsEnum } from '../enums/storeActionsEnum.enum';
import { Action } from '@ngrx/store';

export interface AppState {
  store: State;
}

export interface State {
  weather: WeatherForecast,
}

const initialState = {
  weather: {}
}

export function storeReducers(state = initialState, action: Action) {
  const specificAction = action as SetWeather;
  switch (action.type) {
    case StoreActionsEnum.SET_WEATHER:

      return {
        ...state,
        weather: specificAction.payload
      }
    default:
      return state;
  }
}