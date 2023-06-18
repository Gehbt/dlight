import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class InterpreterModeFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20.5 16.5c-.83 0-1.5-.67-1.5-1.5v-2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V15c0 .83-.67 1.5-1.5 1.5zM20 20h1v-1.54c1.69-.24 3-1.7 3-3.46h-1a2.5 2.5 0 0 1-5 0h-1c0 1.76 1.31 3.22 3 3.46V20zM9 12c-2.21 0-4-1.79-4-4a3.999 3.999 0 0 1 5.34-3.77A5.938 5.938 0 0 0 9 8c0 1.43.5 2.74 1.34 3.77-.42.15-.87.23-1.34.23zm-1.89 1.13A4.965 4.965 0 0 0 5 17.22V20H1v-2.78c0-1.12.61-2.15 1.61-2.66 1.24-.64 2.76-1.19 4.5-1.43zM11 8c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4zm7.32 12a4.997 4.997 0 0 1-2.82-4.5c0-.89.23-1.73.64-2.45-.37-.03-.75-.05-1.14-.05-2.53 0-4.71.7-6.39 1.56A2.97 2.97 0 0 0 7 17.22V20h11.32z\"/>")
      .name("InterpreterModeFilled")
  }
}

export default InterpreterModeFilled as any as Typed<DLightIconType>
