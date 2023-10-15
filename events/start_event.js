import { EventFactory, Types } from '@ellementul/uee-core'
const type = Types.Object.Def({
  system: "Timing",
  entity: "Ticker",
  action: "Start",
  delta: Types.Index.Def(1000)
})

export default EventFactory(type)