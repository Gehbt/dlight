import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PlaylistRemoveRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.71 21.3c.39.39 1.02.39 1.41 0L17 19.41l1.89 1.89a.996.996 0 1 0 1.41-1.41L18.41 18l1.89-1.89a.996.996 0 1 0-1.41-1.41L17 16.59l-1.89-1.89a.996.996 0 1 0-1.41 1.41L15.59 18l-1.89 1.89c-.38.38-.38 1.02.01 1.41zM14 11c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1h9c.55 0 1-.45 1-1zm0-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1h9c.55 0 1-.45 1-1zM3 15c0 .55.45 1 1 1h5c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z\"/>")
      .name("PlaylistRemoveRound")
  }
}

export default PlaylistRemoveRound as any as Typed<DLightIconType>