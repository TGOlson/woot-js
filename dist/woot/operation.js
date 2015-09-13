'use strict';

var R = require('ramda');

var makeOperation = R.curry(function (type, clientId, wChar) {
  return {
    type: type,
    clientId: clientId,
    wChar: wChar
  };
});

var makeInsertOperation = makeOperation('insert');
var makeDeleteOperation = makeOperation('delete');

module.exports = {
  makeInsertOperation: makeInsertOperation,
  makeDeleteOperation: makeDeleteOperation
};
//# sourceMappingURL=../woot/operation.js.map