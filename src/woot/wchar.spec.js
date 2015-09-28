import WChar from './wchar';

describe('WString', () => {
  describe('compareWCharIds', () => {
    it('should know if two char ids are the same', () => {
      expect(
        WChar.compareWCharIds(
          {clientId: 0, clock: 1},
          {clientId: 0, clock: 1}
        )
      ).toBe(0);
    });

    it('should know if two char ids are different', () => {
      expect(
        WChar.compareWCharIds(
          {clientId: 1, clock: 0},
          {clientId: 0, clock: 10}
        )
      ).toBe(1);

      expect(
        WChar.compareWCharIds(
          {clientId: 0, clock: 5},
          {clientId: 0, clock: 10}
        )
      ).toBe(-1);

      expect(
        WChar.compareWCharIds(
          {clientId: 0, clock: 0},
          {clientId: 1, clock: 0}
        )
      ).toBe(-1);

      expect(
        WChar.compareWCharIds(
          {clientId: 1, clock: 0},
          {clientId: 0, clock: 0}
        )
      ).toBe(1);
    });
  });
});
