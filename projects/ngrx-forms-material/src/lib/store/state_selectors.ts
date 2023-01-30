import { createSelector } from '@ngrx/store';
import { NgrxAutocomplete, NgrxFormSelectors, NgrxFormState } from './models';

/**
 * Creating selectors to retrieve form information
 */
export function createSelectorsFactory<T>() {
  function getSelectors(
    selectState: (state: object) => NgrxFormState<T>
  ): NgrxFormSelectors<T> {
    const selectFormGroup = (state: NgrxFormState<T>) => state.form;
    const selectFormControls = (state: NgrxFormState<T>) => state.form.controls;
    const selectFormGroupData = (state: NgrxFormState<T>) => state.form.value;
    const selectLastFocusedAutocompleteField = (state: NgrxFormState<T>) =>
      state.form.userDefinedProperties.lastAutocompleteFocused;
    const selectLastFocusedAutocompleteData = (state: NgrxFormState<T>) =>
      new NgrxAutocomplete(
        state.form.controls[selectLastFocusedAutocompleteField(state)]
      );

    return {
      selectFormGroup: createSelector(selectState, selectFormGroup),
      selectFormControls: createSelector(selectState, selectFormControls),
      selectFormGroupData: createSelector(selectState, selectFormGroupData),
      selectLastFocusedAutocompleteField: createSelector(
        selectState,
        selectLastFocusedAutocompleteField
      ),
      selectLastFocusedAutocompleteData: createSelector(
        selectState,
        selectLastFocusedAutocompleteData
      ),
    };
  }

  return { getSelectors };
}
