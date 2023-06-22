import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MedicalInformationTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 9c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2H4v11h16V9h-5zm-4 7H9v2H7v-2H5v-2h2v-2h2v2h2v2zm6 1.5h-4V16h4v1.5zm2-3h-6V13h6v1.5z\" opacity=\".3\"/><path d=\"M20 7h-5V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-9-3h2v5h-2V4zm9 16H4V9h5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2h5v11zm-9-4H9v2H7v-2H5v-2h2v-2h2v2h2v2zm2-1.5V13h6v1.5h-6zm0 3V16h4v1.5h-4z\"/>")
      .name("MedicalInformationTwoTone")
  }
}

export default MedicalInformationTwoTone as any as Typed<DLightIconType>