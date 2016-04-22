import R from 'ramda';

import Package from '../package.json';

import {
  integrateAllLocal,
  integrateAll,
  makeInsertOperation,
  makeDeleteOperation,
} from './woot/core';

import { makeEmptyWString, show } from './woot/wstring';

import * as WCharModule from './woot/wchar';
import * as WStringModule from './woot/wstring';

import type { Optional } from './woot/types';
import type { Operation } from './woot/operation';
import type { WString } from './woot/wstring';


// Types ///////////////////////////////////////////////////////////////////////////////////////////

type ClientId = number;

export type WootClient = {
  clientId: ClientId;
  clock: number;
  wString: WString;
  operationQueue: Array<Operation>;
};

// Internal Utils //////////////////////////////////////////////////////////////////////////////////

const incClock = (client: WootClient): WootClient =>
  ({ ...client, clock: client.clock + 1 });

const updateOperationQueue = (operationQueue: Array<Operation>, client: WootClient): WootClient =>
  ({ ...client, operationQueue });

const updateWString = (wString: WString, client: WootClient): WootClient =>
  ({ ...client, wString });


// identical to sendOperation, but increments the clients internal clock
// not exposed - consumers should use sendLocalDelete or sendLocalInsert
// TODO: refactor with sendOperations - lots of similar functionality
const sendLocalOperation = (client: WootClient, operation: Operation) => {
  const operations = [...client.operationQueue, operation];
  const result = integrateAllLocal(operations, client.wString);

  return incClock(
    updateWString(result.wString,
      updateOperationQueue(result.operations, client)
    )
  );
};


// Exported API ////////////////////////////////////////////////////////////////////////////////////

// Construction

// TODO: this check if the client id already exists in the provided string
// and then start the client clock at the correct value.
export const makeWootClient = (wString: WString, clientId: ClientId): WootClient =>
  ({
    clientId,
    clock: 0,
    wString,
    operationQueue: [],
  });

export const makeWootClientEmpty = (clientId: ClientId): WootClient =>
  makeWootClient(makeEmptyWString(), clientId);


// Operation Handling

// sends an operation to a woot client, returning a new woot client
// the operation will either be integrated into the woot client's string
// or it will be added to the client's interal operation queue to be tried again
export const sendOperation = (client: WootClient, operation: Operation): WootClient => {
  const operations = [...client.operationQueue, operation];
  const result = integrateAll(operations, client.wString);

  return updateWString(result.wString,
    updateOperationQueue(result.operations, client)
  );
};


export const sendOperations = (client: WootClient, operations: Array<Operation>): WootClient =>
  R.reduce(sendOperation, client, operations);

type LocalOperationResult = {
  operation: Optional<Operation>;
  client: WootClient;
};

// -- note: failed local operations can result in no-ops if the underlying operation is invalid
// -- they will not be added to a client's operation queue
// -- the assumption is that anything done locally should already be verified
// -- if the local operation was successful, the operation should be broadcasted to other clients
// sendLocalDelete :: WootClient -> Int -> {operation: Operation | null, client: WootClient}
export const sendLocalDelete = (client: WootClient, position: number): LocalOperationResult => {
  const maybeOp = makeDeleteOperation(client.clientId, position, client.wString);

  return {
    operation: maybeOp,
    client: maybeOp ? sendLocalOperation(client, maybeOp) : client,
  };
};


export const sendLocalInsert = (client: WootClient, position: number, alpha: string
): LocalOperationResult => {
  const wCharId = { clientId: client.clientId, clock: client.clock };
  const maybeOp = makeInsertOperation(wCharId, position, alpha, client.wString);

  return {
    operation: maybeOp,
    client: maybeOp ? sendLocalOperation(client, maybeOp) : client,
  };
};


// Utilities

export const showClientString = (client: WootClient): string => show(client.wString);


// Re-exported submodules

export {
  WCharModule as WChar,
  WStringModule as WString,
};


// Library Metadata

export const __version = Package.version;
