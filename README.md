# woot-js

### Unstable - do not use yet

Core library for creating real time collaborative documents without Operational
transformation (WOOT). This package provides the core logic and data types for building a server capable and handling real time editing with WOOT.

[Real time group editors without Operational transformation](https://hal.inria.fr/inria-00071240/document)

Install

```
$ npm install --save woot
```

Test

```
npm test
```

Example:

Here is a small example of how one would use this library to create a server that keeps an internal `WootClient` and updates the client upon request.

Each time the server receives a `POST` request with an `Operation` in the JSON body, it will apply that operation to a cached `WootClient` instance, and then update the cache. This server could easily receive many updates from many other clients, and reliably process the operations.

```haskell
import Control.Concurrent.STM
import Data.Aeson
import Data.IORef
import Data.Woot
import Network.HTTP.Types.Status
import Network.Wai
import Network.Wai.Handler.Warp


-- ...
-- FromJSON instances for Operation and other necessary types


makeEmptyClient :: IO (IORef WootClient)
makeEmptyClient = newIORef $ makeWootClientEmpty 1


wootApp :: IORef WootClient -> Application
wootApp clientRef req respond = do
    body <- requestBody req

    let mOperation = decodeStrict body

    case mOperation of
        Nothing -> return ()
        Just operation -> do
            client <- readIORef clientRef
            let newClient = sendOperation client operation
            _ <- writeIORef clientRef newClient
            putStrLn $ "Updated Client: " ++ show (wootClientString newClient)

    respond $ responseLBS status200 [] "WOOOOT!"


runWootApp :: IO ()
runWootApp = makeEmptyClient >>= run 8000 . wootApp
```

TODO:

* ci
* docs
* perf tests
* integrate browser bundle into build `browserify dist/woot.js -o junk/woot.js -s Woot`
