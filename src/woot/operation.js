import R from 'ramda';


const makeOperation = R.curry((type, clientId, wChar) => {
  return {
    type: type,
    clientId: clientId,
    wChar: wChar
  };
});

const makeInsertOperation = makeOperation('insert');
const makeDeleteOperation = makeOperation('delete');

module.exports = {
  makeInsertOperation,
  makeDeleteOperation
};
