import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HeatPumpOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z\"/><path d=\"M12 18c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm-.75-2.08c-.55-.1-1.05-.32-1.5-.62l1.5-1.5v2.12zm1.5 0v-2.11l1.5 1.5c-.45.3-.95.51-1.5.61zm2.56-1.67-1.5-1.5h2.11c-.1.55-.31 1.05-.61 1.5zm.61-3h-2.11l1.5-1.5c.3.45.51.95.61 1.5zm-3.17-3.17c.55.1 1.05.32 1.5.62l-1.5 1.5V8.08zM12 11c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-.75-2.92v2.11l-1.5-1.5c.45-.3.95-.51 1.5-.61zM8.69 9.75l1.5 1.5H8.08c.1-.55.31-1.05.61-1.5zm1.5 3-1.5 1.5c-.3-.44-.51-.95-.62-1.5h2.12z\"/>")
      .name("HeatPumpOutlined")
  }
}

export default HeatPumpOutlined as any as Typed<DLightIconType>
