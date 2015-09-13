import Woot from '../';

import MockData from './mock-data';

const wootClient = Woot.makeWootClient(MockData.mockWString, 0);

describe('Woot', () => {
  describe('sendOperation', () => {
    it('should pass an operation to the woot client and return the result', () => {
      const result = Woot.sendOperation(wootClient, MockData.validInsertOp);
      expect(Woot.show(result.wString)).toBe('baqr');
    });
  });
  //
  //   it('should queue failed operations to try later', function() {
  //     let client = sendOperation wootClient invalidDeleteOp
  //     show (wootClientString client) `shouldBe` "bar"
  //     let client' = sendOperation client validInsertToValidateDelete
  //     show (wootClientString client') `shouldBe` "bar" -- would be "bMar" if original delete didnt go
  //   });
  // });
  //
  // describe('sendOperations', function() {
  //   it('should process a queue of operations', function() {
  //     let ops = [ validInsertOp
  //               -- will become valid after validInsertToValidateDelete
  //               , validInsertAfterQueuedInsert
  //               , validInsertOpAmbiguous
  //               , invalidInsertOp
  //               , validDeleteOp
  //               -- will become valid after validInsertToValidateDelete
  //               , invalidDeleteOp
  //               -- will make invalid delete operation valid
  //               , validInsertToValidateDelete
  //               ]
  //
  //     let client = sendOperations wootClient ops
  //     show (wootClientString client) `shouldBe` "aq#rW"
  //   });
  // });
  //
  // describe('sendLocalInsert', function() {
  //   it('should insert a new character', function() {
  //       let (_, client) = sendLocalInsert (makeWootClientEmpty 0) 0 'T'
  //       let (_, client') = sendLocalInsert client 1 'y'
  //       show (wootClientString client') `shouldBe` "Ty"
  //   });
  //
  //   it('should increment the client clock', function() {
  //     let (_, client) = sendLocalInsert (makeWootClientEmpty 0) 0 'T'
  //     let (_, client') = sendLocalInsert client 1 'y'
  //     wootClientClock client' `shouldBe` 2
  //   });
  //
  //   it('should return the original client when passed an invalid position', function() {
  //     let (_, client) = sendLocalInsert wootClient 100 'x'
  //     client `shouldBe` wootClient
  //   });
  //
  // describe('sendLocalDelete', function() {
  //   it('should delete a character', function() {
  //     let (_, client) = sendLocalDelete wootClient 2
  //     let (_, client') = sendLocalDelete client 1
  //     show (wootClientString client') `shouldBe` "b"
  //   });
  //
  //   it('should increment the client clock', function() {
  //     let (_, client) = sendLocalDelete wootClient 2
  //     let (_, client') = sendLocalDelete client 1
  //     wootClientClock client' `shouldBe` 2
  //   });
  //
  //   it('should return the original client when passed an invalid position', function() {
  //     let (_, client) = sendLocalDelete wootClient 100
  //     client `shouldBe` wootClient
  //   });
});
