import Operation from '../dist/woot/operation';
import WChar from '../dist/woot/wchar';


const mockWString = [
  WChar.wCharBeginning,
  WChar.makeWChar({
    id: WChar.makeWCharId(0, 0),
    isVisible: true,
    alpha: 'b',
    prevId: WChar.makeWCharId(-1, 0),
    nextId: WChar.makeWCharId(0, 1)
  }),
  WChar.makeWChar({
    id: WChar.makeWCharId(0, 1),
    isVisible: false,
    alpha: 'x',
    prevId: WChar.makeWCharId(0, 0),
    nextId: WChar.makeWCharId(0, 2)
  }),
  WChar.makeWChar({
    id: WChar.makeWCharId(0, 2),
    isVisible: true,
    alpha: 'a',
    prevId: WChar.makeWCharId(0, 1),
    nextId: WChar.makeWCharId(0, 3)
  }),
  WChar.makeWChar({
    id: WChar.makeWCharId(0, 3),
    isVisible: true,
    alpha: 'r',
    prevId: WChar.makeWCharId(0, 2),
    nextId: WChar.makeWCharId(-1, 1)
  }),
  WChar.wCharEnding
];


const validInsertOp = Operation.makeInsertOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 10),
  isVisible: true,
  alpha: 'q',
  prevId: WChar.makeWCharId(0, 2),
  nextId: WChar.makeWCharId(0, 3)
}));


const validInsertOpAmbiguous = Operation.makeInsertOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(1, 0),
  isVisible: true,
  alpha: 'W',
  prevId: WChar.makeWCharId(-1, 0),
  nextId: WChar.makeWCharId(-1, 1)
}));


const invalidInsertOp = Operation.makeInsertOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 10),
  isVisible: true,
  alpha: '#',
  prevId: WChar.makeWCharId(0, 10),
  nextId: WChar.makeWCharId(0, 50)
}));


const validDeleteOp = Operation.makeDeleteOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 0),
  isVisible: true,
  alpha: 'b',
  prevId: WChar.makeWCharId(0, -1),
  nextId: WChar.makeWCharId(0, 1)
}));


// -- will become valid after validInsertToValidateDelete
const invalidDeleteOp = Operation.makeDeleteOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 50),
  isVisible: true,
  alpha: 'M',
  prevId: WChar.makeWCharId(0, 0),
  nextId: WChar.makeWCharId(0, 2)
}));


// -- will make invalid delete operation valid
const validInsertToValidateDelete = Operation.makeInsertOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 50),
  isVisible: true,
  alpha: 'M',
  prevId: WChar.makeWCharId(0, 0),
  nextId: WChar.makeWCharId(0, 2)
}));


// will become valid after validInsertToValidateDelete
const validInsertAfterQueuedInsert = Operation.makeInsertOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 100),
  isVisible: true,
  alpha: '#',
  prevId: WChar.makeWCharId(0, 50),
  nextId: WChar.makeWCharId(0, 3)
}));


export default {
  mockWString,
  validInsertOp,
  validInsertOpAmbiguous,
  validDeleteOp,
  invalidInsertOp,
  invalidDeleteOp,
  validInsertToValidateDelete,
  validInsertAfterQueuedInsert
};
