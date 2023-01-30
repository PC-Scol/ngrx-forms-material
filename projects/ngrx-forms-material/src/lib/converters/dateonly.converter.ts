import { NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';
import * as moment from 'moment';

/**
 * Converter for dates in ISO8601 format for ngrx-forms
 */
export class NgrxDateToISO8601
  implements NgrxValueConverter<moment.Moment | null, string | null>
{
  /**
   * Transform the view into state for the store
   */
  convertViewToStateValue = (date: moment.Moment) =>
    date === null ? null : date.format('YYYY-MM-DD');

  /**
   * Transform the state in the store into the view
   */
  convertStateToViewValue = (s) => {
    const date = NgrxValueConverters.dateToISOString.convertStateToViewValue(s);
    return date !== null ? moment(date) : null;
  };
}

/**
 * Converter for dates in ISO8601 UTC format for ngrx-forms.
 */
export class NgrxDateToISO8601UTC
  implements NgrxValueConverter<moment.Moment | null, string | null>
{
  /**
   * Transform the view into state for the store
   */
  convertViewToStateValue = (date: moment.Moment) =>
    date === null ? null : date.utc().format('YYYY-MM-DD');

  /**
   * Transform the state in the store into the view
   */
  convertStateToViewValue = (s) => {
    const date = NgrxValueConverters.dateToISOString.convertStateToViewValue(s);
    return date !== null ? moment.utc(date) : null;
  };
}
