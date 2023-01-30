import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { FormGroupState } from 'ngrx-forms';
import { NgrxDateToISO8601UTC } from 'ngrx-forms-material';
import { Observable } from 'rxjs';
import { fruits, MyDomain, vegetables } from './models/my-domain.model';
import { selectMyDomainForm } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'demo';

  formState$: Observable<FormGroupState<MyDomain>>;

  dateConverter: NgrxDateToISO8601UTC;

  current_year = moment().year();
  minDate = moment([this.current_year - 120, 0, 1]);
  maxDate = moment();
  startDate = moment([this.current_year - 18, 0, 1]);

  allFruits = fruits;
  allVegetables = vegetables;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.dateConverter = new NgrxDateToISO8601UTC();
    this.formState$ = this.store.pipe(select(selectMyDomainForm));
  }
}
