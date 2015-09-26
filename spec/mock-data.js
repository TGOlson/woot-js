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
//
//
//
// validDeleteOp :: Operation
// validDeleteOp = Operation Delete 0
//     (WChar (WCharId 0 0) True 'b' (WCharId 0 (-1)) (WCharId 0 1))

const validDeleteOp = Operation.makeDeleteOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 0),
  isVisible: true,
  alpha: 'b',
  prevId: WChar.makeWCharId(0, -1),
  nextId: WChar.makeWCharId(0, 1)
}));

const invalidDeleteOp = Operation.makeDeleteOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 50),
  isVisible: true,
  alpha: 'M',
  prevId: WChar.makeWCharId(0, -1),
  nextId: WChar.makeWCharId(0, 1)
}));
//
// -- will become valid after validInsertToValidateDelete
// invalidDeleteOp :: Operation
// invalidDeleteOp = Operation Delete 0
//     (WChar (WCharId 0 50) True 'M' (WCharId 0 (-1)) (WCharId 0 1))
//
//
// -- will make invalid delete operation valid
// validInsertToValidateDelete :: Operation
// validInsertToValidateDelete = Operation Insert 0
//     (WChar (WCharId 0 50) True 'M' (WCharId 0 0) (WCharId 0 2))
const validInsertToValidateDelete = Operation.makeInsertOperation(0, WChar.makeWChar({
  id: WChar.makeWCharId(0, 50),
  isVisible: true,
  alpha: 'M',
  prevId: WChar.makeWCharId(0, 0),
  nextId: WChar.makeWCharId(0, 2)
}));
//
// -- will become valid after validInsertToValidateDelete
// validInsertAfterQueuedInsert :: Operation
// validInsertAfterQueuedInsert = Operation Insert 0
//     (WChar (WCharId 0 100) True '#' (WCharId 0 50) (WCharId 0 3))

export default {
  mockWString,
  validInsertOp,
  validInsertOpAmbiguous,
  validDeleteOp,
  invalidInsertOp,
  invalidDeleteOp,
  validInsertToValidateDelete
};
