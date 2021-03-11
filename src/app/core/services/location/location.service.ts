import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from '../../models/country.model';
import { UserCountry } from '../../models/userCountry.model';
import { Cities } from '../../models/cities.model';
import { City } from '../../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private listOfCountriesUrl: string = 'https://restcountries.eu/rest/v2/all?fields=name;flag;alpha2Code';
  private userCountryUrl: string = 'https://geo.ipify.org/api/v1?apiKey=at_GCRdEPtdX2ckCQIjUkHUdBWvivodO';
  private listOfCitiesUrlBase: string = 'https://secure.geonames.org/searchJSON?username=alazarevic&country=';
  private listOfCitiesUrlParams: string = '&style=SHORT&maxRows=500';

  constructor(private http: HttpClient) { }

  /**
   * Method which will return list of countries.
   */
  public getListOfCountries(): Observable<Array<Country>> {
    return this.http.get<Array<Country>>(this.listOfCountriesUrl).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Method which will return client country based on IP adress.
   */
  public getUserCountry(): Observable<UserCountry> {
    return this.http.get<UserCountry>(this.userCountryUrl).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Method which will return list of cities by selected country.
   * @param countryCode code that represents country
   */
  public getListOfCitiesByCountry(countryCode: string): Observable<Array<City>> { // This could be improved, to use Like Search insted of Full Text Search.
    return this.http.get<Cities>(this.listOfCitiesUrlBase + countryCode + this.listOfCitiesUrlParams).pipe(
      map(response => {
        return response.geonames;
      }),
      catchError(this.handleError)
    );
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
