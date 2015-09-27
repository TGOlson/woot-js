import R from 'ramda';


const INSERT_OP_TYPE = 'insert';
const DELETE_OP_TYPE = 'delete';


const makeOperation = R.curry((type, clientId, wChar) => {
  return {type, clientId, wChar};
});


const makeInsertOperation = makeOperation(INSERT_OP_TYPE);
const makeDeleteOperation = makeOperation(DELETE_OP_TYPE);


export default {
  makeInsertOperation,
  makeDeleteOperation
};
