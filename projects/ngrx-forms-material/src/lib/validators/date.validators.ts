import { gte, lte } from 'lodash-es';
import { NgrxValueConverters, ValidationErrors } from 'ngrx-forms';

/**
 * Validate a date interval
 * @param op op
 * @param comp comp
 */
function _validateBornedDate(
  op: (tValue: Date, tComp: Date) => boolean,
  comp: string
): (value: string) => ValidationErrors {
  const converter = NgrxValueConverters.dateToISOString.convertStateToViewValue;
  return function (value: string): any {
    return op(converter(value), converter(comp))
      ? {}
      : {
          bornedDate: {
            actual: value,
          },
        };
  };
}

/**
 * Validation of the minimum date
 * @param min minimum date
 */
export function minDate(min: string): (value: string) => ValidationErrors {
  return _validateBornedDate(gte, min);
}

/**
 * Validation of the maximum date
 * @param max maximum date
 */
export function maxDate(max: string): (value: string) => ValidationErrors {
  return _validateBornedDate(lte, max);
}
