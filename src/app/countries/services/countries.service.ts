import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, of, pipe, tap } from "rxjs";
import { Country } from "../interfaces/country";
import { CacheStore } from "../interfaces/cache-store.interface";
import { Region } from '../interfaces/region.type';


@Injectable({providedIn: 'root'})
export class CountriesService {

  private apitUrl: string = 'https://restcountries.com/v3.1';

  private keyItem: string = 'cacheStore';

  public catchStore: CacheStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byCountries: {
      term: '',
      countries: []
    },
    byRegion: {
      term: '',
      countries: []
    }
  };

  constructor(
    private httpClient: HttpClient
  ) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.keyItem, JSON.stringify(this.catchStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem(this.keyItem)) return;
    this.catchStore = JSON.parse(localStorage.getItem(this.keyItem)!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => {
          console.log(error);
          return of([])
        }),
        //delay(2000)
      );
  }

  searchCountryAlphaCode(code: string): Observable<Country | undefined> {
    return this.httpClient.get<Country[]>(`${this.apitUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : undefined),
        catchError( () => of(undefined) )
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apitUrl}/capital/${term}`)
    .pipe(
      tap( countries => this.catchStore.byCapital = {term: term, countries: countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchRegion(term: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apitUrl}/region/${term}`)
    .pipe(
      tap( countries => this.catchStore.byRegion = {term: term, countries: countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apitUrl}/name/${term}`)
    .pipe(
      tap( countries => this.catchStore.byCountries = {term: term, countries: countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

}
