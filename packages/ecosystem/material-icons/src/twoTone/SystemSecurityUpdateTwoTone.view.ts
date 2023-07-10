import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SystemSecurityUpdateTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 20h10v1H7zM7 3h10v1H7z\" opacity=\".3\"/><path d=\"M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 21H7v-1h10v1zm0-3H7V6h10v12zm0-14H7V3h10v1zm-1 8h-3V8h-2v4H8l4 4 4-4z\"/>")
      .name("SystemSecurityUpdateTwoTone")
  }
}

export default SystemSecurityUpdateTwoTone as any as Typed<DLightIconType>