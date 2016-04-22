# woot-js

Core library for creating real time collaborative documents without Operational
transformation (WOOT). This package provides the core logic and data types for building a server capable and handling real time editing with WOOT.

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

For a detailed example, take a look at the `examples` (TODO: link) directory. This shows a minimal setup using this library along with a web socket library to create a real time collaborative application with multiple clients.

### Documentation

TODO

### TODO

* Setup CI
* More Docs
* Full example with web sockets and multiple clients.
* Run flow against specs
