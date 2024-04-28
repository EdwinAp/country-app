import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit {

  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  public countries: Country[] = [];

  constructor(
    private countriesService: CountriesService
  ) { }

  ngOnInit() {
    this.selectedRegion = this.countriesService.catchStore.byRegion.term;
    this.countries = this.countriesService.catchStore.byRegion.countries;
  }

  searchByRegion(term: Region) {
    this.isLoading = true;
    this.selectedRegion = term;
    this.countriesService.searchRegion(term)
      .subscribe(countries => {
        this.countries = countries
        this.isLoading = false;
      });
  }

}
