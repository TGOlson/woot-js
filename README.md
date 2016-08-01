# woot-js

Core library for creating real time collaborative documents without Operational
transformation (WOOT). This package provides the core logic and data types for building a client and server capable and handling real time editing with WOOT. This package is environment agnostic - meaning it is suitable for use in both client and server environment.

Note: if building a real time collaborative application, you will also need an event layer (such as web-sockets), and likely a library to help handle input events (such as a JS editor).

References:

* [Real time group editors without Operational transformation](https://hal.inria.fr/inria-00071240/document)


### Setup

Install

```
$ npm install --save woot
```

Test

```
npm test
```

### Examples

For a detailed example, take a look at the [example directory](https://github.com/TGOlson/woot-js/tree/master/example). This shows a minimal setup using `woot-js` along with a web socket library to create a real time collaborative application with multiple clients.

Start server using `node example/server.js`. Then navigate to `http://localhost:3000/example` to see the running application.

Note: this is a minimal example used to show how operations can be managed across multiple clients. It does not correctly handle all text editing interactions, such as copy/paste/bulk delete.

### Documentation

TODO

### TODO

* Setup CI
* More Docs
* Full example with web sockets and multiple clients.
* Run flow against specs
