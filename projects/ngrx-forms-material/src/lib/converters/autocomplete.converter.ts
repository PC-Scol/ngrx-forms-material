import { NgrxValueConverter } from 'ngrx-forms';

/**
 * Converter for autocomplete fields utilizing ngrx-forms
 */
export class NgrxAutocompleteConverter<TView, TState>
  implements NgrxValueConverter<TView, TState>
{
  /**
   * Constructor of the converter
   * @param collection the collection of elements
   * @param identifierFieldName the identifier of the field
   */
  constructor(
    private collection: TView[],
    private identifierFieldName: string
  ) {
    if (
      collection.length > 0 &&
      collection[0][identifierFieldName] === undefined
    ) {
      throw new Error(
        `${NgrxAutocompleteConverter.name}: Bad identifier '${identifierFieldName}' field defined`
      );
    }
  }

  /**
   * Convert the view into state for the store
   */
  convertViewToStateValue(obj: TView): TState {
    return obj === undefined || obj === null || typeof obj === 'string'
      ? null
      : obj[this.identifierFieldName];
  }

  /**
   * Transform the view into state for the store
   * @param identifier the identifier of the field
   */
  convertStateToViewValue(identifier: TState): TView {
    return this.collection.find(
      (el) => el[this.identifierFieldName] === identifier
    );
  }
}
