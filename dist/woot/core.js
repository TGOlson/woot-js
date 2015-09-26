'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _wstring = require('./wstring');

var _wstring2 = _interopRequireDefault(_wstring);

var _wchar = require('./wchar');

var _wchar2 = _interopRequireDefault(_wchar);

// matchOperationType :: {OperationType: *} -> (Operation -> * | Error)
var matchOperationType = function matchOperationType(dict) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var type = _ramda2['default'].path(['0', 'type'], args);
    if (_ramda2['default'].has(type, dict)) {
      return _ramda2['default'].prop(type, dict).apply(null, args);
    }

    throw new Error('Invalid operation type: ' + type);
  };
};

// canIntegrate :: Operation -> WString -> Bool
var canIntegrate = matchOperationType({
  insert: function insert(_ref, wString) {
    var wChar = _ref.wChar;

    var containsPrev = _wstring2['default'].contains(wChar.prevId, wString);
    var containsNext = _wstring2['default'].contains(wChar.nextId, wString);
    return containsPrev && containsNext;
  },
  'delete': function _delete(_ref2, wString) {
    var wChar = _ref2.wChar;

    return _wstring2['default'].contains(wChar.id, wString);
  }
});

// integrateInsert :: WCharId -> WCharId -> WChar -> WString -> WString
var integrateInsert = function integrateInsert(_x, _x2, _x3, _x4) {
  var _again = true;

  _function: while (_again) {
    var prevId = _x,
        nextId = _x2,
        wChar = _x3,
        wString = _x4;
    subsection = index = index = newPrevId = undefined;
    _again = false;

    if (_wstring2['default'].contains(wChar.id, wString)) {
      return wString;
    }

    var subsection = _wstring2['default'].subsection(prevId, nextId, wString);

    if (_ramda2['default'].isEmpty(subsection)) {
      var index = _wstring2['default'].indexOf(nextId, wString);
      return _wstring2['default'].insert(index, wChar, wString);
    }

    // if the current char id is less than the previous id
    if (_wchar2['default'].compareWCharIds(wChar.id, prevId) === -1) {
      var index = _wstring2['default'].indexOf(prevId, wString);
      return _wstring2['default'].insert(index, wChar, wString);
    }

    // recurse to integrateInsert with next id in the subsection
    var newPrevId = _ramda2['default'].head(subsection).id;
    _x = newPrevId;
    _x2 = nextId;
    _x3 = wChar;
    _x4 = wString;
    _again = true;
    continue _function;
  }
};

// integrateDelete :: WChar -> WString -> WString
var integrateDelete = function integrateDelete(_ref3, wString) {
  var id = _ref3.id;

  return _wstring2['default'].hideChar(id, wString);
};

// integrateOp :: Operation -> WString -> WString
var integrateOp = matchOperationType({
  insert: function insert(_ref4, wString) {
    var wChar = _ref4.wChar;

    return integrateInsert(wChar.prevId, wChar.nextId, wChar, wString);
  },
  'delete': function _delete(_ref5, wString) {
    var wChar = _ref5.wChar;

    return integrateDelete(wChar, wString);
  }
});

// integrate :: Operation -> WString -> WString | null
var integrate = function integrate(operation, wString) {
  return canIntegrate(operation, wString) ? integrateOp(operation, wString) : null;
};

// iterate through operation list until stable
// return any remaining operations, along with new string
// integrateAll :: [Operation] -> WString -> {operations: [Operation], wString: WString}
var integrateAll = function integrateAll(_x5, _x6) {
  var _again2 = true;

  _function2: while (_again2) {
    var initialOps = _x5,
        initialWString = _x6;
    initialState = integrate_ = _R$reduce = operations = wString = operationsAreStable = undefined;
    _again2 = false;

    // no operations have been integrated
    // and wString is in it's initial value
    var initialState = { operations: [], wString: initialWString };

    var integrate_ = function integrate_(_ref6, op) {
      var operations = _ref6.operations;
      var wString = _ref6.wString;

      var newString = integrate(op, wString);
      return newString ? { operations: operations, wString: newString } : { operations: _ramda2['default'].append(op, operations), wString: wString };
    };

    var _R$reduce = _ramda2['default'].reduce(integrate_, initialState, initialOps);

    var operations = _R$reduce.operations;
    var wString = _R$reduce.wString;

    var operationsAreStable = _ramda2['default'].length(initialOps) === _ramda2['default'].length(operations);
    if (operationsAreStable) {
      return { operations: operations, wString: wString };
    } else {
      _x5 = operations;
      _x6 = wString;
      _again2 = true;
      continue _function2;
    }
  }
};

exports['default'] = {
  integrate: integrate,
  integrateAll: integrateAll
};
module.exports = exports['default'];
//# sourceMappingURL=../woot/core.js.map