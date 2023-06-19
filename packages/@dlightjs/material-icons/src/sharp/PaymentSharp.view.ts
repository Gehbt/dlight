import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PaymentSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4H2v16h20V4zm-2 14H4v-6h16v6zm0-10H4V6h16v2z\"/>")
      .name("PaymentSharp")
  }
}

export default PaymentSharp as any as Typed<DLightIconType>