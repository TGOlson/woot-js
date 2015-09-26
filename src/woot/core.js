// module Data.Woot.Core
//     ( integrate
//     , integrateAll
//     , makeDeleteOperation
//     , makeInsertOperation
//     ) where
//
//
// import Control.Applicative -- keep for ghc <7.10
// import Data.Maybe (fromJust)
//
// import Data.Woot.Operation
// import Data.Woot.WChar
// import Data.Woot.WString
import R from 'ramda';

import WString from './wstring';
import WChar from './wchar';

// matchOperationType :: {OperationType: *} -> (Operation -> * | Error)
const matchOperationType = (dict) => {
  return (...args) => {
    const type = R.path(['0', 'type'], args);
    if (R.has(type, dict)) {
      return R.prop(type, dict).apply(null, args);
    }

    throw new Error('Invalid operation type: ' + type);
  };
};

// canIntegrate :: Operation -> WString -> Bool
const canIntegrate = matchOperationType({
  insert: ({wChar}, wString) => {
    const containsPrev = WString.contains(wChar.prevId, wString);
    const containsNext = WString.contains(wChar.nextId, wString);
    return containsPrev && containsNext;
  },
  'delete': ({wChar}, wString) => {
    return WString.contains(wChar.id, wString);
  }
});


// integrateOp :: Operation -> WString -> WString
const integrateOp = matchOperationType({
  insert: ({wChar}, wString) => {
    return integrateInsert(wChar.prevId, wChar.nextId, wChar, wString);
  },
  'delete': ({wChar}, wString) => {
    return integrateDelete(wChar, wString);
  }
});

// integrate :: Operation -> WString -> WString | null
const integrate = (operation, wString) => {
  return canIntegrate(operation, wString) ? integrateOp(operation, wString) : null;
};

//
// -- iterate through operation list until stable
// -- return any remaining operations, along with new string
// integrateAll :: [Operation] -> WString -> ([Operation], WString)
// integrateAll ops ws = if length ops == length newOps then result
//     else integrateAll newOps newString
//   where
//     result@(newOps, newString)  = foldl integrate' ([], ws) ops
//     integrate' (ops', s) op = maybe (ops' ++ [op], s) (ops',) (integrate op s)

// integrateAll :: [Operation] -> WString -> ([Operation], WString)
const integrateAll = function(operations, wString) {
  const integrate_ = ([ops, s], op) => {
    const res = integrate(op, s);
    return res ? [ops, res] : [R.append(op, ops), s];
  };

  const [newOps, s] = R.reduce(integrate_, [[], wString], operations);

  return R.length(operations) === R.length(newOps) ? [newOps, s] : integrateAll(newOps, s);
};


//
// integrateInsert :: WCharId -> WCharId -> WChar -> WString -> WString
const integrateInsert = (prevId, nextId, wChar, wString) => {
  if (WString.contains(wChar.id, wString)) {
    return wString;
  }

  const subsection = WString.subsection(prevId, nextId, wString);

  if (R.isEmpty(subsection)) {
    const index = WString.indexOf(nextId, wString);
    return WString.insert(index, wChar, wString);
  }

  // if the current char id is less than the previous id
  if (WChar.compareWCharIds(wChar.id, prevId) === -1) {
    const index = WString.indexOf(prevId, wString);
    return WString.insert(index, wChar, wString);
  }

  // recurse to integrateInsert with next id in the subsection
  const newPrevId = R.head(subsection).id;
  return integrateInsert(newPrevId, nextId, wChar, wString);
};

//
//
// integrateDelete :: WChar -> WString -> WString
const integrateDelete = ({id}, wString) => {
  return WString.hideChar(id, wString);
};
//
// makeDeleteOperation :: ClientId -> Int -> WString -> Maybe Operation
// makeDeleteOperation cid pos ws = Operation Delete cid <$> nthVisible pos ws
//
//
// -- position based of off visible characters only
// -- operations should only be concerned with the visible string
// makeInsertOperation :: WCharId -> Int -> Char -> WString -> Maybe Operation
// makeInsertOperation (WCharId cid clock) pos a ws = Operation Insert cid <$> do
//     let numVis = length $ show ws
//
//     -- first check if we are trying to insert at the very beginning of the string
//     prev <- if pos == 0 then beginningChar else nthVisible (pos - 1) ws
//
//     -- also see if the insert is being done at the very end of the string
//     next <- if pos == numVis then endingChar else nthVisible pos ws
//     return $ WChar (WCharId cid clock) True a (wCharId prev) (wCharId next)
//   where
//     beginningChar = ws !? 0
//     endingChar = ws !? (lengthWS ws - 1)

export default {
  integrate,
  integrateAll
};
