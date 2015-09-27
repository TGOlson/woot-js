/*eslint-disable */

var Woot = window.Woot;

// var containerIds = ['text-1', 'text-2', 'text-3', 'text-4']
var containerIds = ['text-1', 'text-2']

var clients = {};

var eventHub = {
  handlers: [],
  onEvent: function(cb) {
    eventHub.handlers.push(cb);
  },
  emit: function(data, id) {
    eventHub.handlers.forEach(function(cb) {
      cb(data, id);
    });
  }
};

function initContainers() {
  containerIds.forEach(function(id, i) {
    clients[i] = Woot.makeWootClientEmpty(i);

    var el = document.querySelector('#' + id);

    var range;
    var position;
    var selection = document.getSelection();

    function setCursorToPreviousLocation() {
      console.log(currentRange);
      var node = el.firstChild;
      el.focus();
      var r = selection.getRangeAt(0);

      r.setStart(node, currentRange[0]);
      r.setEnd(node, currentRange[1]);

      selection.removeAllRanges();
      selection.addRange(r);
    }

    var localQueue = [];
    var timeoutActive = false;

    // throttle integration for smoother rendering
    var throttledIntegrate = function(operations) {
      if (timeoutActive) {
        localQueue = localQueue.concat(operations);
      } else {
        localQueue = operations;
        timeoutActive = true;
        setTimeout(function() {
          timeoutActive = false;
          clients[i] = Woot.sendOperations(clients[i], localQueue);
          el.innerHTML = Woot.showClientString(clients[i]);
          if (i === 1) setCursorToPreviousLocation();
        }, 100);
      }
    }

    eventHub.onEvent(function(operations, j) {
      if (i === j) {
        return;
      }

      if (i === 1) {
        setTimeout(function() {
          throttledIntegrate(operations);
        }, 2000)
      } else {
        throttledIntegrate(operations);
      }

    });

    var wasBackSpace = false;
    var currentRange = [0, 0];

    el.onkeydown = function(e) {
      if (e.which === 8) {
        wasBackSpace = true;
      } else {
        wasBackSpace = false;
      }

      range = selection.getRangeAt(0);

      currentRange[0] = range.startOffset;
      currentRange[1] = range.endOffset;

      // if (e.which === 13) {
      //   result = Woot.sendLocalInsert(clients[i], currentRange[0], '\n');
      //   handleResult(result);
      // }

    }

    el.onclick = function() {
      range = selection.getRangeAt(0);

      currentRange[0] = range.startOffset;
      currentRange[1] = range.endOffset;
    }

    function handleResults(results) {
      var operations = results.map(function(r) {
        return r.operation;
      });

      if (i === 1) {
        setTimeout(function() {
          eventHub.emit(operations, i);
        }, 2000)
      } else {
        eventHub.emit(operations, i);
      }
    }

    function handleResult(result) {
      var operation = result.operation;

      // if we sent a valid operation
      if (operation) {
        clients[i] = result.client;

        // emit event
        if (i === 1) {
          setTimeout(function() {
            eventHub.emit([operation], i);
          }, 2000)
        } else {
          eventHub.emit([operation], i);
        }
      }
    }

    var cutting = false;
    var pasting = false;


    el.onpaste = function(e) {
      pasting = true;
      var text = e.clipboardData.getData('text/plain');

      setTimeout(function() {
        pasting = false;
      }, 0);

      var indexStart = selection.getRangeAt(0).startOffset;
      var length = text.length;

      var results = [];

      for (var j = 0; j < length; j++) {
        var result = Woot.sendLocalInsert(clients[i], j + indexStart, text[j]);

        if (result.operation) {
          clients[i] = result.client;

          results.push(result);
        }
      }

      handleResults(results);
    }

    el.oncut = function() {
      cutting = true;

      setTimeout(function() {
        cutting = false;
      }, 0);

      var indexStart = selection.getRangeAt(0).startOffset;
      var indexEnd = selection.getRangeAt(0).endOffset;
      deleteRange(indexStart, indexEnd);
    }

    function deleteRange(indexStart, indexEnd) {
      var length = indexEnd - indexStart;

      var results = [];

      for (var j = 0; j < length; j++) {
        var result = Woot.sendLocalDelete(clients[i], indexStart);
        // var result = Woot.sendLocalInsert(clients[i], j + indexStart, text[j]);

        if (result.operation) {
          clients[i] = result.client;

          results.push(result);
        }
      }

      handleResults(results);
    }


    // could diff the strings on input
    // el.oninput = function(e) {
    el.oninput = function(e) {
      if (cutting || pasting) {
        return;
      }

      if (currentRange[0] !== currentRange[1]) {
        // console.log('selection insert');
        deleteRange(currentRange[0], currentRange[1]);
      }


      // console.log(e, wasBackSpace);
      // e.preventDefault();
      range = selection.getRangeAt(0);
      position = range.startOffset - 1;

      // var alpha = String.fromCharCode(e.which);
      var alpha = e.target.outerText[position];

      // alpha = e.shiftKey ? alpha : alpha.toLowerCase();
      var result;

      if (wasBackSpace) {
        result = Woot.sendLocalDelete(clients[i], position + 1);
      } else {
        result = Woot.sendLocalInsert(clients[i], position, alpha);
      }


      handleResult(result);
    }

    // el.onkeyup = function() {
      // console.log(range, range.startOffset);
    //   range.setStart(el, position);
    //   range.collapse(true);
    //   selection.removeAllRanges();
    //   selection.addRange(range);
    //   // selection.addRange(range);
    // }
  });
}

window.onload = initContainers;
