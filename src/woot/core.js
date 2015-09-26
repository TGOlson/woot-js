import R from 'ramda';


import Operation from './operation';
import WChar from './wchar';
import WString from './wstring';


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


// integrateDelete :: WChar -> WString -> WString
const integrateDelete = ({id}, wString) => {
  return WString.hideChar(id, wString);
};


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


// iterate through operation list until stable
// return any remaining operations, along with new string
// integrateAll :: [Operation] -> WString -> {operations: [Operation], wString: WString}
const integrateAll = (initialOps, initialWString) => {
  // no operations have been integrated
  // and wString has its initial value
  const initialState = {operations: [], wString: initialWString};

  const integrate_ = ({operations, wString}, op) => {
    const newString = integrate(op, wString);
    return newString
      ? {operations, wString: newString}
      : {operations: R.append(op, operations), wString};
  };

  const {operations, wString} = R.reduce(integrate_, initialState, initialOps);

  const operationsAreStable = R.length(initialOps) === R.length(operations);
  return operationsAreStable ? {operations, wString} : integrateAll(operations, wString);
};


// makeDeleteOperation :: ClientId -> Int -> WString -> Operation | null
const makeDeleteOperation = (clientId, position, wString) => {
  const wChar = WString.nthVisible(position, wString);

  return wChar ? Operation.makeDeleteOperation(clientId, wChar) : null;
};


// position based of off visible characters only
// operations should only be concerned with the visible string
// makeInsertOperation :: WCharId -> Int -> Char -> WString -> Operation | null
const makeInsertOperation = (wCharId, position, alpha, wString) => {
  const numVisible = WString.show(wString).length;

  const prev = position === 0
    ? R.head(wString)
    : WString.nthVisible(position - 1, wString);

  const next = position === numVisible
    ? R.last(wString)
    : WString.nthVisible(position, wString);

  if (prev && next) {
    const wChar = WChar.makeWChar({
      id: wCharId,
      isVisible: true,
      alpha,
      prevId: prev.id,
      nextId: next.id
    });

    return Operation.makeInsertOperation(wCharId.clientId, wChar);
  }

  return null;
};


export default {
  integrate,
  integrateAll,
  makeInsertOperation,
  makeDeleteOperation
};
