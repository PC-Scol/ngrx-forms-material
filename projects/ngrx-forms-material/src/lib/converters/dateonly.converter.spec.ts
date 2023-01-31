import { NgrxDateToISO8601 } from '../converters/dateonly.converter';
import moment from 'moment';

describe('Converter: DateOnlyToLocaleStringConverter', () => {
  const converter = new NgrxDateToISO8601();
  const date = moment(new Date(Date.UTC(1990, 0, 1)));

  describe('View to state', () => {
    it('should set value to null in store if obj is null', () => {
      expect(converter.convertViewToStateValue(null)).toBeNull();
    });

    it('should set value to a locale representation of date', () => {
      expect(converter.convertViewToStateValue(date)).toEqual('1990-01-01');
    });
  });

  describe('State to view', () => {
    it('should respect default NgrxValueConverter when value is null', () => {
      expect(converter.convertStateToViewValue(null)).toEqual(null);
    });

    it('should respect default NgrxValueConverter when value is a string representation of date', () => {
      expect(
        converter.convertStateToViewValue('1990-01-01').toISOString()
      ).toEqual(date.toISOString());
    });
  });
});
