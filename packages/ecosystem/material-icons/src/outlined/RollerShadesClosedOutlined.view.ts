import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RollerShadesClosedOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 19V3H4v16H2v2h8.25c0 .97.78 1.75 1.75 1.75s1.75-.78 1.75-1.75H22v-2h-2zM18 5v10H6V5h12zM6 19v-2h5v2H6zm7 0v-2h5v2h-5z\"/>")
      .name("RollerShadesClosedOutlined")
  }
}

export default RollerShadesClosedOutlined as any as Typed<DLightIconType>