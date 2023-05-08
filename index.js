const { Member } = require('@ellementul/uee-core')
const { Time } = require('@ellementul/timecount')

const startEvent = require('./events/start_event')
const timeEvent = require('./events/time_event')
class Ticker extends Member {
  constructor() {
    super()

    this.onEvent(startEvent, () => this.start())
    this._timemark = new Time
    this._timeout = 200
    
    this.role = "Ticker"
  }
  start () {
    this._timer = setInterval(() => this.send(timeEvent, {
      state: {
        timemark: this._timemark.toArray(),
        mstime: Date.now()
      }
    }), this._timeout)
  }
  reset () {
    clearInterval(this._timer)
  }
}

module.exports = { 
  Ticker,
  events: {
    start: require('./events/start_event'),
    time: require('./events/time_event')
  }
}