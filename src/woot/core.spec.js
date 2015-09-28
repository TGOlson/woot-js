import {
  mockWString,
  validInsertOp,
  validInsertOpAmbiguous,
  validDeleteOp,
  invalidInsertOp,
  invalidDeleteOp,
  validInsertToValidateDelete,
  ambiguousEmptyStringInsertA,
  ambiguousEmptyStringInsertB
} from '../../spec/mock-data';


import Core from './core';
import WString from './wstring';


describe('Core', () => {
  describe('integrate', () => {
    it('should integrate an operation into the string if given a valid op', () => {
      expect(
        WString.show(
          Core.integrate(validInsertOp, mockWString)
        )
      ).toBe('baqr');

      expect(
        WString.show(
          Core.integrate(validInsertOpAmbiguous, mockWString)
        )
      ).toBe('bWar');

      expect(
        WString.show(
          Core.integrate(validDeleteOp, mockWString)
        )
      ).toBe('ar');
    });

    it('should be able to handle ambiguous inserts on empty strings', () => {
      const wString = WString.makeEmptyWString();

      const wStringB = Core.integrate(ambiguousEmptyStringInsertA, wString);

      expect(
        WString.show(
          Core.integrate(ambiguousEmptyStringInsertB, wStringB)
        )
      ).toBe('XW');
    });

    it('should not integrate an operation if given an invalid op', () => {
      expect(
        Core.integrate(invalidInsertOp, mockWString)
      ).toBe(null);

      expect(
        Core.integrate(invalidDeleteOp, mockWString)
      ).toBe(null);
    });

    it('should accept multiple inserts of the same char with no affect', () => {
      const newString = Core.integrate(validInsertOp, mockWString);

      expect(
        WString.show(
          Core.integrate(validInsertOp, newString)
        )
      ).toBe('baqr');
    });

    it('should accept multiple deletes of the same char with no affect', () => {
      const newString = Core.integrate(validDeleteOp, mockWString);

      expect(
        WString.show(
          Core.integrate(validDeleteOp, newString)
        )
      ).toBe('ar');
    });
  });
  describe('integrateAll', () => {
    it('should integrate a list of valid operations', () => {
      const {operations, wString} = Core.integrateAll([validInsertOp, validDeleteOp], mockWString);
      expect(operations).toEqual([]);
      expect(WString.show(wString)).toBe('aqr');
    });

    it('should return any invalid operations', () => {
      const {operations, wString} = Core.integrateAll([invalidInsertOp, invalidDeleteOp], mockWString);
      expect(operations).toEqual([invalidInsertOp, invalidDeleteOp]);
      expect(WString.show(wString)).toBe('bar');
    });

    it('should recurse if an operation is made valid by a later operation', () => {
      const ops = [invalidInsertOp, invalidDeleteOp, validInsertToValidateDelete];
      const {operations, wString} = Core.integrateAll(ops, mockWString);
      expect(operations).toEqual([invalidInsertOp]);
      expect(WString.show(wString)).toBe('bar');
    });
  });
});
