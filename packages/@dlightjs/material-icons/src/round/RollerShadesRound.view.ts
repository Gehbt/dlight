import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RollerShadesRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 19V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v14H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1h-1zM6 19v-6h5v1.8c-.4.3-.8.8-.8 1.4 0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8c0-.6-.3-1.1-.8-1.4V13h5v6H6z\"/>")
      .name("RollerShadesRound")
  }
}

export default RollerShadesRound as any as Typed<DLightIconType>