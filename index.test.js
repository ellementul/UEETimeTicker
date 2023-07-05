const { Provider } = require('@ellementul/uee-core')
const { Ticker } = require('./index')

describe('Ticker', () => {
  test('constructor', () => {
    const ticker = new Ticker
    expect(ticker).toBeDefined();
  });
  test('run ticker', () => {
    jest.useFakeTimers();

    const provider = new Provider
    const ticker = new Ticker
    ticker.setProvider(provider)

    const timeEvent = require('./events/time_event')
    const timeCallback = jest.fn()
    provider.onEvent(timeEvent, timeCallback)

    const startEvent = require('./events/start_event')
    provider.sendEvent(startEvent.create())

    jest.runOnlyPendingTimers();

    expect(timeCallback).toHaveBeenCalled();
  });
  test('run ticker with delta', () => {
    jest.useFakeTimers();

    const provider = new Provider
    const ticker = new Ticker
    ticker.setProvider(provider)

    const timeEvent = require('./events/time_event')
    const timeCallback = jest.fn()
    provider.onEvent(timeEvent, timeCallback)

    const startEvent = require('./events/start_event')
    provider.sendEvent({
      ...startEvent.create(),
      delta: 24
    })

    jest.runOnlyPendingTimers();

    expect(timeCallback).toHaveBeenCalled();
  });
  test('reset ticker', () => {
    jest.useFakeTimers();

    const provider = new Provider
    const ticker = new Ticker
    ticker.setProvider(provider)

    const timeEvent = require('./events/time_event')
    const timeCallback = jest.fn(() => {
      ticker.reset()
    })
    provider.onEvent(timeEvent, timeCallback)

    const startEvent = require('./events/start_event')
    provider.sendEvent(startEvent.create())

    jest.runOnlyPendingTimers();

    expect(timeCallback).toHaveBeenCalledTimes(1);
  });
});