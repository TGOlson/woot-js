import {
  mockWString,
  validInsertOp,
  validInsertOpAmbiguous,
  validDeleteOp
} from '../mock-data';

import Core from '../../dist/woot/core';
import WString from '../../dist/woot/wstring';

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
      ).toBe('barW');

      expect(
        WString.show(
          Core.integrate(validDeleteOp, mockWString)
        )
      ).toBe('ar'); // 'ar'
    });

    it('should not integrate an operation if given an invalid op', () => {
      // integrate invalidInsertOp mockWString `shouldBe` Nothing
      // integrate invalidDeleteOp mockWString `shouldBe` Nothing
    });

    it('should accept multiple inserts of the same char with no affect', () => {
      // let (Just newString) = integrate validInsertOp mockWString
      // integrate validInsertOp newString `shouldShowJust` "baqr"
    });

    it('should accept multiple deletes of the same char with no affect', () => {
      // let (Just newString) = integrate validDeleteOp mockWString
      // integrate validDeleteOp newString `shouldShowJust` "ar"
    });
  });
  describe('integrateAll', () => {
    it('should integrate a list of valid operations', () => {
      // let (ops, wString) = integrateAll [validInsertOp, validDeleteOp] mockWString
      // ops `shouldBe` []
      // show wString `shouldBe` "aqr"
    });

    it('should return any invalid operations', () => {
      // let (ops, wString) = integrateAll [invalidInsertOp, invalidDeleteOp] mockWString
      // ops `shouldBe` [invalidInsertOp, invalidDeleteOp]
      // show wString `shouldBe` "bar"
    });

    it('should recurse if an operation is made valid by a later operation', () => {
      // let (ops, wString) = integrateAll [invalidInsertOp, invalidDeleteOp, validInsertToValidateDelete] mockWString
      // ops `shouldBe` [invalidInsertOp]
      // show wString `shouldBe` "bar"
    });
  });
});
