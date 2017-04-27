import React, {Component} from "react"
import TestPack from "../containers/TestPack"
import Link     from "./Link"
import TestPackSelect from "../containers/TestPackSelect"

import "../../style/Page.scss"

export default class Page extends Component {
    constructor(props) {
        super(props)
        this.fieldChange = this.fieldChange.bind(this)
        this.linkActionChange = this.linkActionChange.bind(this)
    }

    renderRow(row, rowI, colWidth) {
        const columns = row.map((tp, colI) => {
            if(tp && tp.testPack) {
                return <div key={colI} className={"col s" + colWidth}>
                    <TestPack packID={tp.testPack}
                              pageID={this.props.pageID}
                              onChange={this.fieldChange}/>
                </div>
            } else {
                return <span key={colI}>Loading...</span>
            }
        })
        return <div className="row" key={rowI}>{columns}</div>
    }

    render() {
        const GRID_WIDTH = 1
        const COL_WIDTH  = 12 / GRID_WIDTH

        const testPacksDOM = chunk(this.props.testPackData, GRID_WIDTH,
            (row, rowI) => this.renderRow(row, rowI, COL_WIDTH)
        )

        return <div className="page">
            <h1 className="page-name header center">
                {this.props.name}
            </h1>
            <h3>Page Info</h3>
            <div className="page-info">
                TODO
            </div>
            <h3>Page Links</h3>
            <div className="page-links">
                {this.renderLinks()}
                <button onClick={this.props.onLinksSave} className="btn">
                    Save
                </button>
            </div>
            <h3>Test Packs</h3>
            <div className="page-test-packs">
                {testPacksDOM}
                <TestPackSelect/>
            </div>
            <button onClick={this.props.onPacksSave} className="btn">Save</button>
        </div>
        //<div className="page-add-test-pack"><TestPackSelect/></div>
    }

    renderLinks() {
        if(this.props.links) {
            const pages = this.props.pages
            return this.props.links.map((link, linkI) =>
                <Link pages={pages} defaultValue={link} key={linkI}
                      onActionChange={this.linkActionChange(linkI)}
                      onDestChange={this.linkDestChange(linkI)}/>
            )
        } else {
            return <span>Links not loaded</span>
        }
    }

    linkDestChange(linkI) {
        return value => this.props.onLinkDestChange(linkI, value)
    }

    linkActionChange(linkI) {
        return (actionI, action) =>
            this.props.onLinkActionChange(linkI, actionI, action)
    }

    fieldChange(id) {
        return this.props.onTestPackChange(`${this.props.pageID}.${id}`)
    }
}

function chunk(xs, chunkSize, func) {
    const ret = [], len = xs.length
    for(let i = 0; i < len; i += chunkSize)
        ret.push(func(xs.slice(i, i + chunkSize), i))
    return ret
}
