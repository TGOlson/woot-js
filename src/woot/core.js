import R from 'ramda';

import { compareWCharIds } from './wchar';

import {
  contains,
  indexOf,
  insert,
  hideChar,
  nthVisible,
  show,
  subsection,
} from './wstring';

import type { Operation } from './operation';
import type { Optional } from './types';
import type { WString } from './wstring';
import type { WChar, WCharId } from './wchar';

type ClientId = number;


const canIntegrate = (operation: Operation, wString: WString): boolean => {
  const { type, wChar } = operation;
  switch (type) {
    case 'INSERT': {
      const containsPrev = contains(wChar.prevId, wString);
      const containsNext = contains(wChar.nextId, wString);
      return containsPrev && containsNext;
    }

    case 'DELETE': {
      return contains(wChar.id, wString);
    }

    default: throw new Error(`Invalid operation type: ${type}`);
  }
};


const integrateInsert = (prevId: WCharId, nextId: WCharId, wChar: WChar, wString: WString
): WString => {
  if (contains(wChar.id, wString)) {
    return wString;
  }

  const foundSubsection = subsection(prevId, nextId, wString);

  if (foundSubsection.length === 0) {
    const index = indexOf(nextId, wString);
    return index === null ? wString : insert(index, wChar, wString);
  }

  const newPrevId = foundSubsection[0].id;

  // if the current char id is less than the previous id
  if (compareWCharIds(wChar.id, newPrevId) === 'LT') {
    const index = indexOf(newPrevId, wString);
    return index === null ? wString : insert(index, wChar, wString);
  }

  // recurse to integrateInsert with next id in the subsection
  return integrateInsert(newPrevId, nextId, wChar, wString);
};


const integrateDelete = (wChar: WChar, wString: WString) => {
  return hideChar(wChar.id, wString);
};

const integrateOp = (operation: Operation, wString: WString): WString => {
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
  integrationFn: (_: Operation, _: WString) => Optional<WString>,
  initialOps: Array<Operation>,
  initialWString: WString
): { operations: Array<Operation>, wString: WString } => {
  // no operations have been integrated
  // and wString has its initial value
  const initialState = { operations: [], wString: initialWString };

  const integrate_ = ({ operations, wString }, op) => {
    const newString = integrationFn(op, wString);
    return newString
      ? { operations, wString: newString }
      : { operations: [...operations, op], wString };
  };

  const { operations, wString } = R.reduce(integrate_, initialState, initialOps);

  const operationsAreStable = R.length(initialOps) === R.length(operations);

  return operationsAreStable
    ? { operations, wString }
    : integrateAllWith(integrationFn, operations, wString);
};


export const integrate = (operation: Operation, wString: WString): Optional<WString> =>
  canIntegrate(operation, wString) ? integrateOp(operation, wString) : null;


// iterate through operation list until stable
// return any remaining operations, along with new string
export const integrateAll = (operations: Array<Operation>, wString: WString
): {operations: Array<Operation>, wString: WString} =>
  integrateAllWith(integrate, operations, wString);


// this function acts under the assumption that local operations have already been validated
// integrateLocal :: Operation -> WString -> WString
export const integrateLocal = integrateOp;


// this function acts under the assumption that local operations have already been validated
export const integrateAllLocal = (operations: Array<Operation>, wString: WString
): {operations: Array<Operation>, wString: WString} =>
  integrateAllWith(integrateLocal, operations, wString);


export const makeDeleteOperation = (clientId: ClientId, position: number, wString: WString
): Optional<Operation> => {
  const wChar = nthVisible(position, wString);

  return wChar ? { type: 'DELETE', clientId, wChar } : null;
};


// position based of off visible characters only
// operations should only be concerned with the visible string
export const makeInsertOperation = (
  wCharId: WCharId,
  position: number,
  alpha: string,
  wString: WString
): Optional<Operation> => {
  const numVisible = show(wString).length;

  const prev = position === 0
    ? R.head(wString)
    : nthVisible(position - 1, wString);

  const next = position === numVisible
    ? R.last(wString)
    : nthVisible(position, wString);

  if (prev && next) {
    const wChar = {
      id: wCharId,
      isVisible: true,
      alpha,
      prevId: prev.id,
      nextId: next.id,
    };

    return { type: 'INSERT', clientId: wCharId.clientId, wChar };
  }

  return null;
};
