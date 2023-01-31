import { NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';
import moment from 'moment-timezone';

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

/**
 * Converter for dates with time and timezone in ISO8601 format for ngrx-forms
 */
export class NgrxDateTimeZoneToISO8601 implements NgrxValueConverter<moment.Moment | null, string | null> {
  constructor(private tz: string) {}

  /**
   * Transform the view into state for the store
   */
  convertViewToStateValue = (date: moment.Moment) => (date === null ? null : date.tz(this.tz, true).format());

  /**
   * Transform the state in the store into the view
   */
  convertStateToViewValue = (s) => {
      const date = NgrxValueConverters.dateToISOString.convertStateToViewValue(s);
      return date !== null ? moment.tz(date, this.tz) : null;
  };
}
