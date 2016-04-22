import {
  show,
  insert,
  subsection,
} from './wstring';

import { mockWString } from '../../spec/mock-data';

describe('WString', () => {
  describe('show', () => {
    it('should convert a woot string to a generic string', () => {
      expect(show(mockWString)).toBe('bar');
    });
  });

  describe('insert', () => {
    it('should insert a character before the specified index', () => {
      const newChar = {
        id: { clientId: 0, clock: 4 },
        isVisible: true,
        alpha: 'P',
        prevId: { clientId: 0, clock: 1 },
        nextId: { clientId: 0, clock: 2 },
      };

      const newString = insert(4, newChar, mockWString);

      expect(show(newString)).toBe('baPr');
    });
  });

  describe('subsection', () => {
    it('should return an empty WString when passed ids that do not make a subsection', () => {
      const section = subsection(
        { clientId: -1, clock: 1 },
        { clientId: 0, clock: 1 },
        mockWString
      );

      expect(section).toEqual([]);
    });

    it('should return a subsection when passed valid ids', () => {
      const section = subsection(
        { clientId: 0, clock: 1 },
        { clientId: -1, clock: 1 },
        mockWString
      );

      expect(show(section)).toEqual('ar');
    });
  });
});
