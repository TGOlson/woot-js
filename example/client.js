const Woot = window.Woot;
const io = window.io;
const Quill = window.Quill;

const socket = io();

const editor = new Quill('#editor');

const log = (...x) => console.log(...x); // eslint-disable-line


// Conversion function.
// Takes a quill delta and returns a list of woot operations.
const applyDelta = (client, delta) => {
  const ops = delta.ops;
  const head = ops[0];

  if (head.delete !== undefined) {
    const _initalCharsToDelete = head.delete;
    return Woot.sendLocalDelete(client, 0);
    // a number of chars to delete

    // delete initial x chars
  } else if (head.insert !== undefined) {
    const initialCharsToInsert = head.insert;
    return Woot.sendLocalInsert(client, 0, initialCharsToInsert);
    // a list of chars to append to head
  } else if (head.retain) {
    log('Retain not yet handled');
    return {};
  }

  throw new Error('Unknown delta type: ' + head);
};


socket.on('init', ({ wString, clientId }) => {
  let client = Woot.makeWootClient(wString, clientId);
  // let wasBackSpace = false;

  log('Initialized client', client);
  // el.innerHTML = Woot.showClientString(client);

  socket.on('operations', operations => {
    log('Got operations', operations);

    client = Woot.sendOperations(client, operations);
    // el.innerHTML = Woot.showClientString(client);
  });
  //
  // el.onkeydown = (e) => {
  //   wasBackSpace = e.which === 8;
  // };

  editor.on('text-change', (delta, _source) => {
    log(delta);
    const result = applyDelta(client, delta);
    log(result.operation);

    if (result.operation) {
      client = result.client;

      socket.emit('operations', result.operation);
    }
  });

  // el.oninput = (e) => {
  //   const range = selection.getRangeAt(0);
  //   const position = range.startOffset - 1;
  //   const alpha = e.target.outerText[position];
  //
  //   const result = wasBackSpace
  //     ? Woot.sendLocalDelete(client, position + 1)
  //     : Woot.sendLocalInsert(client, position, alpha);
  //
  //   const operation = result.operation;
  //
  //   // Note: all mutation takes place here...
  //   // All operations above this are pure
  //   if (operation) {
  //     // Mutate client var to match the result from applying the operation.
  //     client = result.client;
  //
  //     // Emit operation to server.
  //     log('Sending operation.', operation);
  //     socket.emit('operation', operation);
  //   }
  // };
});
