import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ChangeHistoryOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 7.77 18.39 18H5.61L12 7.77M12 4 2 20h20L12 4z\"/>")
      .name("ChangeHistoryOutlined")
  }
}

export default ChangeHistoryOutlined as any as Typed<DLightIconType>
