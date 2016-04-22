import { wCharBeginning, wCharEnding } from '../src/woot/wchar';

import type { WString } from '../src/woot/wstring';
import type { Operation } from '../src/woot/operation';

export const mockWString: WString = [
  wCharBeginning,
  {
    id: { clientId: 0, clock: 0 },
    isVisible: true,
    alpha: 'b',
    prevId: { clientId: -1, clock: 0 },
    nextId: { clientId: 0, clock: 1 },
  },
  {
    id: { clientId: 0, clock: 1 },
    isVisible: false,
    alpha: 'x',
    prevId: { clientId: 0, clock: 0 },
    nextId: { clientId: 0, clock: 2 },
  },
  {
    id: { clientId: 0, clock: 2 },
    isVisible: true,
    alpha: 'a',
    prevId: { clientId: 0, clock: 1 },
    nextId: { clientId: 0, clock: 3 },
  },
  {
    id: { clientId: 0, clock: 3 },
    isVisible: true,
    alpha: 'r',
    prevId: { clientId: 0, clock: 2 },
    nextId: { clientId: -1, clock: 1 },
  },
  wCharEnding,
];


export const validInsertOp: Operation = {
  type: 'INSERT',
  clientId: 0,
  wChar: {
    id: { clientId: 0, clock: 10 },
    isVisible: true,
    alpha: 'q',
    prevId: { clientId: 0, clock: 2 },
    nextId: { clientId: 0, clock: 3 },
  },
};


export const validInsertOpAmbiguous: Operation = {
  type: 'INSERT',
  clientId: 0,
  wChar: {
    // cheating on the id, but fits into the string in a convenient way
    id: { clientId: 0, clock: 1.5 },
    isVisible: true,
    alpha: 'W',
    prevId: { clientId: -1, clock: 0 },
    nextId: { clientId: -1, clock: 1 },
  },
};


export const invalidInsertOp: Operation = {
  type: 'INSERT',
  clientId: 0,
  wChar: {
    id: { clientId: 0, clock: 10 },
    isVisible: true,
    alpha: '#',
    prevId: { clientId: 0, clock: 10 },
    nextId: { clientId: 0, clock: 50 },
  },
};


export const validDeleteOp: Operation = {
  type: 'DELETE',
  clientId: 0,
  wChar: {
    id: { clientId: 0, clock: 0 },
    isVisible: true,
    alpha: 'b',
    prevId: { clientId: 0, clock: -1 },
    nextId: { clientId: 0, clock: 1 },
  },
};


// -- will become valid after validInsertToValidateDelete
export const invalidDeleteOp: Operation = {
  type: 'DELETE',
  clientId: 0,
  wChar: {
    id: { clientId: 0, clock: 50 },
    isVisible: true,
    alpha: 'M',
    prevId: { clientId: 0, clock: 0 },
    nextId: { clientId: 0, clock: 2 },
  },
};


// -- will make invalid delete operation valid
export const validInsertToValidateDelete: Operation = {
  type: 'INSERT',
  clientId: 0,
  wChar: {
    id: { clientId: 0, clock: 50 },
    isVisible: true,
    alpha: 'M',
    prevId: { clientId: 0, clock: 0 },
    nextId: { clientId: 0, clock: 2 },
  },
};


// will become valid after validInsertToValidateDelete
export const validInsertAfterQueuedInsert: Operation = {
  type: 'INSERT',
  clientId: 0,
  wChar: {
    id: { clientId: 0, clock: 100 },
    isVisible: true,
    alpha: '#',
    prevId: { clientId: 0, clock: 50 },
    nextId: { clientId: 0, clock: 3 },
  },
};


// this insert should get run first
export const ambiguousEmptyStringInsertA: Operation = {
  type: 'INSERT',
  clientId: 0,
  wChar: {
    id: { clientId: 1, clock: 0 },
    isVisible: true,
    alpha: 'W',
    prevId: { clientId: -1, clock: 0 },
    nextId: { clientId: -1, clock: 1 },
  },
};

// this insert should get run second, but the wChar should proceed the previous insert
export const ambiguousEmptyStringInsertB: Operation = {
  type: 'INSERT',
  clientId: 1,
  wChar: {
    id: { clientId: 0, clock: 0 },
    isVisible: true,
    alpha: 'X',
    prevId: { clientId: -1, clock: 0 },
    nextId: { clientId: -1, clock: 1 },
  },
};
