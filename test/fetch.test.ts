import test from 'ava'
import { use } from '../src/fetch'

test('use runs all', async t => {
  let count = 0
  const callerFunc = req => {
    count += 1
  }
  const callerFunc2 = req => {
    count += 1
  }
  await use(callerFunc, callerFunc2)({} as Request)
  t.deepEqual(count, 2)
})

test('use runs all till false', async t => {
  let count = 0
  const callerFunc = req => {
    count += 1
  }
  const callerFunc2 = req => {
    count += 1
    return false
  }
  // function isn't called
  const callerFunc3 = req => {
    count += 1
  }
  await use(callerFunc, callerFunc2, callerFunc3)({} as Request)
  t.deepEqual(count, 2)
})

test('use runs all till response', async t => {
  const callerFunc = req => {
    return new Response('hello')
  }
  // function isn't called
  const callerFunc2 = req => {
    return new Response('world')
  }
  const result = await use(callerFunc, callerFunc2)({} as Request)
  const data = await result.text()
  t.deepEqual(data, 'hello')
})

test('maintains the order', async t => {
  let order = []
  const callerFunc = req => {
    order.push(1)
  }
  const callerFunc2 = req => {
    order.push(2)
  }
  await use(callerFunc, callerFunc2)({} as Request)
  t.deepEqual(order, [1, 2])
})
