import { createFormGroupState } from 'ngrx-forms';
import { NgrxFormState } from './models';

/**
 * Retrieve the initial state of the form
 * @param formId the ID of the form
 * @param initialData the initial data
 */
export function getInitialFormState<V>(
  formId: string,
  initialData: V
): NgrxFormState<V> {
  return {
    form: createFormGroupState<V>(formId, initialData),
  };
}

/**
 * Create the initial state of the form
 * @param formId the ID of the form
 * @param initialData the initial data
 */
export function createInitialStateFactory<V>(formId: string, initialData: V) {
  function getInitialState(): NgrxFormState<V>;
  function getInitialState<S extends object>(
    additionalState: S
  ): NgrxFormState<V> & S;
  function getInitialState(additionalState: any = {}): any {
    return Object.assign(
      getInitialFormState(formId, initialData),
      additionalState
    );
  }

  return { getInitialState };
}
