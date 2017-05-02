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
        this.linkActionAdd = this.linkActionAdd.bind(this)
        this.linkAdd = this.linkAdd.bind(this)
        this.addPack = this.addPack.bind(this)
        this.manyRemove = this.manyRemove.bind(this)
        this.addPackChange = this.addPackChange.bind(this)

        this.state = {
            addPackSelection: ""
        }
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
                <div className="page-test-pack-add">
                    <TestPackSelect label="Test Pack"
                        onChange={this.addPackChange}/>
                    <button onClick={this.addPack} className="btn">+</button>
                </div>
            </div>
            <button onClick={this.props.onPacksSave} className="btn">
                Save
            </button>
        </div>
    }

    renderRow(row, rowI, colWidth) {
        const columns = row.map((tp, colI) => {
            if(tp && tp.testPack) {
                return <div key={colI} className={"col s" + colWidth}>
                    <TestPack packID={tp.testPack}
                              pageID={this.props.pageID}
                              onChange={this.fieldChange}
                              onRemove={this.packRemove(tp.testPack)}
                              onManyRemove={this.manyRemove}/>
                </div>
            } else {
                return <span key={colI}>Loading...</span>
            }
        })
        return <div className="row" key={rowI}>{columns}</div>
    }

    renderLinks() {
        if(this.props.links) {
            const pages = this.props.pages
            const links = this.props.links.map((link, linkI) =>
                <Link pages={pages} defaultValue={link} key={linkI}
                      onActionChange={this.linkActionChange(linkI)}
                      onDestChange={this.linkDestChange(linkI)}
                      onActionRemove={this.linkActionRemove(linkI)}
                      onActionAdd={this.linkActionAdd(linkI)}
                      onRemove={this.linkRemove(linkI)}/>
            )
            return <div>
                {links}
                <button onClick={this.linkAdd} className="btn">
                    +
                </button>
            </div>
        } else {
            return <span>Loading...</span>
        }
    }

    packRemove(packID) {
        return () => this.props.onPackRemove(packID)
    }

    linkAdd() {
        return this.props.onLinkAdd()
    }

    linkRemove(linkI) {
        return () => this.props.onLinkRemove(linkI)
    }

    linkDestChange(linkI) {
        return value => this.props.onLinkDestChange(linkI, value)
    }

    linkActionChange(linkI) {
        return (actionI, action) =>
            this.props.onLinkActionChange(linkI, actionI, action)
    }

    linkActionAdd(linkI) {
        return () => this.props.onLinkActionAdd(linkI)
    }

    linkActionRemove(linkI) {
        return actionI => this.props.onLinkActionRemove(linkI, actionI)
    }

    fieldChange(id) {
        return this.props.onTestPackChange(`${this.props.pageID}.${id}`)
    }

    manyRemove(index) {
        return this.props.onPackManyRemove(index)
    }

    addPack(event) {
        this.props.onPackAdd(this.state.addPackSelection)
    }

    addPackChange(selection) {
        this.setState({addPackSelection: selection})
    }
}

function chunk(xs, chunkSize, func) {
    const ret = [], len = xs.length
    for(let i = 0; i < len; i += chunkSize)
        ret.push(func(xs.slice(i, i + chunkSize), i))
    return ret
}
