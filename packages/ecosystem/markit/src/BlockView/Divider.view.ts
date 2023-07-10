import DLight, { View } from "@dlightjs/dlight"
import { div, Prop, required, type Typed } from "@dlightjs/types"
import css from "@iandx/easy-css"

class Divider extends View {
  @Prop _$content = required
  @Prop props = required
  dividerType = this.props.dividerType

  Body() {
    div()
      .className(this.divider)
      .className(this.divider_(this.dividerType))
  }

  divider = css`
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: gray;
    margin: 4px;
    height: 0px;
    width: auto;
  `
  divider_ = (borderType: string) => css`
    border-style: ${borderType};
  `
}

export default Divider as any as Typed<Divider>