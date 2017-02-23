import React, {Component} from "react"
import TestPack from "./TestPack"

import "../../style/Page.scss"

export default class Page extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const GRID_WIDTH = 1
        const COL_WIDTH  = 12 / GRID_WIDTH

        const testPacksDOM = chunk(this.props.testPacks, GRID_WIDTH)
        .map((row, i) =>
            <div className="row" key={i}>
                {row.map(tp =>
                    <div key={tp.name} className={"col s" + COL_WIDTH}>
                        <TestPack packID={tp.id}
                                  name={tp.name}
                                  fields={tp.fields}
                                  values={tp.values}/>
                    </div>
                )}
            </div>
        )

        return (
            <div className="page">
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
        )
    }
}

function chunk(xs, chunkSize, func) {
    const ret = [], len = xs.length
    for(let i = 0; i < len; i += chunkSize)
        ret.push(xs.slice(i, i + chunkSize))
    return ret
}
