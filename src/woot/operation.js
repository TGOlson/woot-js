import R from 'ramda';
import V from 'o-validator';

import {wCharSchema} from './wchar';


const INSERT_OP_TYPE = 'insert';
const DELETE_OP_TYPE = 'delete';


const operationSchema = {
  type: V.required(R.contains(R.__, [INSERT_OP_TYPE, DELETE_OP_TYPE])),
  clientId: V.required(R.is(Number)),
  wChar: V.required(V.validate(wCharSchema))
};


const makeOperation = R.curry((type, clientId, wChar) => {
  return V.validateOrThrow(operationSchema, {
    type, clientId, wChar
  });
});


const makeInsertOperation = makeOperation(INSERT_OP_TYPE);
const makeDeleteOperation = makeOperation(DELETE_OP_TYPE);


export default {
  makeInsertOperation,
  makeDeleteOperation
};
