import { Directive, forwardRef } from '@angular/core';
import { MatLegacySelect as MatSelect } from '@angular/material/legacy-select';
import { FormViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';

/**
 * Converter to ensure compatibility between 'mat-select' and ngrx-forms
 */
/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/directive-class-suffix */
// necessary since material 2 does not properly export the mat-select as a NG_VALUE_ACCESSOR
@Directive({
  selector: 'mat-select[ngrxFormControlState]',
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxMatSelectViewAdapter),
      multi: true,
    },
  ],
})
export class NgrxMatSelectViewAdapter implements FormViewAdapter {
  /**
   * Constructor for the view adapter.
   * @param matSelect the "mat-select"
   */
  constructor(private matSelect: MatSelect) {}

  /**
   * Define the value of the view.
   * @param value the value
   */
  setViewValue(value: any) {
    const isMultiple = Array.isArray(value);
    const newVal = isMultiple ? value.map((x) => x) : value;

    // we have to verify that the same value is not set again since that would
    // cause focus to get lost on the select since it tries to focus the active option
    const selectedOption = this.matSelect.selected;

    if (selectedOption) {
      if (Array.isArray(selectedOption) && Array.isArray(value)) {
        if (
          value.length === selectedOption.length &&
          value.every((v, i) => v === selectedOption[i])
        ) {
          return;
        }
      } else if (!Array.isArray(selectedOption)) {
        if (value === selectedOption.value) {
          return;
        }
      }
    }

    // because the options are potentially updated AFTER the value (because of their order in the DOM),
    // setting the value has to be deferred, otherwise we might select an option which is not available yet.
    Promise.resolve().then(() => this.matSelect.writeValue(newVal));
  }

  /**
   * Management of the onChange event
   * @param fn a function
   */
  setOnChangeCallback(fn: any) {
    this.matSelect.registerOnChange(fn);
  }

  /**
   * Management of the onTouched event
   * @param fn a function
   */
  setOnTouchedCallback(fn: any) {
    this.matSelect.registerOnTouched(fn);
  }

  /**
   * Management of deactivation
   * @param isDisabled témoin de désactivation
   */
  setIsDisabled(isDisabled: boolean) {
    this.matSelect.setDisabledState(isDisabled);
  }
}
