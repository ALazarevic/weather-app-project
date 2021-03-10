import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { WeatherForecast } from '../../models/weatherForecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherForecastUrlBase: string = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
  private weatherForecastUrlLonParam: string = '&lon=';
  private weatherForecastUrlParamsAndKey: string = '&days=11&key=187b8a227efd438186f6a3e1d68a947c';

  constructor(private http: HttpClient) { }

  /**
   * Method which will return weather forecast by city coordinates.
   * @param lat city latitude
   * @param lon city longitude
   */
  public getWeatherForecast(lat: string, lon: string): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(this.weatherForecastUrlBase + lat + this.weatherForecastUrlLonParam + lon + this.weatherForecastUrlParamsAndKey).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Method which will handle errors during api calls.
   * @param error occured error in api call
   */
  private handleError(error: HttpErrorResponse): Observable<never> { // TODO - Show meaningfull error to user.
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
