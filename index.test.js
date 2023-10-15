import test from 'ava'
import sinon from 'sinon'

import { Provider } from '@ellementul/uee-core'
import { Ticker, events } from './index.js'

import startEvent from './events/start_event.js'
import timeEvent from './events/time_event.js'

test('constructor', t => {
  const ticker = new Ticker
  t.truthy(ticker)
})

test('testing export events', t => {
  t.is(startEvent, Ticker.events.start)
  t.is(timeEvent, Ticker.events.time)
  t.is(startEvent, Ticker.events.startEvent)
  t.is(timeEvent, Ticker.events.timeEvent)
})

const clock = sinon.useFakeTimers()

test('run ticker', t => {
  const provider = new Provider
  const ticker = new Ticker
  ticker.setProvider(provider)

  const timeCallback = sinon.fake()
  provider.onEvent(timeEvent, timeCallback)
  provider.sendEvent(startEvent.create())

  clock.tick(1000)

  t.true(timeCallback.called)
})

test('run ticker with delta', t => {

  const provider = new Provider
  const ticker = new Ticker
  ticker.setProvider(provider)

  const timeCallback = sinon.fake()
  provider.onEvent(timeEvent, timeCallback)

  provider.sendEvent({
    ...startEvent.create(),
    delta: 24
  })

  clock.tick(24*3)

  t.true(timeCallback.calledThrice)
})

test('reset ticker', t => {
  const provider = new Provider
  const ticker = new Ticker
  ticker.setProvider(provider)

  const timeCallback = sinon.spy(() => {
    ticker.reset()
  })
  provider.onEvent(timeEvent, timeCallback)

  provider.sendEvent(startEvent.create())

  clock.tick(3000)

  t.true(timeCallback.calledOnce)
});