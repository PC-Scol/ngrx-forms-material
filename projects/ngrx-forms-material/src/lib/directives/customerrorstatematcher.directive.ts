import { Directive, Host, Input, Optional } from '@angular/core';
import { MatLegacyChipList as MatChipList } from '@angular/material/legacy-chips';
import { MatLegacyInput as MatInput } from '@angular/material/legacy-input';
import { MatLegacySelect as MatSelect } from '@angular/material/legacy-select';
import { FormControlState } from 'ngrx-forms';

/**
 * Directive for error handling for ngrx-forms form fields
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngrxFormControlState]',
})
export class CustomErrorStateMatcherDirective {
  /**
   * Error display management
   */
  @Input() set ngrxFormControlState(state: FormControlState<any>) {
    const errorsAreShown = state.isInvalid;

    if (this.input) {
      this.input.errorState = errorsAreShown;
      this.input.stateChanges.next();
    }

    if (this.select) {
      this.select.errorState = errorsAreShown;
      this.select.stateChanges.next();
    }

    if (this.chipList) {
      this.chipList.errorState = errorsAreShown;
      this.chipList.stateChanges.next();
    }
  }

  /**
   * Directive constructor
   * @param input an optional mat-input
   * @param select an optional mat-select
   * @param chipList an optional chip-list
   */
  constructor(
    @Host() @Optional() private input: MatInput,
    @Host() @Optional() private select: MatSelect,
    @Host() @Optional() private chipList: MatChipList
  ) {}
}
