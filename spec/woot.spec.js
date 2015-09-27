import Woot from '../';

import {
  mockWString,
  validInsertOp,
  validInsertOpAmbiguous,
  validDeleteOp,
  invalidInsertOp,
  invalidDeleteOp,
  validInsertToValidateDelete,
  validInsertAfterQueuedInsert
} from './mock-data';

const wootClient = Woot.makeWootClient(mockWString, 0);


describe('Woot', () => {
  describe('sendOperation', () => {
    it('should pass an operation to the woot client and return the result', () => {
      const client = Woot.sendOperation(wootClient, validInsertOp);
      expect(Woot.showClientString(client)).toBe('baqr');
    });

    it('should queue failed operations to try later', () => {
      let clientA = Woot.sendOperation(wootClient, invalidDeleteOp);
      expect(clientA.operationQueue.length).toBe(1);
      expect(Woot.showClientString(clientA)).toBe('bar');

      let clientB = Woot.sendOperation(clientA, validInsertToValidateDelete);
      expect(clientB.operationQueue.length).toBe(0);

      // would be "bMar" if original delete didnt go
      expect(Woot.showClientString(clientB)).toBe('bar');
    });
  });

  describe('sendOperations', () => {
    it('should process a queue of operations', () => {
      const ops = [
        validInsertOp,
        // will become valid after validInsertToValidateDelete
        validInsertAfterQueuedInsert,
        validInsertOpAmbiguous,
        invalidInsertOp,
        validDeleteOp,
        // will become valid after validInsertToValidateDelete
        invalidDeleteOp,
        // will make invalid delete operation valid
        validInsertToValidateDelete
      ];

      let client = Woot.sendOperations(wootClient, ops);
      expect(Woot.showClientString(client)).toBe('Waq#r');
    });
  });

  describe('sendLocalInsert', () => {
    it('should insert a new character', () => {
      const {client} = Woot.sendLocalInsert(Woot.makeWootClientEmpty(0), 0, 'T');
      const result = Woot.sendLocalInsert(client, 1, 'y');
      expect(Woot.showClientString(result.client)).toBe('Ty');
    });

    it('should increment the client clock', () => {
      const {client} = Woot.sendLocalInsert(Woot.makeWootClientEmpty(0), 0, 'T');
      const result = Woot.sendLocalInsert(client, 1, 'y');
      expect(result.client.clock).toBe(2);
    });

    it('should return the original client when passed an invalid position', () => {
      const {client} = Woot.sendLocalInsert(wootClient, 100, 'x');
      expect(client).toEqual(wootClient);
    });
  });

  describe('sendLocalDelete', () => {
    it('should delete a character', () => {
      const {client} = Woot.sendLocalDelete(wootClient, 2);
      const result = Woot.sendLocalDelete(client, 1);

      expect(Woot.showClientString(result.client)).toBe('b');
    });

    it('should increment the client clock', () => {
      const {client} = Woot.sendLocalDelete(wootClient, 2);
      const result = Woot.sendLocalDelete(client, 1);

      expect(result.client.clock).toBe(2);
    });

    it('should return the original client when passed an invalid position', () => {
      const {client} = Woot.sendLocalDelete(wootClient, 100);
      expect(client).toEqual(wootClient);
    });
  });
});
