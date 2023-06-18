import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellularAlt2BarFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 14h3v6H5v-6zm6-5h3v11h-3V9z\"/>")
      .name("SignalCellularAlt2BarFilled")
  }
}

export default SignalCellularAlt2BarFilled as any as Typed<DLightIconType>
