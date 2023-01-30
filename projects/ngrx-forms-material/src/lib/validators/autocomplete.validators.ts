import { ValidationErrors, ValidationFn } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

/**
 * Validator for the required autocomplete field
 * @param seizedValue the entered value
 */
export function requiredAutocompleteValue(
  seizedValue: string
): ValidationFn<string> {
  return (value: string): ValidationErrors => {
    const autocompleteErrors = autocompleteValue(seizedValue)(value);
    return autocompleteErrors['noSelection']
      ? autocompleteErrors
      : required(value);
  };
}

/**
 * Validator for the autocomplete field
 * @param seizedValue the entered value
 */
export function autocompleteValue(seizedValue: string): ValidationFn<string> {
  const isAutocompleteDirty =
    seizedValue !== undefined &&
    seizedValue !== null &&
    seizedValue.length !== 0;
  return (value: string): ValidationErrors => {
    const noSelection = value !== undefined && value === null;
    return isAutocompleteDirty && noSelection
      ? ({ noSelection: { actual: value, seized: seizedValue } } as any)
      : {};
  };
}
