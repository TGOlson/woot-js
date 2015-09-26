// module MockData where
//
//
// import Data.Woot.Operation
// import Data.Woot.WChar
// import Data.Woot.WString
//
// import Operation from '../dist/woot/operation';
import WChar from '../dist/woot/wchar';
//
// mockWString :: WString
// mockWString = fromList [
//       wCharBeginning
//     , WChar (WCharId 0 0) True  'b' (WCharId (-1) 0) (WCharId 0 1)
//     , WChar (WCharId 0 1) False 'x' (WCharId 0 0)    (WCharId 0 2)
//     , WChar (WCharId 0 2) True  'a' (WCharId 0 1)    (WCharId 0 3)
//     , WChar (WCharId 0 3) True  'r' (WCharId 0 2)    (WCharId (-1) 1)
//     , wCharEnding
//     ]
const mockWString = [
  WChar.wCharBeginning,
  WChar.makeWChar({
    id: {clientId: 0, clock: 0},
    isVisible: true,
    alpha: 'b',
    prevId: {clientId: -1, clock: 0},
    nextId: {clientId: 0, clock: 1}
  }),
  WChar.makeWChar({
    id: {clientId: 0, clock: 1},
    isVisible: false,
    alpha: 'x',
    prevId: {clientId: 0, clock: 0},
    nextId: {clientId: 0, clock: 2}
  }),
  WChar.makeWChar({
    id: {clientId: 0, clock: 2},
    isVisible: true,
    alpha: 'a',
    prevId: {clientId: 0, clock: 1},
    nextId: {clientId: 0, clock: 3}
  }),
  WChar.makeWChar({
    id: {clientId: 0, clock: 3},
    isVisible: true,
    alpha: 'r',
    prevId: {clientId: 0, clock: 2},
    nextId: {clientId: -1, clock: 1}
  }),
  WChar.wCharEnding
];
//
//
// validInsertOp :: Operation
// validInsertOp = Operation Insert 0
    // (WChar (WCharId 0 10) True 'q' (WCharId 0 2) (WCharId 0 3))
// const validInsertOp = Operation.makeInsertOperation(0, WChar.makeWChar({
//   id: {},
//   visible: true,
//   alpha: 'a',
//   prevId: {},
//   nextId: {}
// }));
//
//
// validInsertOpAmbiguous :: Operation
// validInsertOpAmbiguous = Operation Insert 0
//     (WChar (WCharId 1 0) True 'W' (WCharId (-1) 0) (WCharId (-1) 1))
//
//
// invalidInsertOp :: Operation
// invalidInsertOp = Operation Insert 0
//     (WChar (WCharId 0 10) True '#' (WCharId 0 10) (WCharId 0 50))
//
//
//
// validDeleteOp :: Operation
// validDeleteOp = Operation Delete 0
//     (WChar (WCharId 0 0) True 'b' (WCharId 0 (-1)) (WCharId 0 1))
//
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
//
//
// -- will become valid after validInsertToValidateDelete
// validInsertAfterQueuedInsert :: Operation
// validInsertAfterQueuedInsert = Operation Insert 0
//     (WChar (WCharId 0 100) True '#' (WCharId 0 50) (WCharId 0 3))

export default {
  mockWString
  // validInsertOp
};
