import { Directive, Input, OnInit } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { FormControlState, SetUserDefinedPropertyAction } from 'ngrx-forms';
import { MatLegacyInput as MatInput } from '@angular/material/legacy-input';

/**
 * Directive for compatibility of datepickers with ngrx-forms
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[ngrxFormControlState][matDatepicker]',
})
export class DatepickerInputDirective implements OnInit {
  /** Form field state */
  @Input() ngrxFormControlState: FormControlState<string>;
  /** Minimum date */
  @Input() min;
  /** Maximum date */
  @Input() max;

  /**
   * Directive constructor
   * @param actionsSubject actions subject
   */
  constructor(
    private actionsSubject: ActionsSubject,
    private matInput: MatInput
  ) {}

  /**
   * Management of minimum and maximum dates
   */
  ngOnInit(): void {
    // Management of disabled
    this.matInput.disabled = this.ngrxFormControlState.isDisabled;
    // Management of min
    if (this.min !== undefined) {
      this.actionsSubject.next(
        new SetUserDefinedPropertyAction(
          this.ngrxFormControlState.id,
          'minDate',
          this.min
        )
      );
    }
    // Management of max
    if (this.max !== undefined) {
      this.actionsSubject.next(
        new SetUserDefinedPropertyAction(
          this.ngrxFormControlState.id,
          'maxDate',
          this.max
        )
      );
    }
  }
}
