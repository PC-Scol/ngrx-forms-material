import { createSelectorsFactory } from './state_selectors';
import { createInitialStateFactory } from './form_state';
import { NgrxFormAdapter } from './models';

/**
 * Adapter for ngrx-forms
 * @param formId the id of the form
 * @param initialData the initial data
 */
export function createNgrxFormAdapter<T>(
  formId: string,
  initialData: T
): NgrxFormAdapter<T> {
  const stateFactory = createInitialStateFactory<T>(formId, initialData);
  const selectorsFactory = createSelectorsFactory<T>();

  return {
    formId,
    ...stateFactory,
    ...selectorsFactory,
  };
}
