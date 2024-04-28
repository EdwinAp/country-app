import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {

  public isLoading: boolean = false;
  public countries: Country[] = [];
  public term: string = '';

  constructor(
    private countriesService: CountriesService
  ) { }

  ngOnInit() {
    this.countries = this.countriesService.catchStore.byCountries.countries;
    this.term = this.countriesService.catchStore.byCountries.term;
  }

  searchByCountry(term: string) {
    this.isLoading = true;
    this.countriesService.searchCountry(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
