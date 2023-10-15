import { Member } from '@ellementul/uee-core'

import startEvent from './events/start_event.js'
import timeEvent from './events/time_event.js'

class Ticker extends Member {
  constructor() {
    super()

    this.onEvent(startEvent, payload => this.start(payload))
    this._timeout = 200
    
    this.role = "Ticker"
  }
  start ({ delta }) {
    this._timer = setInterval(() => this.send(timeEvent, {
      state: {
        mstime: Date.now()
      }
    }), delta || this._timeout)
  }
  reset () {
    clearInterval(this._timer)
  }
}

const events = {
  startEvent,
  start: startEvent,
  timeEvent,
  time: timeEvent
}

Ticker.events = events

export { Ticker, events }