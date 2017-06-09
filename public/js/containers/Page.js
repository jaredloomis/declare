import React, {Component} from "react"
import {connect} from "react-redux"
import {
    updatePackValue, fetchPage,
    savePackData, updateLinkAction,
    saveLinks, updateLinkDest, addPack,
    removePack, removeLinkAction, addLinkAction,
    removeLink, removePackMany, addLink,
    removePage, executePack
} from "../actions/Page"
import TestPack from "./TestPack"
import Link     from "../components/Link"
import TestPackSelect from "./TestPackSelect"

import "../../style/Page.scss"

const mapStateToProps = (state, ownProps) => {
    const props = state.pages ?
        Object.assign({}, state.pages[ownProps.pageID]) :
        {}
    if(props.testPackData) {
        props.testPacks = props.testPackData
        .map(dat => state.testPacks[dat.testPack])
        .filter(pack => pack)
    }
    props.pages = state.pages || []
    return props
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onPageDelete() {
            dispatch(removePage(ownProps.pageID))
        },
        onTestPackChange: uid => event => {
            dispatch(updatePackValue(uid, event.target.value))
        },
        onPackManyRemove(uid) {
            dispatch(removePackMany(uid))
        },
        onLinkAdd() {
            dispatch(addLink(ownProps.pageID))
        },
        onLinkRemove(linkI) {
            dispatch(removeLink(ownProps.pageID, linkI))
        },
        onLinkActionChange(linkI, actionI, action) {
            dispatch(
                updateLinkAction(ownProps.pageID, linkI, actionI, action)
            )
        },
        onLinkActionAdd(linkI) {
            dispatch(addLinkAction(ownProps.pageID, linkI))
        },
        onLinkActionRemove(linkI, actionI) {
            dispatch(removeLinkAction(ownProps.pageID, linkI, actionI))
        },
        onLinkDestChange(linkI, dest) {
            dispatch(updateLinkDest(ownProps.pageID, linkI, dest))
        },
        onLinksSave() {
            dispatch(saveLinks(ownProps.pageID))
        },
        onPacksSave() {
            dispatch(savePackData(ownProps.pageID))
        },
        fetchPage() {
            dispatch(fetchPage(ownProps.pageID, false, false))
        },
        onPackAdd(packID) {
            dispatch(addPack(ownProps.pageID, packID))
        },
        onPackRemove(packID) {
            dispatch(removePack(ownProps.pageID, packID))
        },
        onPackExecute(packID) {
            dispatch(executePack(ownProps.pageID, packID))
        }
    }
}

class Page extends Component {
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
            addPackSelection: "",
            packOpen: null
        }
    }

    componentDidMount() {
        if(!this.props.links)
            this.props.fetchPage()
    }

    render() {
        if(!this.props.name) {
            return <span>Loading...</span>
        }

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
                Save Pack Data
            </button>
            <button onClick={this.props.onPageDelete} className="btn">
                Delete Page
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
                              onManyRemove={this.manyRemove}
                              onExecute={this.packExecute(tp.testPack)}/>
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

    packExecute(packID) {
        return () => this.props.onPackExecute(packID)
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
    if(!xs) return []
    const ret = [], len = xs.length
    for(let i = 0; i < len; i += chunkSize)
        ret.push(func(xs.slice(i, i + chunkSize), i))
    return ret
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)
