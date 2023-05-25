import { type ParserNode } from "../parser/ParserNode"
import { BodyStringBuilder, geneChildNodesArray, isHTMLTag, parseCustomTag } from "./bodyBuilder"
import {
  geneDeps,
  geneDepsStr,
  geneIsTwoWayConnected,
  resolveForBody,
  geneIdDeps,
  getIdentifiers,
  isElementFunction, uid
} from "./utils"

export class Generator {
  depChain: string[]
  subViews: string[]
  // ---- 通过对应拿到deps，比如 监听this.apples导致的apple变化 {ids: [apple], propNames: [this.apples]}
  idDepsArr: Array<{ ids: string[], propNames: string[] }> = []

  constructor(depChain: string[], subViews: string[], idDepsArr: Array<{ ids: string[], propNames: string[] }> = []) {
    this.depChain = depChain
    this.subViews = subViews
    this.idDepsArr = idDepsArr
  }

  generate(parserNodes: ParserNode[]) {
    const body = new BodyStringBuilder()
    for (const [idx, child] of parserNodes.entries()) {
      body.addBody(this.resolveParserNode(child, idx))
    }
    body.add(`return ${geneChildNodesArray(parserNodes)};`)
    return body.value
  }

  geneDeps(valueStr: string) {
    return [...new Set([...geneDeps(valueStr, this.depChain), ...geneIdDeps(valueStr, this.idDepsArr)])]
  }

  resolveParserNode(parserNode: ParserNode, idx: number) {
    if (this.subViews.includes(parserNode.tag)) return this.resolveSubView(parserNode, idx)
    if (parserNode.tag === "env") return this.resolveEnv(parserNode, idx)
    if (parserNode.tag === "_") return this.resolveExpression(parserNode, idx)
    if (parserNode.tag === "if") return this.resolveIf(parserNode, idx)
    if (parserNode.tag === "for") return this.resolveFor(parserNode, idx)
    if (parserNode.tag === "_$text") return this.resolveText(parserNode, idx)
    if (isHTMLTag(parserNode)) return this.resolveHTML(parserNode, idx)
    parseCustomTag(parserNode)
    return this.resolveCustom(parserNode, idx)
  }

  resolveIf(parserNode: ParserNode, idx: number) {
    const body = new BodyStringBuilder()
    const nodeName = `_$node${idx}`

    body.add(`const ${nodeName} = new _$.IfNode();`)

    for (const condition of parserNode.attr.conditions) {
      body.add(`${nodeName}._$addCond(() => ${condition.condition}, () => {`)
      body.add(this.generate(condition.parserNodes))
      const listenDeps = this.geneDeps(condition.condition)
      if (listenDeps.length > 0) {
        body.add(`}, this, ${geneDepsStr(listenDeps)});`)
        continue
      }
      body.add("});")
    }

    return body
  }

  resolveFor(parserNode: ParserNode, idx: number) {
    const body = new BodyStringBuilder()
    const key = parserNode.attr.key
    const item = parserNode.attr.item
    const array = parserNode.attr.array

    const nodeName = `_$node${idx}`
    body.add(`const ${nodeName} = new _$.ForNode();`)

    const listenDeps = this.geneDeps(array)
    if (listenDeps.length > 0) {
      // ---- 如果有dependencies
      body.add(`${nodeName}._$addNodeFunc((_$key, _$idx, node_for) => {`)
      // ---- 前面的listen函数很复杂，主旨就是把 let {idx, item} of array
      //      变成 let {idx.value, item.value} of array
      const idArr = item.match(/[_$a-zA-Z][_$a-zA-Z0-9]*/g) ?? []
      body.add(`const ${item} = node_for._$getItem(_$key, _$idx);`)
      const valueId = uid()
      const valueItemStr = `_$valuedItem${valueId}`
      body.add(`const ${valueItemStr} = {};`)
      for (const i of idArr) {
        body.add(`${valueItemStr}.${i} = ${i};`)
      }
      body.add(`node_for._$listen(this, ()=>node_for._$getItem(_$key, _$idx), \
            ${geneDepsStr(listenDeps)}, (_$item) => {`)
      body.add(`const ${item} = _$item;`)
      for (const i of idArr) {
        body.add(`${valueItemStr}.${i} = ${i};`)
      }
      body.add("});")

      // ---- 下面才是子body
      const newGenerator = new Generator(this.depChain, this.subViews,
        [...this.idDepsArr, { ids: getIdentifiers(item), propNames: listenDeps }])
      let forBody = newGenerator.generate(parserNode.children)
      forBody = resolveForBody(forBody, item, valueItemStr)
      body.add(forBody)
      body.add("});")

      // ---- 第二个参数，keyFunc
      if (key) {
        body.add(`${nodeName}._$addKeyFunc(() => {`)
        body.add("const keys = [];")
        body.add(`for (let ${item} of ${array}) {`)
        body.add(`keys.push(${key});`)
        body.add(("}"))
        body.add("return keys;")
        body.add("});")
      }
      body.add(`${nodeName}._$addArrayFunc(this, () => (${array}), ${geneDepsStr(listenDeps)});`)
    } else {
      body.add(`${nodeName}._$addNodess(() => Array.from(${array}).map((${item}) => (() => {`)
      body.add(this.generate(parserNode.children))
      body.add("})()));")
    }
    return body
  }

