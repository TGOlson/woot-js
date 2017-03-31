# woot-js

Core library for creating real time collaborative documents without operational
transformation (WOOT). This package provides the core logic and data types for building a client and server capable of handling real time editing with WOOT. This package is environment agnostic - meaning it is suitable for use in both client and server environments.

Note: if building a real time collaborative application, you will also need a notification layer (such as web-sockets), and likely a library to help handle input events (such as a JS text editor).

References:

* [Real time group editors without Operational transformation](https://hal.inria.fr/inria-00071240/document)


### Setup

Install

```
$ npm install --save woot-js
```

Test

```
npm test
```

### Examples

For a detailed example, take a look at the [example directory](https://github.com/TGOlson/woot-js/tree/master/example). This shows a minimal setup using `woot-js` along with a web socket library to create a real time collaborative application with multiple clients.

Start the server using `node example/server.js`. Then navigate to `http://localhost:3000/example` to see the running application. Open multiple browser windows to see realtime updates across multiple clients.

Note: this is a minimal example used to show how operations can be managed across multiple clients. It does not correctly handle all text editing interactions, such as copy/paste/bulk delete - a more robust application would likely use a JS text editor to better handle these events.

### Documentation

* `makeWootClientEmpty :: Int -> WootClient`

Takes a client id and returns a new client with an empty string. This will most often be used on the server when initializing a new client.

* `makeWootClient :: WString -> Int -> WootClient`

Creates a client from a known string. This will most often be used to sync a newly connected client with existing server state.

* `sendOperation :: WootClient -> Operation -> WootClient`

Apply an operation to a client. Note: if the operation cannot be applied the original client will be returned without modification.

* `sendLocalDelete :: WootClient -> Int -> {operation: ?Operation, client, WootClient}`
* `sendLocalInsert :: WootClient -> Int -> String -> {operation: ?Operation, client, WootClient}`

Apply a local operation to a client. This should only be used when directly applying a local modification to the client that originated it. If the resulting value includes a non-null operation, the operation should be emitting to all other connected clients. Note: this makes assumptions about the ability to integrate to provided operation into the client.

* `showClientString :: WootClient -> String`

Format a string representation of the internal client string.

### TODO

* Setup CI
