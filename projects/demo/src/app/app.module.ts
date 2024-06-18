import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';
import { NgrxFormsMaterialModule } from 'ngrx-forms-material';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatMomentDateModule,
    MatDatetimepickerModule,
    MatMomentDatetimeModule,
    NgrxFormsModule,
    NgrxFormsMaterialModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('myState', reducers),
    StoreDevtoolsModule.instrument({ maxAge: 100 , connectInZone: true})
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
          parse: {
              dateInput: 'L',
          },
          display: {
              dateInput: 'L',
              monthYearLabel: 'MMM YYYY',
              dateA11yLabel: 'L',
              monthYearA11yLabel: 'MMMM YYYY',
          },
      },
  },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
