import * as WChar from './wchar';

describe('WString', () => {
  describe('compareWCharIds', () => {
    it('should know if two char ids are the same', () => {
      expect(
        WChar.compareWCharIds(
          { clientId: 0, clock: 1 },
          { clientId: 0, clock: 1 }
        )
      ).toBe('EQ');
    });

    it('should know if two char ids are different', () => {
      expect(
        WChar.compareWCharIds(
          { clientId: 1, clock: 0 },
          { clientId: 0, clock: 10 }
        )
      ).toBe('GT');

      expect(
        WChar.compareWCharIds(
          { clientId: 0, clock: 5 },
          { clientId: 0, clock: 10 }
        )
      ).toBe('LT');

      expect(
        WChar.compareWCharIds(
          { clientId: 0, clock: 0 },
          { clientId: 1, clock: 0 }
        )
      ).toBe('LT');

      expect(
        WChar.compareWCharIds(
          { clientId: 1, clock: 0 },
          { clientId: 0, clock: 0 }
        )
      ).toBe('GT');
    });
  });
});
