// @ts-ignore
import babel from "@babel/core"
// @ts-ignore
import babelGenerate from "@babel/generator"
// @ts-ignore
import babelTraverse from "@babel/traverse"

import * as t from "@babel/types"
import {isMemberInFunction} from "../babel/nodeHelper";
import {BodyStringBuilder} from './bodyBuilder';
const parse = (code: string) => babel.parse(code, babelConfig)
const generate = (ast: any) => babelGenerate.default(ast).code
const traverse = babelTraverse.default

const babelConfig = {
    filename: "*.ts",
    presets: ["@babel/preset-typescript"]
}

export function geneDepsStr(listenDeps: string[]) {
    return "[" + listenDeps.map(v=>"\""+v+"\"").join(", ") + "]"
}

export function uid() {
    return Math.random().toString(20).slice(2, 8)
}

export function geneDeps(valueStr: string, depChain: string[], otherDeps: string[]=[]) {
    const ast = parse(valueStr)
    let deps: string[] = []
    traverse(ast, {
        MemberExpression(innerPath: any) {
            if (depChain.includes(innerPath.node.property.name)) {
                if (!isMemberInFunction(innerPath)) {
                    deps.push(innerPath.node.property.name)
                }
            }
        }
    })
    deps = [...new Set([...deps, ...otherDeps])]

    return deps
}

export function geneIdDeps(valueStr: string, arr: {ids: string[], propNames: string[]}[], otherDeps: string[]=[]) {
    const ast = parse(valueStr)
    let deps: string[] = []
    traverse(ast, {
        Identifier(innerPath: any) {
            for (let {ids, propNames} of arr) {
                if (ids.includes(innerPath.node.name)) {
                    if (!isMemberInFunction(innerPath)) {
                        deps.push(...propNames)
                    }
                }
            }
            
        }
    })
    deps = [...new Set([...deps, ...otherDeps])]

    return deps
}

export function getIdentifiers(valueStr: string) {
    return valueStr.match(/[_$a-zA-Z][_$a-zA-Z0-9]*/g) ?? []
}

export function geneIsTwoWayConnected(valueStr: string) {
    const ast = parse(valueStr)
    return t.isMemberExpression(ast.program.body[0].expression)
}

export function resolveForBody(body: BodyStringBuilder, item: string) {
    let identifierKeys: string[] = []
    // ---- 遍历拿到所有item里面的标识符，下面要把标识符转换成带.value的
    const itemAst = parse(item)
    traverse(itemAst, {
        Identifier(innerPath: any) {
            identifierKeys.push(innerPath.node.name)
        }
    })
    const bodyAst = parse(body.value)
    traverse(bodyAst, {
        Identifier(innerPath: any) {
            if (identifierKeys.includes(innerPath.node.name)) {
                const valueNode = t.memberExpression(
                    t.identifier("valuedItem"),
                    t.identifier(innerPath.node.name)
                )
                innerPath.replaceWith(valueNode)
                innerPath.skip()
            }
        }
    })

    body.value = generate(bodyAst)
   
}