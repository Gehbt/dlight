import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NoMeetingRoomFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 11h-1v2h2v-1l9.73 9.73L20.46 23 14 16.54V21H3v-2h2V7.54l-4-4 1.27-1.27L11 11zm3 .49L5.51 3H14v1h5v12.49l-2-2V6h-3v5.49z\"/>")
      .name("NoMeetingRoomFilled")
  }
}

export default NoMeetingRoomFilled as any as Typed<DLightIconType>