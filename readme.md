# @barelyhuman/tiny-use

> The tiniest middleware library for node's HTTP

![Coverage](./docs/badges.svg)

Invisible if you squint hard enough

- [@barelyhuman/tiny-use](#barelyhumantiny-use)
  - [Why ?](#why-)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Node HTTP API](#node-http-api)
      - [Ecosystem](#ecosystem)
    - [Fetch Compliant API](#fetch-compliant-api)
  - [License](#license)

## Why ?

I've written this in my experimentals sink for over 1.5 years now, the first
public version of the same is available here
[barelyhuman/http/middleware](https://github.com/barelyhuman/http/blob/b7ee273a0ba98bebd857ad7e8ee4324970629eb2/src/middleware.js).

I made it to be small and contained to reduce the middleware's load on node's
server.

With respect to:

- **Performace** - It's linear and basically depends on what load you add in
  your actual middleware since it itself has no overhead.
- **Reason** - Like everything else, I've written it more than once and reached
  a point of saturation where I don't want to reduce it's size in terms of code
  and functionality.
- **Stability** - The API isn't going to change since it's very basic and ties
  to the Node API so unless that changes, makes no sense for this to change

## Installation

```sh
; npm i --save @barelyhuman/tiny-use
```

## Usage

### Node HTTP API

To use with the default `node:http`/`http` API, you use it just like any other
express js middleware, the difference being that the middleware now supports
async flow

```js
import http from 'node:http'
import { use } from '@barelyhuman/tiny-use'

http.createServer(
  use(
    async (req, res, next) => {
      req.value = 1
      await next()
      console.log({
        value: req.value,
      })
    },
    async (req, res, next) => {
      req.value = 2
      res.end('Final Message')
      return
    }
  )
)
```

#### Ecosystem

You don't have to rebuild an ecosystem, most of what `connect` has and what
express uses should be usable.

### Fetch Compliant API

If you work with network functions that are more inclined to the Fetch API
standard and you need to use common middleware instead of manually calling them
in each function call, you can do so by making minor modifications to the import

```js
import { use } from '@barelyhuman/tiny-use/fetch'

const withMiddleware = use(
  req => {
    req.userId = 1
  },
  req => {
    return new Response(req.userId)
  }
)

export default {
  fetch: withMiddleware,
}
```

> [!NOTE]:  
> When using the fetch based API, you might need to also add a bundling step if
> the tool you use doesn't do the bundling for you

## License

[MIT](/LICENSE)
