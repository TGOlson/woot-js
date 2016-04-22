import R from 'ramda';


import * as Operation from './operation';
import * as WChar from './wchar';
import * as WString from './wstring';

type ClientId = number;


const canIntegrate = (operation: Operation.Operation, wString: WString.WString): boolean => {
  const { type, wChar } = operation;
  switch (type) {
    case 'INSERT': {
      const containsPrev = WString.contains(wChar.prevId, wString);
      const containsNext = WString.contains(wChar.nextId, wString);
      return containsPrev && containsNext;
    }

    case 'DELETE': {
      return WString.contains(wChar.id, wString);
    }

    default: throw new Error(`Invalid operation type: ${type}`);
  }
};


const integrateInsert = (
  prevId: WChar.WCharId,
  nextId: WChar.WCharId,
  wChar: WChar.WChar,
  wString: WString.WString
): WString.WString => {
  if (WString.contains(wChar.id, wString)) {
    return wString;
  }

  const subsection = WString.subsection(prevId, nextId, wString);

  if (subsection.length === 0) {
    const index = WString.indexOf(nextId, wString);
    return WString.insert(index, wChar, wString);
  }

  const newPrevId = subsection[0].id;

  // if the current char id is less than the previous id
  if (WChar.compareWCharIds(wChar.id, newPrevId) === 'LT') {
    const index = WString.indexOf(newPrevId, wString);
    return WString.insert(index, wChar, wString);
  }

  // recurse to integrateInsert with next id in the subsection
  return integrateInsert(newPrevId, nextId, wChar, wString);
};


const integrateDelete = (wChar: WChar.WChar, wString: WString.WString) => {
  return WString.hideChar(wChar.id, wString);
};

const integrateOp = (operation: Operation.Operation, wString: WString.WString): WString.WString => {
  const { type, wChar } = operation;
  switch (type) {
    case 'INSERT': {
      return integrateInsert(wChar.prevId, wChar.nextId, wChar, wString);
    }

    case 'DELETE': {
      return integrateDelete(wChar, wString);
    }

    default: throw new Error(`Invalid operation type: ${type}`);
  }
};


const integrateAllWith = (
  integrationFn: (_: Operation.Operation, _: WString.WString) => ?WString.WString,
  initialOps: Array<Operation.Operation>,
  initialWString: WString.WString
): {operations: Array<Operation.Operation>, wString: WString.WString} => {
  // no operations have been integrated
  // and wString has its initial value
  const initialState = { operations: [], wString: initialWString };

  const integrate_ = ({ operations, wString }, op) => {
    const newString = integrationFn(op, wString);
    return newString
      ? { operations, wString: newString }
      : { operations: R.append(op, operations), wString };
  };

  const { operations, wString } = R.reduce(integrate_, initialState, initialOps);

  const operationsAreStable = R.length(initialOps) === R.length(operations);

  return operationsAreStable
    ? { operations, wString }
    : integrateAllWith(integrationFn, operations, wString);
};


export const integrate = (
  operation: Operation.Operation,
  wString: WString.WString
): ?WString.WString => {
  return canIntegrate(operation, wString) ? integrateOp(operation, wString) : null;
};


// iterate through operation list until stable
// return any remaining operations, along with new string
export const integrateAll = (
  operations: Array<Operation.Operation>,
  wString: WString.WString
): {operations: Array<Operation.Operation>, wString: WString.WString} =>
  integrateAllWith(integrate, operations, wString);


// this function acts under the assumption that local operations have already been validated
// integrateLocal :: Operation -> WString -> WString
export const integrateLocal = integrateOp;


// this function acts under the assumption that local operations have already been validated
export const integrateAllLocal = (
  operations: Array<Operation.Operation>,
  wString: WString.WString
): {operations: Array<Operation.Operation>, wString: WString.WString} =>
  integrateAllWith(integrateLocal, operations, wString);


export const makeDeleteOperation = (
  clientId: ClientId,
  position: number,
  wString: WString.WString
): ?Operation.Operation => {
  const wChar = WString.nthVisible(position, wString);

  return wChar ? Operation.makeDeleteOperation(clientId, wChar) : null;
};


// position based of off visible characters only
// operations should only be concerned with the visible string
export const makeInsertOperation = (
  wCharId: WChar.WCharId
  , position: number
  , alpha: string
  , wString: WString.WString
): ?Operation.Operation => {
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
      nextId: next.id,
    });

    return Operation.makeInsertOperation(wCharId.clientId, wChar);
  }

  return null;
};
