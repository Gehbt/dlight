import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MailLockOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m4 8 8 5 8-5v2h2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h12v-2H4V8zm16-2-8 5-8-5h16z\"/><path d=\"M23 15v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zm-3 0v-1c0-.55.45-1 1-1s1 .45 1 1v1h-2z\"/>")
      .name("MailLockOutlined")
  }
}

export default MailLockOutlined as any as Typed<DLightIconType>
