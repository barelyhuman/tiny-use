import test from 'ava'
import { use } from '../src/index'
import { IncomingMessage, ServerResponse } from 'http'
import httpMock from 'node-mocks-http'

test('use runs all', t => {
  let count = 0
  const callerFunc = (req, res, next) => {
    count += 1
    next()
  }
  const callerFunc2 = (req, res, next) => {
    count += 1
  }
  use(callerFunc, callerFunc2)({} as IncomingMessage, {} as ServerResponse)
  t.deepEqual(count, 2)
})

test("use doesn't crash on un-needed `next` calls", t => {
  let count = 0
  const callerFunc = (req, res, next) => {
    count += 1
    next()
  }
  const callerFunc2 = (req, res, next) => {
    count += 1
    next()
  }
  use(callerFunc, callerFunc2)({} as IncomingMessage, {} as ServerResponse)
  t.deepEqual(count, 2)
})

test('use runs only if `next` is called', t => {
  let count = 0
  const callerFunc = (req, res, next) => {
    count += 1
  }
  const callerFunc2 = (req, res, next) => {
    count += 1
  }
  use(callerFunc, callerFunc2)({} as IncomingMessage, {} as ServerResponse)
  t.deepEqual(count, 1)
})

test('maintains the order', t => {
  let order = []
  const callerFunc = (req, res, next) => {
    order.push(1)
    next()
  }
  const callerFunc2 = (req, res, next) => {
    order.push(2)
  }
  use(callerFunc, callerFunc2)({} as IncomingMessage, {} as ServerResponse)
  t.deepEqual(order, [1, 2])
})
