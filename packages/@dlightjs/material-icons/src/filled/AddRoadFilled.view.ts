import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AddRoadFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 18v-3h-2v3h-3v2h3v3h2v-3h3v-2zM18 4h2v9h-2zM4 4h2v16H4zm7 0h2v4h-2zm0 6h2v4h-2zm0 6h2v4h-2z\"/>")
      .name("AddRoadFilled")
  }
}

export default AddRoadFilled as any as Typed<DLightIconType>