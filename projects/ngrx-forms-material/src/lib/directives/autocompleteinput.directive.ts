import {
  Directive,
  HostListener,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { FormControlState, SetUserDefinedPropertyAction } from 'ngrx-forms';

/**
 * Directive for handling autocomplete fields with ngrx-forms
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[ngrxFormControlState][matAutocomplete]',
})
export class AutocompleteInputDirective implements OnInit, OnDestroy {
  /** Form ID */
  private formId: string;
  /** Form field name */
  private controlName: string;
  /** Form state */
  @Input() ngrxFormControlState: FormControlState<string>;
  /** Minimum characters to activate autocomplete */
  @Input() autocompleteMinChars = 1;

  /**
   * Directive constructor
   * @param actionsSubject actions subject
   */
  constructor(private actionsSubject: ActionsSubject) {}

  /**
   * Handling of the onInput event
   * @param value The value
   */
  @HostListener('input', ['$event.target.value']) onInput(value: string) {
    this.actionsSubject.next(
      new SetUserDefinedPropertyAction(
        this.ngrxFormControlState.id,
        'autocomplete',
        value
      )
    );
  }

  /**
   * Handling of the onFocusIn event
   */
  @HostListener('focusin') onFocusIn() {
    this.actionsSubject.next(
      new SetUserDefinedPropertyAction(
        this.formId,
        'lastAutocompleteFocused',
        this.controlName
      )
    );
  }

  /**
   * Upon initialization, set the minimum number of characters to activate autocomplete
   */
  ngOnInit(): void {
    [this.formId, this.controlName] = this.ngrxFormControlState.id.split('.');
    this.actionsSubject.next(
      new SetUserDefinedPropertyAction(
        this.ngrxFormControlState.id,
        'autocompleteMinChars',
        this.autocompleteMinChars
      )
    );
  }

  /**
   * Upon destruction of the directive, clean up
   */
  ngOnDestroy(): void {
    this.actionsSubject.next(
      new SetUserDefinedPropertyAction(
        this.ngrxFormControlState.id,
        'autocomplete',
        null
      )
    );
  }
}
