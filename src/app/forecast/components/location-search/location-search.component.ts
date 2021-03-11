import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Store } from '@ngrx/store';
import { City } from 'src/app/core/models/city.model';
import { Country } from 'src/app/core/models/country.model';
import { UserCountry } from 'src/app/core/models/userCountry.model';
import { WeatherForecast } from 'src/app/core/models/weatherForecast.model';
import { LocationService } from 'src/app/core/services/location/location.service';
import { WeatherService } from 'src/app/core/services/weather/weather.service';
import { SetWeather } from 'src/app/core/store/store.actions';
import { AppState } from 'src/app/core/store/store.reducers';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html'
})
export class LocationSearchComponent implements OnInit {

  public listOfCountries: Country[] = [];
  public listOfCitiesByCountry: City[] = [];
  public locationForm!: FormGroup;
  public isCityListLoading: boolean = false;
  public isCountryListLoading: boolean = false;

  @ViewChild('countrySelect') ngSelect!: NgSelectComponent;
  @ViewChild('citySelect') ngSelectCity!: NgSelectComponent;

  constructor(private fb: FormBuilder, private locationService: LocationService, private weatherService: WeatherService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.createLocationForm();
    this.getListOfCountries();
  }

  /**
   * Initialize reactive form.
   */
  private createLocationForm() {
    this.locationForm = this.fb.group({
      'countryList': [this.listOfCountries, [], []],
      'citiesList': [this.listOfCountries, [], []]
    })
  }

  /**
   * Get list of all countries.
   */
  private getListOfCountries(): void {
    this.isCountryListLoading = true;
    this.locationService.getListOfCountries().subscribe((response: Array<Country>) => {
      this.listOfCountries = response;
      this.getUserCountry();
    });
  }

  /**
   * Get clients country.
   */
  private getUserCountry(): void {
    this.locationService.getUserCountry().subscribe((response: UserCountry) => {
      this.ngSelect.itemsList.items.forEach(item => {
        if (item.label === response.location.country) {
          this.ngSelect.select(item);
          this.getListOfCities();
          this.isCountryListLoading = false;
          return;
        }
      })
    })
  }

  /**
  * Get all cities from clients or selected country.
  */
  public getListOfCities(): void {
    this.isCityListLoading = true;
    const clientCountryCode: string = this.locationForm.get('countryList')?.value;

    this.locationService.getListOfCitiesByCountry(clientCountryCode).subscribe((response: City[]) => {
      this.listOfCitiesByCountry = response;
      this.listOfCitiesByCountry.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      this.isCityListLoading = false;
    })
  }

  /**
   * Reset list of cities when country is changed.
   */
  public onCountryCodeSelectionChange(): void {
    if (this.listOfCitiesByCountry) {
      this.ngSelectCity.handleClearClick();
    }
    this.listOfCitiesByCountry = [];
  }

  /**
   * Custom search for countries - user can search both country name and country code.
   * @param term search term
   * @param item list item
   */
  customSearchFn(term: string, item: Country) {
    term = term.toLocaleLowerCase();
    return item.alpha2Code.toLocaleLowerCase().indexOf(term) > -1 ||
      item.name.toLocaleLowerCase().indexOf(term) > -1;
  }

  /**
   * On city selection, get weather forecast.
   */
  onCitySelectionClose() {
    let cityLat: string = this.locationForm.get('citiesList')?.value.lat;
    let cityLon: string = this.locationForm.get('citiesList')?.value.lng;

    if (cityLat && cityLon) {
      this.weatherService.getWeatherForecast(cityLat, cityLon).subscribe((response: WeatherForecast) => {
        this.store.dispatch(new SetWeather(response))
      })
    }
  }

}
