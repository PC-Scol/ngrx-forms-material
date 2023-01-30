import { NgrxAutocompleteConverter } from '../converters/autocomplete.converter';

interface User {
  id: number;
  name: string;
}

describe('Converter: AutocompleteConverter', () => {
  const userCollections: User[] = [
    {
      id: 1,
      name: 'georges',
    },
    {
      id: 2,
      name: 'georgette',
    },
  ];
  const converter = new NgrxAutocompleteConverter(userCollections, 'id');

  describe('View to state', () => {
    it('should set value to null in store if obj is undefined', () => {
      expect(converter.convertViewToStateValue(undefined)).toBeNull();
    });

    it('should set value to null in store if obj is null', () => {
      expect(converter.convertViewToStateValue(null)).toBeNull();
    });

    it('should set value to the value of the identifier field of obj', () => {
      expect(converter.convertViewToStateValue(userCollections[0])).toEqual(1);
    });
  });

  describe('State to view', () => {
    it('should set value to undefined if obj is not found in collection', () => {
      expect(converter.convertStateToViewValue(3)).toBeUndefined();
    });

    it('should return the obj found in the collection', () => {
      expect(converter.convertStateToViewValue(1)).toEqual(userCollections[0]);
    });
  });

  describe('Bad identifier field', () => {
    it("should throw an error when identifier field doesn't exist on obj", () => {
      const badConverterCreation = () =>
        new NgrxAutocompleteConverter(userCollections, 'login');
      expect(badConverterCreation).toThrowError(
        "NgrxAutocompleteConverter: Bad identifier 'login' field defined"
      );
    });
  });
});
