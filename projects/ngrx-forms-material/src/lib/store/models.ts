import {
  FormControlState,
  FormGroupControls,
  FormGroupState,
} from 'ngrx-forms';
import { MemoizedSelector } from '@ngrx/store';

/**
 * Form interface
 */
export interface NgrxFormState<T> {
  form: FormGroupState<T>;
}

/**
 * Selector interface for form information
 */
export interface NgrxFormSelectors<T> {
  selectFormGroup: MemoizedSelector<object, FormGroupState<T>>;
  selectFormControls: MemoizedSelector<object, FormGroupControls<T>>;
  selectFormGroupData: MemoizedSelector<object, T>;
  selectLastFocusedAutocompleteField: MemoizedSelector<object, string>;
  selectLastFocusedAutocompleteData: MemoizedSelector<object, NgrxAutocomplete>;
}

/**
 * Adapter interface for ngrx-forms
 */
export interface NgrxFormAdapter<T> {
  formId: string;
  getInitialState(): NgrxFormState<T>;
  getInitialState<S extends object>(state: S): NgrxFormState<T> & S;
  getSelectors(
    selectState: (state: object) => NgrxFormState<T>
  ): NgrxFormSelectors<T>;
}

/**
 * Class for autocomplete fields
 */
export class NgrxAutocomplete {
  /** Entered value */
  public seized: string;
  /** Minimum number of characters to activate autocomplete */
  public min: number;

  /**
   * Constructor for autocomplete fields
   * @param controlState Form field
   */
  constructor(controlState?: FormControlState<string>) {
    this.seized =
      (controlState && controlState.userDefinedProperties.autocomplete) || '';
    this.min =
      (controlState &&
        controlState.userDefinedProperties.autocompleteMinChars) ||
      0;
  }

  /**
   * Determining whether to filter data
   */
  private shouldFilter(): boolean {
    return (
      this.seized !== undefined &&
      this.seized !== '' &&
      (this.min === undefined || this.seized.length >= this.min)
    );
  }

  /**
   * Filtering data
   * @param collection Data collection
   * @param callback Callback function
   */
  public filter<T>(
    collection: T[],
    callback: (value: T, index: number, array: T[]) => any
  ): T[] {
    return this.shouldFilter() ? collection.filter(callback) : collection;
  }
}
