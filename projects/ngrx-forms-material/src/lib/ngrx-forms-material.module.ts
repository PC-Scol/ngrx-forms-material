import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutocompleteInputDirective } from './directives/autocompleteinput.directive';
import { CustomErrorStateMatcherDirective } from './directives/customerrorstatematcher.directive';
import { DatepickerInputDirective } from './directives/datepickerinput.directive';
import { NgrxMatSelectViewAdapter } from './converters/select.converter';

const declarationsAndExports = [
  AutocompleteInputDirective,
  DatepickerInputDirective,
  CustomErrorStateMatcherDirective,
  NgrxMatSelectViewAdapter,
];

/**
 * Module that provides compatibility between ngrx-forms and Angular Material.
 */
@NgModule({
  imports: [CommonModule],
  declarations: declarationsAndExports,
  exports: declarationsAndExports,
})
export class NgrxFormsMaterialModule {}
