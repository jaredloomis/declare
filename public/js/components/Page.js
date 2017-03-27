import React, {Component} from "react"
import TestPack from "../containers/TestPack"

import "../../style/Page.scss"

export default class Page extends Component {
    constructor(props) {
        super(props)
        this.fieldChange = this.fieldChange.bind(this)
    }

    render() {
        const GRID_WIDTH = 1
        const COL_WIDTH  = 12 / GRID_WIDTH

        const testPacksDOM = chunk(this.props.testPackData, GRID_WIDTH,
            (row, rowI) =>
                <div className="row" key={rowI}>{row.map((tp, colI) =>
                    (tp && tp.testPack) ?
                        (<div key={colI} className={"col s" + COL_WIDTH}>
                            <TestPack packID={tp.testPack}
                                      pageID={this.props.pageID}
                                      onChange={this.fieldChange}/>
                        </div>) :
                        (<span key={colI}>Loading...</span>)
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
        //<div className="page-add-test-pack"><TestPackSelect/></div>
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
