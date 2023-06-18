import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class QuickreplyFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h9v-8h7V4z\"/><path d=\"M22.5 16h-2.2l1.7-4h-5v6h2v5z\"/>")
      .name("QuickreplyFilled")
  }
}

export default QuickreplyFilled as any as Typed<DLightIconType>
