/* eslint-disable */

var Woot = window.Woot;

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
    var selection = document.getSelection();

    // Simple flag to check if backspace was pressed.
    var wasBackSpace = false;

    eventHub.onEvent(function(operations, j) {
      if (i === j) { return; }

      clients[i] = Woot.sendOperations(clients[i], operations);
      el.innerHTML = Woot.showClientString(clients[i]);
    });


    el.onkeydown = function(e) {
      if (e.which === 8) {
        wasBackSpace = true;
      } else {
        wasBackSpace = false;
      }
    }

    el.oninput = function(e) {
      var result;
      var range = selection.getRangeAt(0);
      var position = range.startOffset - 1;
      var alpha = e.target.outerText[position];

      if (wasBackSpace) {
        result = Woot.sendLocalDelete(clients[i], position + 1);
      } else {
        result = Woot.sendLocalInsert(clients[i], position, alpha);
      }

      var operation = result.operation;

      if (operation) {
        clients[i] = result.client;

        // A little timeout to make it look more realistic
        setTimeout(function() {
          eventHub.emit([operation], i);
        }, 1000);
      }
    }
  });
}

window.onload = initContainers;
