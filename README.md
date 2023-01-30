# Ngrx Forms Material

This project the compatibily between some element of [Angular Material](https://github.com/angular/components) and the library [Ngrx Forms](https://github.com/MrWolfZ/ngrx-forms).

It propose to fix :

- [mat-datepicker](https://material.angular.io/components/datepicker/overview) :
  - compatibility for elements with the following selector : ```input[ngrxFormControlState][matDatepicker]```
  - management of minimum and maximum dates with **min** and **max** inputs
  - converter for dates in ISO8601 with **NgrxDateToISO8601**, to use in the **ngrxValueConverter** directive on the field
  - converter for dates in ISO8601 UTC with **NgrxDateToISO8601UTC**, to use in the **ngrxValueConverter** directive on the field

- [mat-select](https://material.angular.io/components/select/overview) :
  - compatibility for elements with the following selector : ```mat-select[ngrxFormControlState]```
  - work for **multiple** selectors

- [mat-autocomplete](https://material.angular.io/components/autocomplete/overview) :
  - compatibility for elements with the following selector : ```input[ngrxFormControlState][matAutocomplete]```
  - management of minimum characters to activate autocomplete with **autocompleteMinChars** input
  - propose **autocompleteValue** validator to use in **updateGroup** to validate the field
  - propose **requiredAutocompleteValue** validator to use in **updateGroup** to validate the required field
  - converter for autocomplete field with **NgrxAutocompleteConverter**, to use in the **ngrxValueConverter** directive on the field

- mat-error :
  - compatibility for element with the following selector : ```[ngrxFormControlState]```

Anyway, it gives to you some usefull store tools :

- **createNgrxFormAdapter** : Adapter for ngrx-forms with a form id and an initial data
- **getInitialFormState** : Retrieve the initial state of the form
- **createInitialStateFactory** : Create the initial state of the form
- **createSelectorsFactory** : Creating selectors to retrieve form information, like selectFormGroup, selectFormControls, selectFormGroupData, selectLastFocusedAutocompleteField and selectLastFocusedAutocompleteData
