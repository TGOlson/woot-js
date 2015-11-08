import R from 'ramda';

import type {WChar} from './wchar';

const INSERT_OP_TYPE = 'insert';
const DELETE_OP_TYPE = 'delete';

export type Operation = {
  type: string,
  clientId: number,
  wChar: WChar,
}

const makeOperation: (_:string) => (_:number) => (_:WChar) => Operation
= R.curry((type, clientId, wChar) => {
  return {type, clientId, wChar};
});


export const makeInsertOperation: (_:number) => (_:WChar) => Operation
= makeOperation(INSERT_OP_TYPE);

export const makeDeleteOperation: (_:number) => (_:WChar) => Operation
= makeOperation(DELETE_OP_TYPE);
