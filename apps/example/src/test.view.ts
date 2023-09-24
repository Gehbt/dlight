import { View, renderToString, Children, _, required } from "@dlightjs/dlight"
import { css, div } from "@dlightjs/easy-css"
import { type Typed, button } from "@dlightjs/types"
import { HStack, Route, RouterSpace, VStack } from "@dlightjs/components"
import { MarkitView, addBlockRule } from "@dlightjs/markit"
import { ForwardProp, Func } from "@dlightjs/decorators"
import { Filter1Filled } from "@dlightjs/material-icons"

@ForwardProp
@View
class NNN {
  Body() {
    div()
      .forwardProps()
  }
}

const Default = (() => {}) as any
@View
class JJ {
  @Default @Prop qushifafe = required
  @Children hh = required

  willMount() {
  }

  Body() {
    div(this.qushifafe)
    _(this.hh)
  }
}

function OK() {
  console.log("jj")
  this.loading = true
  setTimeout(() => {
    this.count++
    this.loading = false
  }, 1000)
}

function OK2() {
  console.log("oo")
  setInterval(() => {
    this.count++
  }, 1000)
}

interface SubView {
  text: string
}
@Func(OK)
@Func(OK2)
@View
class TestView {
  count = 5
  loading = false
  @View
    OK = (({ text }: SubView) => {
      div(text)
    }) as Typed<SubView>

  Body = () => {
    if (this.loading) {
      div("shitttt")
    }
    this.OK()
      .text("ok")
    Filter1Filled()
    JJ("xefe")
    {
      div("shit")
    }
    div(this.count)
    button("+")
      .onclick(() => {
        this.count++
      })
    NNN("hhh")
      .style({
        color: "red"
      })
  }
}

// export class TestMarkit extends View {
//   testMDString = `
// Search 🌟 in doc for important concepts and performance results.

// # Quick start

// DLight uses [vite](https://vitejs.dev/) to construct its apps. We mainly use [this vite plugin](https://www.npmjs.com/package/vite-plugin-dlight-transpiler) to transpile jsx/jsd file into pure js code.

// Three ways to try DLight.js out.

// * Use CLI to build a dlight app. (**This feature is still in development.**)

// \`\`\`shell
// npm install -g @dlightjs/cli
// create-dlight-app my-first-dlight-app
// \`\`\`

// * Clone this repo https://github.com/dlight-js/dlight-vite-template for a quick start.
// * 🌟 Play around in [codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-quickstart-4tgogd)
//   `

//   getAst = (ast: any) => {
//     console.log(ast)
//   }

//   Body() {
//     MarkitView(this.testMDString)
//       .getAst(this.getAst)
//   }
// }

// console.log(renderToString(TestView))

export default TestView
function Prop(target: JJ, propertyKey: "qushifafe"): void {
  throw new Error("Function not implemented.")
}
