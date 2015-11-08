import * as Operation from '../src/woot/operation';
import * as WChar from '../src/woot/wchar';


export const mockWString = [
  WChar.wCharBeginning,
  WChar.makeWChar({
    id: WChar.makeWCharId(0, 0),
    isVisible: true,
    alpha: 'b',
    prevId: WChar.makeWCharId(-1, 0),
    nextId: WChar.makeWCharId(0, 1),
  }),
  WChar.makeWChar({
    id: WChar.makeWCharId(0, 1),
    isVisible: false,
    alpha: 'x',
    prevId: WChar.makeWCharId(0, 0),
    nextId: WChar.makeWCharId(0, 2),
  }),
  WChar.makeWChar({
    id: WChar.makeWCharId(0, 2),
    isVisible: true,
    alpha: 'a',
    prevId: WChar.makeWCharId(0, 1),
    nextId: WChar.makeWCharId(0, 3),
  }),
  WChar.makeWChar({
    id: WChar.makeWCharId(0, 3),
    isVisible: true,
    alpha: 'r',
    prevId: WChar.makeWCharId(0, 2),
    nextId: WChar.makeWCharId(-1, 1),
  }),
  WChar.wCharEnding,
];


export const validInsertOp = Operation.makeInsertOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 10),
  isVisible: true,
  alpha: 'q',
  prevId: WChar.makeWCharId(0, 2),
  nextId: WChar.makeWCharId(0, 3),
}));


export const validInsertOpAmbiguous = Operation.makeInsertOperation(0, WChar.makeWChar({
  // cheating on the id, but fits into the string in a convenient way
  id: WChar.makeWCharId(0, 1.5),
  isVisible: true,
  alpha: 'W',
  prevId: WChar.makeWCharId(-1, 0),
  nextId: WChar.makeWCharId(-1, 1),
}));


export const invalidInsertOp = Operation.makeInsertOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 10),
  isVisible: true,
  alpha: '#',
  prevId: WChar.makeWCharId(0, 10),
  nextId: WChar.makeWCharId(0, 50),
}));


export const validDeleteOp = Operation.makeDeleteOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 0),
  isVisible: true,
  alpha: 'b',
  prevId: WChar.makeWCharId(0, -1),
  nextId: WChar.makeWCharId(0, 1),
}));


// -- will become valid after validInsertToValidateDelete
export const invalidDeleteOp = Operation.makeDeleteOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 50),
  isVisible: true,
  alpha: 'M',
  prevId: WChar.makeWCharId(0, 0),
  nextId: WChar.makeWCharId(0, 2),
}));


// -- will make invalid delete operation valid
export const validInsertToValidateDelete = Operation.makeInsertOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 50),
  isVisible: true,
  alpha: 'M',
  prevId: WChar.makeWCharId(0, 0),
  nextId: WChar.makeWCharId(0, 2),
}));


// will become valid after validInsertToValidateDelete
export const validInsertAfterQueuedInsert = Operation.makeInsertOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 100),
  isVisible: true,
  alpha: '#',
  prevId: WChar.makeWCharId(0, 50),
  nextId: WChar.makeWCharId(0, 3),
}));


// this insert should get run first
export const ambiguousEmptyStringInsertA = Operation.makeInsertOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(1, 0),
  isVisible: true,
  alpha: 'W',
  prevId: WChar.makeWCharId(-1, 0),
  nextId: WChar.makeWCharId(-1, 1),
}));

// this insert should get run second, but the wChar should preceed the previous insert
export const ambiguousEmptyStringInsertB = Operation.makeInsertOperation(1, WChar.makeWChar({
  id: WChar.makeWCharId(0, 0),
  isVisible: true,
  alpha: 'X',
  prevId: WChar.makeWCharId(-1, 0),
  nextId: WChar.makeWCharId(-1, 1),
}));
