const { Member } = require('@ellementul/uee-core')

const startEvent = require('./events/start_event')
const timeEvent = require('./events/time_event')
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

module.exports = { 
  Ticker,
  events: {
    start: require('./events/start_event'),
    time: require('./events/time_event')
  }
}