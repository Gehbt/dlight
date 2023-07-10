import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BorderStyleTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 19h2v2h-2zm0-8h2v2h-2zm0 4h2v2h-2zm-4 4h2v2h-2zM3 21h2V5h16V3H3zM19 7h2v2h-2zm-8 12h2v2h-2zm-4 0h2v2H7z\"/>")
      .name("BorderStyleTwoTone")
  }
}

export default BorderStyleTwoTone as any as Typed<DLightIconType>