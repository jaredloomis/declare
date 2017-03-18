import React, {Component} from "react"
import TestPack from "./TestPack"

import "../../style/Page.scss"

export default class Page extends Component {
    constructor(props) {
        super(props)
        this.fieldChange = this.fieldChange.bind(this)
    }

    render() {
        const GRID_WIDTH = 1
        const COL_WIDTH  = 12 / GRID_WIDTH

        const testPacksDOM = chunk(this.props.testPacks, GRID_WIDTH,
            (row, i) =>
                <div className="row" key={i}>{row.map(tp =>
                    <div key={tp.name} className={"col s" + COL_WIDTH}>
                        <TestPack packID={this.props.pageID + "." + tp.id}
                                  name={tp.name}
                                  fields={tp.fields}
                                  values={tp.values}
                                  onChange={this.fieldChange}/>
                    </div>
                )}</div>
        )

        return <div className="page">
            <h1 className="page-name header center">
                {this.props.name}
            </h1>
            <div className="page-info">
                TODO
            </div>
            <h3>Test Packs</h3>
            <div className="page-test-packs">{testPacksDOM}</div>
        </div>
        //<div className="packSelectContainer"><TestPackSelect/></div>
    }

    fieldChange(id) {
        return this.props.onChange(`${this.props.pageID}.${id}`)
    }
}

function chunk(xs, chunkSize, func) {
    const ret = [], len = xs.length
    for(let i = 0; i < len; i += chunkSize)
        ret.push(func(xs.slice(i, i + chunkSize), i))
    return ret
}
