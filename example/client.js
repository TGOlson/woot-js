const Woot = window.Woot;
const io = window.io;

const socket = io();

const el = document.querySelector('#text-area');
const selection = document.getSelection();

let client = Woot.makeWootClientEmpty(1);

// Simple flag to track if backspace was the last key pressed.
let wasBackSpace = false;

socket.on('operation', operation => {
  console.log('Got operation', operation);

  client = Woot.sendOperation(client, operation);
  el.innerHTML = Woot.showClientString(client);
});

el.onkeydown = (e) => {
  wasBackSpace = e.which === 8;
};

el.oninput = (e) => {
  const range = selection.getRangeAt(0);
  const position = range.startOffset - 1;
  const alpha = e.target.outerText[position];

  const result = wasBackSpace
    ? Woot.sendLocalDelete(client, position + 1)
    : Woot.sendLocalInsert(client, position, alpha);

  const operation = result.operation;

  // Note: all mutation takes place here...
  // All operations above this are pure
  if (operation) {
    // Mutate client var to match the result from applying the operation.
    client = result.client;

    // Emit operation to server.
    socket.emit('operation', operation);
  }
};
