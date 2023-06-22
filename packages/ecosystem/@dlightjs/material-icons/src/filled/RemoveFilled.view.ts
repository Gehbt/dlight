import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RemoveFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 13H5v-2h14v2z\"/>")
      .name("RemoveFilled")
  }
}

export default RemoveFilled as any as Typed<DLightIconType>