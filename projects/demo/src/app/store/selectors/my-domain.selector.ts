import { createSelector } from '@ngrx/store';
import { formAdapter, selectMyState } from '../reducers';

export const selectMyFormState= createSelector(selectMyState, state => state.myDomain);

export const {
    selectFormGroup: selectMyDomainForm,
    selectFormControls: selectMyDomainFormFields,
    selectLastFocusedAutocompleteField: selectMyDomainFormAutocompleteField,
    selectLastFocusedAutocompleteData: selectMyDomainFormAutocompleteData
} = formAdapter.getSelectors(selectMyFormState);
