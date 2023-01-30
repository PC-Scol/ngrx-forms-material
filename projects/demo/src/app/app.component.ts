import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { includes, toLower } from 'lodash-es';
import * as moment from 'moment';
import { FormGroupState } from 'ngrx-forms';
import {
  NgrxAutocompleteConverter,
  NgrxDateToISO8601UTC,
} from 'ngrx-forms-material';
import { NgrxDateToISO8601 } from 'projects/ngrx-forms-material/src/public-api';
import { filter, map, Observable, switchMap } from 'rxjs';
import {
  countries,
  Country,
  fruits,
  MyDomain,
  vegetables,
} from './models/my-domain.model';
import {
  selectMyDomainForm,
  selectMyDomainFormAutocompleteData,
  selectMyDomainFormAutocompleteField,
} from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'demo';

  formState$: Observable<FormGroupState<MyDomain>>;

  dateConverter: NgrxDateToISO8601;
  dateUtcConverter: NgrxDateToISO8601UTC;
  countryConverter: NgrxAutocompleteConverter<Country, string>;

  current_year = moment().year();
  minDate = moment([this.current_year - 120, 0, 1]);
  maxDate = moment();
  startDate = moment([this.current_year - 18, 0, 1]);

  allFruits = fruits;
  allVegetables = vegetables;
  allCountries = countries;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.dateConverter = new NgrxDateToISO8601();
    this.dateUtcConverter = new NgrxDateToISO8601UTC();
    this.countryConverter = new NgrxAutocompleteConverter(
      this.allCountries,
      'code'
    );
    this.formState$ = this.store.pipe(select(selectMyDomainForm));
  }

  displayCountry(country?: Country): string | undefined {
    return country ? country.label : undefined;
  }

  filteredCountries$() {
    return this.store.pipe(
      select(selectMyDomainFormAutocompleteField),
      filter((field) => field === 'birthCountry'),
      switchMap((_) =>
        this.store.pipe(
          select(selectMyDomainFormAutocompleteData),
          map((autocomplete) =>
            autocomplete.filter(
              this.allCountries,
              (country) =>
                includes(
                  toLower(country.label),
                  toLower(autocomplete.seized)
                ) || includes(country.code, autocomplete.seized)
            )
          )
        )
      )
    );
  }
}
