'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _oValidator = require('o-validator');

var _oValidator2 = _interopRequireDefault(_oValidator);

var _wchar = require('./wchar');

var INSERT_OP_TYPE = 'insert';
var DELETE_OP_TYPE = 'delete';

var operationSchema = {
  type: _oValidator2['default'].required(_ramda2['default'].contains(_ramda2['default'].__, [INSERT_OP_TYPE, DELETE_OP_TYPE])),
  clientId: _oValidator2['default'].required(_ramda2['default'].is(Number)),
  wChar: _oValidator2['default'].required(_oValidator2['default'].validate(_wchar.wCharSchema))
};

var makeOperation = _ramda2['default'].curry(function (type, clientId, wChar) {
  return _oValidator2['default'].validateOrThrow(operationSchema, {
    type: type, clientId: clientId, wChar: wChar
  });
});

var makeInsertOperation = makeOperation(INSERT_OP_TYPE);
var makeDeleteOperation = makeOperation(DELETE_OP_TYPE);

exports['default'] = {
  makeInsertOperation: makeInsertOperation,
  makeDeleteOperation: makeDeleteOperation
};
module.exports = exports['default'];
//# sourceMappingURL=../woot/operation.js.map