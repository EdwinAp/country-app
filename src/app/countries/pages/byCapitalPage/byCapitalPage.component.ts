import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './byCapitalPage.component.html',
  styleUrls: ['./byCapitalPage.component.css']
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];

  public isLoading: boolean = false;

  public term: string = '';

  constructor(
    private countriesService: CountriesService
  ) { }

  ngOnInit() {
    this.term = this.countriesService.catchStore.byCapital.term;
    this.countries = this.countriesService.catchStore.byCapital.countries;
  }

  searchByCapital(term: string) {
    this.isLoading = true;
    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
