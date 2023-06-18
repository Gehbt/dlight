import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DirectionsSubwayFilledOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20v1h12v-1l-1.5-1c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zm0 2c3.71 0 5.13.46 5.67 1H6.43c.6-.52 2.05-1 5.57-1zM6 7h5v3H6V7zm12 8.5c0 .83-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5V12h12v3.5zm0-5.5h-5V7h5v3z\"/><circle cx=\"8.5\" cy=\"14.5\" r=\"1.5\"/><circle cx=\"15.5\" cy=\"14.5\" r=\"1.5\"/>")
      .name("DirectionsSubwayFilledOutlined")
  }
}

export default DirectionsSubwayFilledOutlined as any as Typed<DLightIconType>
