'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var makeOperation = _ramda2['default'].curry(function (type, clientId, wChar) {
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