  resolveText(parserNode: ParserNode, idx: number) {
    const body = new BodyStringBuilder()
    const value = parserNode.attr._$content
    const listenDeps = this.geneDeps(`${value}`)
    const nodeName = `_$node${idx}`

    if (listenDeps.length > 0) {
      body.add(`const ${nodeName} = new _$.TextNode(() => ${value}, this, ${geneDepsStr(listenDeps)});`)
    } else {
      body.add(`const ${nodeName} = new _$.TextNode(${value}, );`)
    }

    return body
  }

  resolveHTML(parserNode: ParserNode, idx: number) {
    const body = new BodyStringBuilder()
    const nodeName = `_$node${idx}`
    body.add(`const ${nodeName} = new _$.HtmlNode(${parserNode.tag}, );`)

    // ---- properties
    for (let { key, value, nodes } of parserNode.attr.props) {
      value = this.parsePropNodes(value, nodes)
      if (key === "do") {
        body.add(`(${value})(${nodeName});`)
        continue
      }
      if (key === "forwardProps") {
        body.add(`this.forwardProps(${nodeName});`)
        continue
      }
      if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
        body.add(`${nodeName}._$addLifeCycle(${value}, "${key}");`)
        continue
      }
      if (key === "_$content") {
        key = "innerText"
      }
      const listenDeps = this.geneDeps(value as string)
      if (key === "element") {
        body.add(`const ${nodeName}Element = () => ${value} = ${nodeName}._$el;`)
        body.add(`${nodeName}Element()`)
        body.add(`this._$addDeps(${geneDepsStr(listenDeps)}, {}, ${nodeName}Element)`)
        continue
      }
      if (listenDeps.length > 0) {
        body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)});`)
        continue
      }
      body.add(`${nodeName}._$addProp("${key}", ${value});`)
    }

    // ---- children
    if (parserNode.children.length > 0) {
      body.add(`${nodeName}._$addNodes((() => {`)
      body.add(this.generate(parserNode.children))
      body.add("})())")
    }

    return body
  }

  resolveCustom(parserNode: ParserNode, idx: number) {
    const body = new BodyStringBuilder()
    const nodeName = `_$node${idx}`

    body.add(`const ${nodeName} = new (${parserNode.tag})();`)

    // ---- props
    for (let { key, value, nodes } of parserNode.attr.props) {
      value = this.parsePropNodes(value, nodes)
      if (key === "do") {
        body.add(`(${value})(${nodeName});`)
        continue
      }
      if (key === "forwardProps") {
        body.add(`this.forwardProps(${nodeName});`)
        continue
      }
      if (["willMount", "didMount", "willUnmount", "didUnmount"].includes(key)) {
        body.add(`${nodeName}._$addLifeCycle(${value}, "${key}");`)
        continue
      }
      const listenDeps = this.geneDeps(value as string)
      if (key === "element") {
        const isFunction = isElementFunction(value)
        if (isFunction) {
          body.add(`const ${nodeName}Element = () => (${value})(${nodeName}._$el);`)
        } else {
          body.add(`const ${nodeName}Element = () => ${value} = ${nodeName}._$el;`)
        }
        body.add(`${nodeName}._$addAfterset(${nodeName}Element);`)
        body.add(`this._$addDeps(${geneDepsStr(listenDeps)}, {}, ${nodeName}Element);`)
        continue
      }
      if (listenDeps.length > 0) {
        body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)});`)
        continue
      }
      body.add(`${nodeName}._$addProp("${key}", ${value});`)
    }

    // ---- child
    if (parserNode.children.length > 0) {
      body.add(`${nodeName}._$addChildren((() => {`)
      body.add(this.generate(parserNode.children))
      body.add("})())")
    }

    return body
  }

  resolveSubView(parserNode: ParserNode, idx: number) {
    parserNode.attr.isSubView = true
    const body = new BodyStringBuilder()
    const props = parserNode.attr.props.map(({ key, value, nodes }: any) => ({
      key,
      value: this.parsePropNodes(value, nodes)
    }))

    const keyId = uid()
    const passProps: Array<{ key: string, keyWithId: string }> = []
    for (const [i, { key, value }] of props.entries()) {
      const keyWithId = `${key}_${keyId}`
      const depsStr = geneDepsStr(this.geneDeps(value))
      body.add(`const ${keyWithId} = {value: ${value}, deps: ${depsStr}};`)
      passProps.push({ key, keyWithId })
      body.add(`const depId${idx}_${i} = {};`)
      body.add(`this._$addDeps(${depsStr}, depId${idx}_${i}, () => {${keyWithId}.value = ${value}});`)
    }

    body.add(`const _$node${idx} = ${parserNode.tag}({${passProps.map(
            ({ key, keyWithId }) => `${key}: ${keyWithId}`
        ).join(", ")}});`)
    // ---- subView一定要有返回值！dep放到返回的第一个里面，这样子删除的时候就可以一起删了，不会内存泄漏
    body.add(`_$node${idx}[0]._$depObjectIds.push(...[${Object.keys(props).map(i => `depId${idx}_${i}`).join(",")}]);`)

    return body
  }

  resolveEnv(parserNode: ParserNode, idx: number) {
    const body = new BodyStringBuilder()

    const nodeName = `_$node${idx}`
    body.add(`const ${nodeName} = new _$.EnvNode();`)
    // ---- child 要先加children
    if (parserNode.children.length > 0) {
      body.add(`${nodeName}._$addNodes((() => {`)
      body.add(this.generate(parserNode.children))
      body.add("})())")
    }

    // ---- props
    for (let { key, value, nodes } of parserNode.attr.props) {
      value = this.parsePropNodes(value, nodes)
      const listenDeps = this.geneDeps(value as string)
      if (listenDeps.length > 0) {
        body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)});`)
        continue
      }
      body.add(`${nodeName}._$addProp("${key}", ${value});`)
    }
    return body
  }

  resolveExpression(parserNode: ParserNode, idx: number) {
    const body = new BodyStringBuilder()
    const nodeName = `_$node${idx}`
    // ---- forward props
    for (let { key, value, nodes } of parserNode.attr.props) {
      value = this.parsePropNodes(value, nodes)
      if (key === "_$content") {
        const listenDeps = this.geneDeps(value)
        if (listenDeps.length > 0) {
          body.add(`const ${nodeName} = new _$.ExpressionNode(() => ${value}, this, ${geneDepsStr(listenDeps)});`)
        } else {
          body.add(`const ${nodeName} = new _$.ExpressionNode(${value});`)
        }
        continue
      }
      if (key === "onUpdateNodes") {
        body.add(`${nodeName}._$onUpdateNodes(${value});`)
        continue
      }

      const listenDeps = this.geneDeps(value as string)
      if (listenDeps.length > 0) {
        body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)});`)
        continue
      }
      body.add(`${nodeName}._$addProp("${key}", ${value});`)
    }

    return body
  }

  parsePropNodes(value: string, nodes: Record<string, ParserNode[]>) {
    for (const [i, parserNodes] of Object.entries(nodes)) {
      const subBody = new BodyStringBuilder()
      subBody.add("((()=>{")
      subBody.add(this.generate(parserNodes))
      subBody.add("})())")
      value = value.replace("\"" + i + "\"", subBody.value)
    }
    return value
  }
}

export function resolveParserNode(parserNodes: ParserNode[], depChain: string[], subViews: string[], idDepsArr: Array<{ ids: string[], propNames: string[] }> = []) {
  return new Generator(depChain, subViews, idDepsArr).generate(parserNodes)
}
