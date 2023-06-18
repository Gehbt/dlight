import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BookmarkAddOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 11v6.97l-5-2.14-5 2.14V5h6V3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V11h-2zm4-4h-2v2h-2V7h-2V5h2V3h2v2h2v2z\"/>")
      .name("BookmarkAddOutlined")
  }
}

export default BookmarkAddOutlined as any as Typed<DLightIconType>
