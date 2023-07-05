const { EventFactory, Types } = require('@ellementul/uee-core')
const type = Types.Object.Def({
  system: "Timing",
  entity: "Ticker",
  action: "Start",
  delta: Types.Index.Def(1000)
})
module.exports = EventFactory(type)