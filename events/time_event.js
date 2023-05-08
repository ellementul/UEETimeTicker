const { EventFactory, Types } = require('@ellementul/uee-core')
const { LIMIT } = require('@ellementul/timecount')
const type = Types.Object.Def({
  system: "Timing",
  entity: "Time",
  state: {
    timemark: [Types.Index.Def(LIMIT), Types.Index.Def(LIMIT)],
    mstime: Types.Index.Def(100*365*24*60*60*1000) //Limit about 100 years from Unix start
  }
}, true)
module.exports = EventFactory(type)