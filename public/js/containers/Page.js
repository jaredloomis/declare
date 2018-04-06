import React, {Component} from "react"
import {connect} from "react-redux"
import {
    updatePackValue, fetchPage,
    savePackData, updateLinkAction,
    saveLinks, updateLinkDest, addPack,
    removePack, removeLinkAction, addLinkAction,
    removeLink, removePackMany, addLink,
    removePage, executePack, updatePageInfo,
    savePageInfo, insertLinkAction
} from "../actions/Page"
import {
    createCustomTest, saveCustomTest
} from "../actions/CustomTest"
import Sep         from "../components/base/Sep"
import AddonsField from "../components/base/AddonsField"
import Title       from "../components/base/Title"
import Button      from "../components/base/Button"
import Group       from "../components/base/Group"
import PageInfo    from "../components/PageInfo"
import TestPack    from "./TestPack"
import CustomTest  from "./CustomTest"
import Link        from "./Link"
import TestPackSelect from "./TestPackSelect"

import bulma from "../../style/bulma.js"
import style from "../../style/Page.scss"

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
        onTestPackChange: uid => value => {
            dispatch(updatePackValue(uid, value))
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
        onLinkActionInsert(linkI, actionI, action) {
            dispatch(insertLinkAction(ownProps.pageID, linkI, actionI, action))
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
        },
        onInfoChange(valMap) {
            dispatch(updatePageInfo(ownProps.pageID, valMap))
            dispatch(savePageInfo(ownProps.pageID))
        },
        onCustomTestAdd() {
            dispatch(createCustomTest(ownProps.pageID, {name: "x"}))
        },
        onCustomTestSave(testID) {
            dispatch(saveCustomTest(testID))
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
        this.infoChange = this.infoChange.bind(this)
        this.customTestAdd = this.customTestAdd.bind(this)
        this.customTestsSave = this.customTestsSave.bind(this)

        this.state = {
            addPackSelection: "",
            packOpen: null
        }
    }

    componentDidMount() {
        console.log("Mounted!")
        if(!this.props.startURL) {
            console.log("FETCHING")
            this.props.fetchPage()
        }
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

        return <div>
            <Title size="1">{this.props.name}</Title>
            <Title size="3">Page Info</Title>
            <div className={style.pageInfo}>
                <PageInfo page={this.props} onChange={this.infoChange}/>
            </div>
            <Sep/>
            <Title size="3">Page Links</Title>
            <div className="page-links">
                {this.renderLinks()}
                <div className={`${bulma.field} ${bulma.is_grouped} ${style.linkControls}`}>
                    <p className={bulma.control}>
                        <Button onClick={this.linkAdd} type="info">
                            + Add Link
                        </Button>
                    </p>
                    <p className={bulma.control}>
                        <Button type="primary" onClick={this.props.onLinksSave}>
                            Save Links
                        </Button>
                    </p>
                </div>
            </div>
            <Sep/>
            <Title size="3">Page Custom Tests</Title>
            {this.renderCustomTests()}
            <Group>
                <Button onClick={this.customTestAdd} type="info">
                    + Add Custom Test
                </Button>
                <Button onClick={this.customTestsSave} type="primary">
                    Save Custom Tests
                </Button>
            </Group>
            <Sep/>
            <Title size="3">Page Test Packs</Title>
            <div className="page-test-packs">
                {testPacksDOM}
                <div className={`${bulma.field} ${bulma.is_grouped}`}>
                    <div className={bulma.control}>
                        <TestPackSelect label="Test Pack" noExteriorLabel="true"
                            onChange={this.addPackChange}/>
                    </div>
                    <div className={bulma.control}>
                        <Button inline={true} type="info" onClick={this.addPack}>
                            + Add Test Pack
                        </Button>
                    </div>
                </div>
            </div>
            <AddonsField>
                <div className={bulma.control}>
                    <Button type="primary" onClick={this.props.onPacksSave}>
                        Save Pack Data
                    </Button>
                </div>
                <div className={bulma.control}>
                    <Button type="danger outlined" onClick={this.props.onPageDelete}>
                        Delete Page
                    </Button>
                </div>
            </AddonsField>
        </div>
    }

    renderRow(row, rowI, colWidth) {
        const columns = row.map((tp, colI) => {
            if(tp && tp.testPack) {
                return <div key={colI} className={bulma.column}>
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
        return <div className={bulma.columns} key={rowI}>{columns}</div>
    }

    renderCustomTests() {
        if(this.props.customTests) {
            return this.props.customTests
                .map(customTest => {
                const id = customTest && (customTest._id || customTest)
                return <div className={bulma.box} key={id}>
                    <CustomTest customTestID={id}/>
                </div>
            })
        } else {
            return <span>No Custom Tests...</span>
        }
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
                      onActionInsert={this.linkActionInsert(linkI)}
                      onRemove={this.linkRemove(linkI)}/>
            )
            return <div>
                {links}
            </div>
        } else {
            return <span>Loading...</span>
        }
    }

    infoChange(valMap) {
        this.props.onInfoChange(valMap)
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

    linkActionInsert(linkI) {
        return actionI => this.props.onLinkActionInsert(linkI, actionI)
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

    customTestAdd() {
        this.props.onCustomTestAdd()
    }

    customTestsSave() {
        this.props.customTests
            .forEach(this.props.onCustomTestSave)
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
