import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PlayCircleTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zM9.5 16.5v-9l7 4.5-7 4.5z\" opacity=\".3\"/><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/><path d=\"m9.5 16.5 7-4.5-7-4.5z\"/>")
      .name("PlayCircleTwoTone")
  }
}

export default PlayCircleTwoTone as any as Typed<DLightIconType>